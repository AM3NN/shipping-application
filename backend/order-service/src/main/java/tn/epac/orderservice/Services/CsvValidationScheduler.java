package tn.epac.orderservice.Services;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CsvValidationScheduler {

    private final CsvValidationService validationService;

    public CsvValidationScheduler(CsvValidationService validationService) {
        this.validationService = validationService;
    }

    @Scheduled(fixedRate = 300_000) // toutes les 5 min
    public void runValidation() {
        validationService.validateCsv();
    }
}
