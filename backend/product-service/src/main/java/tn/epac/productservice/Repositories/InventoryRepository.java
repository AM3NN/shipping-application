package tn.epac.productservice.Repositories;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.epac.productservice.Entities.Inventory;
@Repository
public interface InventoryRepository  extends MongoRepository<Inventory, String> {
}
