package tn.epac.orderservice.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CsvValidationService {

    @Value("${scraper.csv.output.path:order_details.csv}")
    private String csvFilePath;

    private final List<Map<String, String>> validProducts = new ArrayList<>();
    private final List<Map<String, Object>> invalidProducts = new ArrayList<>();

    public void validateCsv() {
        validProducts.clear();
        invalidProducts.clear();

        try {
            if (!Files.exists(Paths.get(csvFilePath))) return;

            List<String> lines = Files.readAllLines(Paths.get(csvFilePath));
            if (lines.isEmpty()) return;

            // Lecture des headers
            String[] headers = lines.get(0).split(",", -1);

            for (int i = 1; i < lines.size(); i++) {
                String[] values = lines.get(i).split(",", -1);

                Map<String, String> product = new HashMap<>();
                Map<String, String> errors = new HashMap<>();

                for (int j = 0; j < headers.length; j++) {
                    // Supprime les guillemets autour de la valeur
                    String value = values[j].trim().replaceAll("^\"|\"$", "");
                    product.put(headers[j], value);

                    // Vérifie les valeurs invalides
                    if (value.isEmpty() || value.equals("0") || value.equalsIgnoreCase("null")) {
                        errors.put(headers[j], value);
                    }
                }

                // Ajoute à la liste correspondante
                if (errors.isEmpty()) {
                    validProducts.add(product);
                } else {
                    Map<String, Object> invalidEntry = new HashMap<>();
                    invalidEntry.put("line", i);         // numéro de ligne
                    invalidEntry.put("product", product); // contenu de la ligne
                    invalidEntry.put("errors", errors);   // champs invalides
                    invalidProducts.add(invalidEntry);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Map<String, String>> getValidProducts() {
        return validProducts;
    }

    public List<Map<String, Object>> getInvalidProducts() {
        return invalidProducts;
    }
}
