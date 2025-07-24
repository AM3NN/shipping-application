package tn.epac.productservice.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.epac.productservice.Entities.Product;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository  extends MongoRepository<Product, String> {
    Optional<Product> findByReference(String reference);

    // Lister tous les produits d'un type donné
    List<Product> findByType(String type);
}
