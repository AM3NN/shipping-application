package tn.epac.orderservice.services;

import tn.epac.orderservice.dto.OrderRequestDTO;
import tn.epac.orderservice.dto.OrderResponseDTO;

import java.util.List;

public interface OrderService {
    OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO);
    List<OrderResponseDTO> getAllOrders();

    // Change from String to int here:
    OrderResponseDTO getOrderById(int id);
    OrderResponseDTO updateOrder(int id, OrderRequestDTO dto);
    void deleteOrder(int id);
}
