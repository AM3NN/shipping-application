package tn.epac.orderservice.services;

import tn.epac.orderservice.dto.OrderRequestDTO;
import tn.epac.orderservice.dto.OrderResponseDTO;

import java.util.List;

public interface OrderService {
    OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO);
    List<OrderResponseDTO> getAllOrders();
    OrderResponseDTO getOrderById(int id);
    OrderResponseDTO updateOrder(int id, OrderRequestDTO dto);
    List<OrderResponseDTO> getOrdersByUserId(String userId);

    void deleteOrder(int id);
}
