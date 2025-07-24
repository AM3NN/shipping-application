package tn.epac.productservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Profile;
import tn.epac.productservice.Entities.Product;
import tn.epac.productservice.Repositories.ProductRepository;

import java.util.List;
@EnableDiscoveryClient
@SpringBootApplication
public class ProductServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }

    @Autowired
    private ProductRepository productRepository;

    @Bean
    @Profile("!test") // Exclut ce bean pendant les tests
    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
        return args -> {
            // Nettoyer d'abord si nécessaire
            productRepository.deleteAll();

            // Insérer 3 produits
            productRepository.save(new Product(null, "Product A", "REF001", "Desc A", "Type1", "v1", 10, 100.0f, List.of()));
            productRepository.save(new Product(null, "Product B", "REF002", "Desc B", "Type1", "v1", 5, 150.0f, List.of()));
            productRepository.save(new Product(null, "Product C", "REF003", "Desc C", "Type2", "v2", 20, 200.0f, List.of()));
        };
    }
}
