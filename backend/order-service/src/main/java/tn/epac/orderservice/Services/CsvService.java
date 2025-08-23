package tn.epac.orderservice.Services;

import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

    // Injection via constructeur (meilleure pratique pour un champ final)
    public CsvService(@Value("${scraper.csv.output.path:order_details.csv}") String csvPath) {
        this.csvFilePath = Paths.get(csvPath);
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

        if (lineIndex < 0 || lineIndex >= allLines.size()) {
            throw new IllegalArgumentException("Invalid line index");
        }

        String[] headers = allLines.get(0);
        String[] line = allLines.get(lineIndex);

        // Remplace seulement les champs fournis
        for (int i = 0; i < headers.length; i++) {
            if (newValues.containsKey(headers[i])) {
                line[i] = newValues.get(headers[i]);
            }
        }

        allLines.set(lineIndex, line);

        // Réécrire le CSV
        try (CSVWriter writer = new CSVWriter(new FileWriter(csvFilePath.toFile()))) {
            writer.writeAll(allLines);
        }
    }
}
