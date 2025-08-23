package tn.epac.orderservice.Services;

import com.opencsv.CSVWriter;
import jakarta.annotation.PostConstruct;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.ai.retry.NonTransientAiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;
import tn.epac.orderservice.DTO.OrderDetaillDTO;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class BookFactoryScraperService {

    private final OpenAiService openAiService;

    @Value("${scraper.csv.output.path:order_details.csv}")
    private String csvFilePath;

    // Stocker les lignes existantes pour éviter les doublons
    private final Set<String> existingCsvLines = ConcurrentHashMap.newKeySet();

    public BookFactoryScraperService(OpenAiService openAiService) {
        this.openAiService = openAiService;


    }
    public List<String> scrapeBookLinks(String catalogUrl) {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new", "--disable-gpu", "--window-size=1920,1080");

        WebDriver driver = new ChromeDriver(options);
        List<String> links = new ArrayList<>();

        try {
            driver.get(catalogUrl);

            // Attente explicite jusqu'à ce que les liens des produits soient visibles
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            wait.until(ExpectedConditions.visibilityOfElementLocated(
                    By.cssSelector("strong.product.name.product-item-name a.product-item-link"))
            );

            Document doc = Jsoup.parse(driver.getPageSource());
            Elements productLinks = doc.select("strong.product.name.product-item-name a.product-item-link");
            for (Element link : productLinks) {
                links.add(link.attr("href"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }

        return links;
    }

    public Mono<OrderDetaillDTO> scrapeAndEnrich(String url) {
        return Mono.fromCallable(() -> {
                    // 🔹 Scraping avec Selenium
                    ChromeOptions options = new ChromeOptions();
                    options.addArguments("--headless=new", "--disable-gpu", "--window-size=1920,1080");

                    WebDriver driver = new ChromeDriver(options);
                    try {
                        driver.get(url);
                        Document doc = Jsoup.parse(driver.getPageSource());

                        String title = Optional.ofNullable(doc.selectFirst("h1.page-title span.base"))
                                .map(Element::text).orElse("");
                        String overview = Optional.ofNullable(doc.selectFirst("div.product.attribute.overview div.value"))
                                .map(Element::text).orElse("");

                        Elements features = doc.select("div.marketing-bullets ul li");
                        StringBuilder featureText = new StringBuilder();
                        for (Element li : features) {
                            if (!li.hasClass("d-none")) {
                                featureText.append("- ").append(li.text()).append("\n");
                            }
                        }

                        return "TITLE: " + title + "\nOVERVIEW: " + overview + "\nFEATURES:\n" + featureText;

                    } finally {
                        driver.quit();
                    }
                })
                .flatMap(rawText -> openAiService.askModelToMap(rawText)
                        .flatMap(dto -> {
                            // Vérification si la ligne existe déjà avant d’écrire
                            if (!csvLineExists(dto)) {
                                exportToCsv(dto);
                            } else {
                                System.out.println("DTO déjà présent dans CSV, skip: " + dto);
                            }
                            return Mono.just(dto);
                        })
                )
                .retryWhen(Retry.backoff(5, Duration.ofSeconds(20)) // retry jusqu'à 5 fois
                        .filter(throwable -> throwable instanceof NonTransientAiException)
                        .onRetryExhaustedThrow((retryBackoffSpec, retrySignal) ->
                                retrySignal.failure() // renvoyer l'erreur après toutes les retries
                        )
                )
                .onErrorResume(e -> {
                    System.err.println("Erreur scraping/processing URL " + url + ": " + e.getMessage());
                    return Mono.empty(); // ignorer l’item pour ne pas bloquer le flux
                });
    }

    private synchronized void exportToCsv(OrderDetaillDTO dto) {
        try {
            String newLine = String.join(",",
                    dto.id(), dto.Reference(), dto.bindingType(), dto.partStatus(),
                    String.valueOf(dto.securityLabel()), String.valueOf(dto.shrinkwrap()),
                    String.valueOf(dto.threeHoleDrill()), dto.perf(), String.valueOf(dto.productionPage()),
                    String.valueOf(dto.thickness()), String.valueOf(dto.height()), String.valueOf(dto.width()),
                    String.valueOf(dto.weight()), dto.textPaperType(), dto.coverFinishType(),
                    dto.textColor(), dto.siren(), String.valueOf(dto.quantity())
            );

            if (existingCsvLines.contains(newLine)) {
                System.out.println("DTO déjà présent dans le CSV, skip: " + dto);
                return;
            }

            boolean fileExists = Files.exists(Paths.get(csvFilePath));
            try (CSVWriter writer = new CSVWriter(new FileWriter(csvFilePath, true))) {
                if (!fileExists) {
                    String[] header = {
                            "id", "Reference", "bindingType", "partStatus", "securityLabel", "shrinkwrap",
                            "threeHoleDrill", "perf", "productionPage", "thickness", "height", "width",
                            "weight", "textPaperType", "coverFinishType", "textColor", "siren", "quantity"
                    };
                    writer.writeNext(header);
                }

                writer.writeNext(newLine.split(",", -1));
                existingCsvLines.add(newLine);
                System.out.println("DTO écrit dans CSV: " + dto);
            }

        } catch (IOException e) {
            throw new RuntimeException("Impossible d'écrire dans le CSV", e);
        }
    }
    private boolean csvLineExists(OrderDetaillDTO dto) {
        String line = String.join(",",
                dto.id(), dto.Reference(), dto.bindingType(), dto.partStatus(),
                String.valueOf(dto.securityLabel()), String.valueOf(dto.shrinkwrap()),
                String.valueOf(dto.threeHoleDrill()), dto.perf(), String.valueOf(dto.productionPage()),
                String.valueOf(dto.thickness()), String.valueOf(dto.height()), String.valueOf(dto.width()),
                String.valueOf(dto.weight()), dto.textPaperType(), dto.coverFinishType(),
                dto.textColor(), dto.siren(), String.valueOf(dto.quantity())
        );
        return existingCsvLines.contains(line);
    }
    public Flux<OrderDetaillDTO> scrapeCatalogAndEnrichAll(String catalogUrl) {
        return Mono.fromCallable(() -> scrapeBookLinks(catalogUrl))
                .flatMapMany(Flux::fromIterable)
                .flatMap(this::scrapeAndEnrich, 3) // Limiter le parallélisme à 3 pour performance
                .delayElements(Duration.ofMillis(500))
                .doOnNext(dto -> System.out.println("DTO traité: " + dto))
                .onErrorContinue((e, obj) -> System.err.println("Skipping item " + obj + ": " + e.getMessage()));
    }
}
