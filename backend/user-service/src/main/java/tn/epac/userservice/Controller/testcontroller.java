package tn.epac.userservice.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.epac.userservice.Entities.Product;
import tn.epac.userservice.Services.ProductClient;

import java.util.List;

@RestController
@RequestMapping("/api/products")
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