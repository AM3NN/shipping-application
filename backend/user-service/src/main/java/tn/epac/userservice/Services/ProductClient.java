package tn.epac.userservice.Services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import tn.epac.userservice.Entities.Product;
import tn.epac.userservice.feign.ProductFeignConfig;

import java.util.List;

@FeignClient(name = "product-service", configuration = ProductFeignConfig.class)
public interface ProductClient {
    @GetMapping("/api/products")
    List<Product> getAllProducts();
}