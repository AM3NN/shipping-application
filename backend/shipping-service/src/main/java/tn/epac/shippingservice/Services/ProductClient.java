package tn.epac.shippingservice.Services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import tn.epac.shippingservice.Entities.Product;
import tn.epac.shippingservice.feign.ProductFeignConfig;

import java.util.List;

@FeignClient(name = "product-service", configuration = ProductFeignConfig.class)
public interface ProductClient {
    @GetMapping("/api/products")
    List<Product> getAllProducts();
}