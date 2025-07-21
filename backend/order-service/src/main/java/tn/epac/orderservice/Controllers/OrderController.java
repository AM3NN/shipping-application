package tn.epac.orderservice.Controllers;

import tn.epac.orderservice.DTO.OrderRequestDTO;
import tn.epac.orderservice.DTO.OrderResponseDTO;
import tn.epac.orderservice.Services.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public OrderResponseDTO createOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        return orderService.createOrder(orderRequestDTO);
    }

    @GetMapping
    public List<OrderResponseDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public OrderResponseDTO getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id);
    }

    @PutMapping("/{id}")
    public OrderResponseDTO updateOrder(@PathVariable String id,
                                        @RequestBody OrderRequestDTO orderRequestDTO) {
        return orderService.updateOrder(id, orderRequestDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
    }
}
