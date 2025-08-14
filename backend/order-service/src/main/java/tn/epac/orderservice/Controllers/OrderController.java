package tn.epac.orderservice.Controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Flux;
import tn.epac.orderservice.DTO.OrderDTO;
//import tn.epac.orderservice.Services.ChatService;
//import tn.epac.orderservice.Services.ChatbotService;
import tn.epac.orderservice.Entities.Order;
import tn.epac.orderservice.Entities.OrderDetail;
import tn.epac.orderservice.Services.OrderService;
import org.springframework.web.bind.annotation.*;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
//    private final ChatService chatService;
//    private final ChatbotService chatbotService;


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
}