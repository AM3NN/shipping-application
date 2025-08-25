package tn.epac.orderservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import tn.epac.orderservice.dto.OrderRequestDTO;
import tn.epac.orderservice.dto.OrderResponseDTO;
import tn.epac.orderservice.exceptions.OrderNotFoundException;
import tn.epac.orderservice.services.OrderService;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponseDTO> createOrder(
            @RequestBody OrderRequestDTO orderRequestDTO,
            @AuthenticationPrincipal Jwt jwt) {
        orderRequestDTO.setUserId(jwt.getClaimAsString("sub"));
        try {
            OrderResponseDTO response = orderService.createOrder(orderRequestDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderResponseDTO>> getMyOrders(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getClaimAsString("sub");
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(orderService.getOrderById(id));
        } catch (OrderNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> updateOrder(
            @PathVariable int id,
            @RequestBody OrderRequestDTO orderRequestDTO,
            @AuthenticationPrincipal Jwt jwt) {
        orderRequestDTO.setUserId(jwt.getClaimAsString("sub"));
        try {
            return ResponseEntity.ok(orderService.updateOrder(id, orderRequestDTO));
        } catch (OrderNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable int id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.ok().build();
        } catch (OrderNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}