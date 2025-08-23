package tn.epac.orderservice.Controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tn.epac.orderservice.DTO.*;
//import tn.epac.orderservice.Services.ChatService;
//import tn.epac.orderservice.Services.ChatbotService;
import tn.epac.orderservice.Entities.Order;
import tn.epac.orderservice.Entities.OrderDetail;
import tn.epac.orderservice.Services.BookFactoryScraperService;
import tn.epac.orderservice.Services.CsvService;
import tn.epac.orderservice.Services.CsvValidationService;
import tn.epac.orderservice.Services.OrderService;
import org.springframework.web.bind.annotation.*;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import java.security.Principal;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final CsvValidationService validationService;
    private final CsvService csvService;
//    private final ChatService chatService;
//    private final ChatbotService chatbotService;


    private final BookFactoryScraperService scraperService;
    @PostMapping("/GeneralOrder")
    public ResponseEntity<Order> createOrder(@Valid @RequestBody Order dto) {
        Order savedOrder = orderService.creategeneralOrder(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAll() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/MyOrders")
    public ResponseEntity<List<OrderDTO>> getMyOrders(Principal principal) {
        String clientId = principal.getName(); // récupère l’ID utilisateur Keycloak connecté
        List<OrderDTO> orders = orderService.getMyOrders(clientId);
        if (orders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(orders);
    }
//
//    @PostMapping("/ai/generate")
//    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> payload,
//                                                    @RequestParam(defaultValue = "order") String context) {
//        String userAnswer = payload.get("answer");
//        if (userAnswer == null || userAnswer.trim().isEmpty()) {
//            return ResponseEntity.badRequest().body(Map.of("error", "Le champ 'answer' est obligatoire"));
//        }
//
//        String botResponse = chatService.generateResponse(userAnswer, context);
//
//        return ResponseEntity.ok(Map.of("response", botResponse));
//    }
    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping
    public Order createOrder(@RequestBody OrderWithDetailsRequest request) {
        Order order = request.getOrder();
        List<OrderDetail> customProducts = request.getCustomproducts();
        return orderService.createOrder(order, customProducts);
    }


    // DTO pour recevoir JSON Order + Liste OrderDetail
    public static class OrderWithDetailsRequest {
        private Order order;
        private List<OrderDetail> customproducts;

        public Order getOrder() {
            return order;
        }

        public void setOrder(Order order) {
            this.order = order;
        }

        public List<OrderDetail> getCustomproducts() {
            return customproducts;
        }

        public void setCustomproducts(List<OrderDetail> customproducts) {
            this.customproducts = customproducts;
        }
    }


    @GetMapping("/mycustomproducts/{clientId}")
    public ResponseEntity<List<OrderDetail>> getMyCustomProducts(@PathVariable String clientId) {
        List<OrderDetail> customProducts = orderService.getMycustomProducts(clientId);
        return ResponseEntity.ok(customProducts);
    }
    @GetMapping("/{orderId}/details")
    public List<OrderDetailDTO> getOrderDetails(@PathVariable String orderId) {
        try {
            List<OrderDetailDTO> details = orderService.getOrderdetails(orderId);
            return details != null ? details : new ArrayList<>();
        } catch (Exception e) {
            // En cas d'erreur, retourner une liste vide
            return new ArrayList<>();
        }
    }

    @GetMapping("/mixed/{clientId}")
    public List<MixedProduct> getMixedProducts(@PathVariable String clientId) {
        return orderService.getmixedproducts(clientId);
    }
//    @PostMapping("/scrape")
//    public Mono<ResponseEntity<OrderDetaillDTO>> scrapeAndEnrich(@RequestBody ScrapeRequest request) {
//        return scraperService.scrapeAndEnrich(request.url())
//                .map(dto -> ResponseEntity.ok(dto)) // 200 OK with DTO
//                .defaultIfEmpty(ResponseEntity.noContent().build()) // 204 No Content if Mono is empty
//                .onErrorResume(e -> {
//                    // Log error and return 500 Internal Server Error
//                    System.err.println("Error processing URL " + request.url() + ": " + e.getMessage());
//                    return Mono.just(ResponseEntity.status(500)
//                            .body(null));
//                });
//    }


    @PostMapping("/scrape/catalog")
    public Flux<OrderDetaillDTO> scrapeCatalog(@RequestBody ScrapeRequest request) {
        return scraperService.scrapeCatalogAndEnrichAll(request.url());
    }

    // Record for request body


    @GetMapping("/csv/products")
    public Map<String, Object> getCsvProducts() {
        // Exécute la validation avant de récupérer les résultats
        validationService.validateCsv();

        Map<String, Object> result = new HashMap<>();
        result.put("validScrappedProducts", validationService.getValidProducts());
        result.put("invalidScrappedProducts", validationService.getInvalidProducts());
        return result;
    }

    public record ScrapeRequest(String url) {}

    @PutMapping("/update/{lineIndex}")
    public ResponseEntity<String> updateLine(
            @PathVariable int lineIndex,
            @RequestBody Map<String, String> updatedFields) {
        try {
            csvService.updateCsvLine(lineIndex, updatedFields);
            return ResponseEntity.ok("CSV line updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}

