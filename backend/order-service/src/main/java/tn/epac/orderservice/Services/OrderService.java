package tn.epac.orderservice.Services;

import tn.epac.orderservice.DTO.OrderDTO;
import tn.epac.orderservice.Entities.Order;
import tn.epac.orderservice.Entities.OrderDetail;

import java.util.List;

public interface OrderService {
    Order createOrder(Order orderDTO);

    Order creategeneralOrder(Order order);

    List<OrderDTO> getAllOrders();

    List<OrderDTO> getMyOrders(String clientId);

    OrderDTO getOrderById(String id);

    void deleteOrder(String id);

    Order createOrder(Order order, List<OrderDetail> customproducts);
}
