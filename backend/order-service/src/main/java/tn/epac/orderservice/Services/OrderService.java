package tn.epac.orderservice.Services;

import org.springframework.web.bind.annotation.PathVariable;
import tn.epac.orderservice.DTO.MixedProduct;
import tn.epac.orderservice.DTO.OrderDTO;
import tn.epac.orderservice.DTO.OrderDetailDTO;
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
    List<OrderDetail> getMycustomProducts(String clientId);
    Order createOrder(Order order, List<OrderDetail> customproducts);
    List<OrderDetailDTO>getOrderdetails(String orderid);
    List<MixedProduct>getmixedproducts(String clientId);
}
