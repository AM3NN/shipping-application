package tn.epac.shippingservice.Controller;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.epac.shippingservice.Entities.Product;
import tn.epac.shippingservice.Services.ProductClient;

import java.util.List;

@RestController
@RequestMapping("/api/testcontroller")
public class testcontroller {

    private final ProductClient productClient;

    @Autowired
    public testcontroller(ProductClient productClient) {
        this.productClient = productClient;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getProductsFromProductService() {
        List<Product> products = productClient.getAllProducts();
        return ResponseEntity.ok(products);
    }
}