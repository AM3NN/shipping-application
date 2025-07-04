package tn.epac.orderservice.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.epac.orderservice.Entities.Product;

public interface ProductRepository extends MongoRepository<Product, String> {
}