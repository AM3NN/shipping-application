package tn.epac.orderservice.Services;

import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import tn.epac.orderservice.DTO.OrderDetailDTO;
import tn.epac.orderservice.Entities.OrderDetail;
import tn.epac.orderservice.Repository.OrderdetailRepository;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@Service
public class CsvService {

    private final Path csvFilePath;
    private final OrderdetailRepository orderDetailRepository;
    // Injection via constructeur (meilleure pratique pour un champ final)
    public CsvService(@Value("${scraper.csv.output.path:order_details.csv}") String csvPath, OrderdetailRepository orderDetailRepository) {
        this.csvFilePath = Paths.get(csvPath).toAbsolutePath(); // chemin absolu pour éviter les confusions
        this.orderDetailRepository = orderDetailRepository;
        System.out.println("📂 CSV path resolved to: " + this.csvFilePath);
    }

    public List<String[]> readCsv() throws IOException {
        try (CSVReader reader = new CSVReader(new FileReader(csvFilePath.toFile()))) {
            return reader.readAll();
        } catch (CsvException e) {
            throw new RuntimeException("Erreur de lecture du CSV", e);
        }
    }

    public void updateCsvLine(int lineIndex, Map<String, String> newValues) throws IOException {
        List<String[]> allLines = readCsv();

        // Vérification de l'index : ligne 0 = header
        if (lineIndex < 1 || lineIndex >= allLines.size()) {
            throw new IllegalArgumentException("Invalid line index: " + lineIndex);
        }

        String[] headers = allLines.get(0);
        String[] line = allLines.get(lineIndex);

        // Mettre à jour uniquement les champs fournis
        for (int i = 0; i < headers.length; i++) {
            if (newValues.containsKey(headers[i])) {
                line[i] = newValues.get(headers[i]);
            }
        }

        allLines.set(lineIndex, line);

        // Réécriture sécurisée du CSV
        try (CSVWriter writer = new CSVWriter(
                new FileWriter(csvFilePath.toFile(), false), // false = overwrite
                CSVWriter.DEFAULT_SEPARATOR,
                CSVWriter.NO_QUOTE_CHARACTER,
                CSVWriter.DEFAULT_ESCAPE_CHARACTER,
                CSVWriter.DEFAULT_LINE_END)) {
            writer.writeAll(allLines, false);
            writer.flush();
        }

        System.out.println("✅ Ligne " + lineIndex + " mise à jour dans " + csvFilePath.toAbsolutePath());
    }



    public void addToDatabaseAndRemoveCsvLine(int lineIndex, Map<String, String> values) throws IOException {
        // 1️⃣ Ajouter à la DB
        OrderDetail order = new OrderDetail();
        order.setReference(values.get("Reference"));
        order.setBindingType(values.get("bindingType"));
        order.setPartStatus(values.get("partStatus"));
        order.setSecurityLabel(Boolean.parseBoolean(values.getOrDefault("securityLabel", "false")));
        order.setShrinkwrap(Boolean.parseBoolean(values.getOrDefault("shrinkwrap", "false")));
        order.setThreeHoleDrill(Boolean.parseBoolean(values.getOrDefault("threeHoleDrill", "false")));
        order.setPerf(Boolean.parseBoolean(values.getOrDefault("perf", "false")));
        order.setProductionPage(Integer.parseInt(values.getOrDefault("productionPage", "0")));
        order.setThickness(Double.parseDouble(values.getOrDefault("thickness", "0")));
        order.setHeight(Double.parseDouble(values.getOrDefault("height", "0")));
        order.setWidth(Double.parseDouble(values.getOrDefault("width", "0")));
        order.setWeight(Double.parseDouble(values.getOrDefault("weight", "0")));
        order.setTextPaperType(values.get("textPaperType"));
        order.setCoverFinishType(values.get("coverFinishType"));
        order.setTextColor(values.get("textColor"));
        order.setSiren(values.get("siren"));
        order.setQuantity(Integer.parseInt(values.getOrDefault("quantity", "0")));

        orderDetailRepository.save(order);

        // 2️⃣ Supprimer la ligne du CSV
        List<String[]> allLines;
        try (CSVReader reader = new CSVReader(new FileReader(csvFilePath.toFile()))) {
            allLines = reader.readAll();
        } catch (CsvException e) {
            throw new RuntimeException("Erreur lecture CSV", e);
        }

        if (lineIndex < 1 || lineIndex >= allLines.size()) {
            throw new IllegalArgumentException("Invalid line index");
        }

        allLines.remove(lineIndex); // supprime la ligne

        // réécriture
        try (CSVWriter writer = new CSVWriter(new FileWriter(csvFilePath.toFile(), false))) {
            writer.writeAll(allLines, false);
            writer.flush();
        }

        System.out.println("✅ Ligne " + lineIndex + " ajoutée à la DB et supprimée du CSV");
    }
}
