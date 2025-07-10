package tn.epac.productservice.Services;

import tn.epac.productservice.DTO.InventoryDTO;
import tn.epac.productservice.Entities.Inventory;

import java.util.List;

public interface IInventoryservice {
    InventoryDTO createInventory(InventoryDTO dto);
    List<InventoryDTO> getAllInventories();
    InventoryDTO getInventoryById(String id);
    InventoryDTO updateInventory(String id, InventoryDTO dto);
    void deleteInventory(String id);

    // ✅ Assigner un produit à un entrepôt
    Inventory assignProductToWarehouse(String productId, String warehouseId, int availableQuantity);

    void unassignInventory(String inventoryId);
}