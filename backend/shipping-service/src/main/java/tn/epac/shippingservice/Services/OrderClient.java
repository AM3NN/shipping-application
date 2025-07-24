package tn.epac.shippingservice.Services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.epac.shippingservice.DTO.OrderDTO;

@FeignClient(name = "order-service") // si Eureka
public interface OrderClient {
    @GetMapping("/orders/{id}")
    OrderDTO getOrderById(@PathVariable("id") String id);
}
