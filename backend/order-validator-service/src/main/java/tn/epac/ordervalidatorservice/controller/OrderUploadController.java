package tn.epac.ordervalidatorservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.epac.ordervalidatorservice.model.InvalidOrder;
import tn.epac.ordervalidatorservice.model.ValidOrder;
import tn.epac.ordervalidatorservice.repository.InvalidOrderRepository;
import tn.epac.ordervalidatorservice.repository.ValidOrderRepository;
import tn.epac.ordervalidatorservice.service.OrderValidationService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class OrderUploadController {

    private static final Logger logger = LoggerFactory.getLogger(OrderUploadController.class);

    private final OrderValidationService validationService;
    private final ValidOrderRepository validRepo;
    private final InvalidOrderRepository invalidRepo;

    public OrderUploadController(OrderValidationService validationService,
                                 ValidOrderRepository validRepo,
                                 InvalidOrderRepository invalidRepo) {
        this.validationService = validationService;
        this.validRepo = validRepo;
        this.invalidRepo = invalidRepo;
    }

    @PostMapping("/scrape")
    public ResponseEntity<String> scrapeOrders(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            String authToken = (authHeader != null && authHeader.startsWith("Bearer "))
                    ? authHeader.substring(7)
                    : null;
            logger.info("Scraping orders with authToken: {}", authToken != null ? "provided" : "none");
            validationService.scrapeAndProcessOrders(authToken);
            return ResponseEntity.ok("Orders scraped and processed successfully.");
        } catch (IOException e) {
            logger.error("Failed to scrape orders: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error scraping orders: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.warn("Invalid request: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid request: " + e.getMessage());
        }
    }

    @GetMapping("/valid")
    public ResponseEntity<List<ValidOrder>> getValidOrders() {
        logger.debug("Fetching all valid orders");
        return ResponseEntity.ok(validRepo.findAll());
    }

    @GetMapping("/invalid")
    public ResponseEntity<List<InvalidOrder>> getInvalidOrders() {
        logger.debug("Fetching all invalid orders");
        return ResponseEntity.ok(invalidRepo.findAll());
    }
}