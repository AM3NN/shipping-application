package tn.epac.productservice.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.epac.productservice.Entities.Product;
@Repository
public interface ProductRepository  extends MongoRepository<Product, String> {
}
