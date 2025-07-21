package tn.epac.orderservice.Services;

import tn.epac.orderservice.DTO.OrderRequestDTO;
import tn.epac.orderservice.DTO.OrderResponseDTO;

import java.util.List;

public interface OrderService {
    OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO);
    List<OrderResponseDTO> getAllOrders();
    OrderResponseDTO getOrderById(String id);
    OrderResponseDTO updateOrder(String id, OrderRequestDTO dto);

    void deleteOrder(String id);

}
