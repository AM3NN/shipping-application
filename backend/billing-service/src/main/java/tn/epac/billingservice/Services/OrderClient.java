package tn.epac.billingservice.Services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.epac.billingservice.DTO.OrderDTO;
import tn.epac.billingservice.DTO.OrderDetailDTO;
import tn.epac.billingservice.feign.OrderFeignConfig;


import java.util.List;

@FeignClient(name = "order-service", configuration = OrderFeignConfig.class)
public interface OrderClient {
    @GetMapping("/api/orders")
    List<OrderDTO> getAllOrders();
    @GetMapping("/api/orders/{id}")
    OrderDTO getOrder(@PathVariable("id") String id);
    @GetMapping("/api/orders/{orderId}/details")
    List<OrderDetailDTO> getOrderDetails(@PathVariable("orderId") String orderId);
}