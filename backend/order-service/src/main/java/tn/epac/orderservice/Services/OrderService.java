package tn.epac.orderservice.Services;

import tn.epac.orderservice.DTO.OrderDTO;

import java.util.List;

public interface OrderService {
    OrderDTO createOrder(OrderDTO orderDTO);
    OrderDTO creategeneralOrder(OrderDTO orderDTO);
    List<OrderDTO> getAllOrders();
    List<OrderDTO> getMyOrders(String clientId);
    OrderDTO getOrderById(String id);
    void deleteOrder(String id);

}
