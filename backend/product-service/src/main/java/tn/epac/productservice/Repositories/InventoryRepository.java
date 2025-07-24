package tn.epac.productservice.Repositories;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.epac.productservice.Entities.Inventory;

import java.util.List;

@Repository
public interface InventoryRepository  extends MongoRepository<Inventory, String> {
    // 📦 1. Trouver les inventaires d'un entrepôt donné
    List<Inventory> findByWarehouseId(String warehouseId);

    // 🛒 2. Trouver les inventaires pour un produit donné
    List<Inventory> findByProductId(String productId);

    // (optionnel) 3. Trouver l'inventaire pour un entrepôt et un produit spécifique
    Inventory findByWarehouseIdAndProductId(String warehouseId, String productId);
}
