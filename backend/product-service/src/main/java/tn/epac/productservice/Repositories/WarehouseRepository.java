package tn.epac.productservice.Repositories;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.epac.productservice.Entities.Warehouse;
@Repository
public interface WarehouseRepository  extends MongoRepository<Warehouse, String>  {
}
