package tn.epac.productservice.Services;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.epac.productservice.DTO.InventoryDTO;
import tn.epac.productservice.Entities.Inventory;
import tn.epac.productservice.Entities.Product;
import tn.epac.productservice.Entities.Warehouse;
import tn.epac.productservice.Repositories.InventoryRepository;
import tn.epac.productservice.Repositories.ProductRepository;
import tn.epac.productservice.Repositories.WarehouseRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryService implements IInventoryservice {

    private final InventoryRepository inventoryRepository;
     private final ProductRepository productRepository;
     private final WarehouseRepository warehouseRepository;
    @Override
    public InventoryDTO createInventory(InventoryDTO dto) {
        Inventory inventory = new Inventory(null, dto.getReservedQuantity(), dto.getAvailableQuantity(), dto.getWarehouseId(), dto.getProductId());
        return mapToDTO(inventoryRepository.save(inventory));
    }

    @Override
    public List<InventoryDTO> getAllInventories() {
        return inventoryRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InventoryDTO getInventoryById(String id) {
        Inventory i = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        return mapToDTO(i);
    }

    @Override
    public InventoryDTO updateInventory(String id, InventoryDTO dto) {
        Inventory inv = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        inv.setReservedQuantity(dto.getReservedQuantity());
        inv.setAvailableQuantity(dto.getAvailableQuantity());
        inv.setProductId(dto.getProductId());
        inv.setWarehouseId(dto.getWarehouseId());
        return mapToDTO(inventoryRepository.save(inv));
    }

    @Override
    public void deleteInventory(String id) {
        inventoryRepository.deleteById(id);
    }

    private InventoryDTO mapToDTO(Inventory inv) {
        return new InventoryDTO(
                inv.getReservedQuantity(),
                inv.getAvailableQuantity(),
                inv.getWarehouseId(),
                inv.getProductId()
        );
    }


    // ✅ Assigner un produit à un entrepôt
    @Override
    public Inventory assignProductToWarehouse(String productId, String warehouseId, int availableQuantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));

        Warehouse warehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new RuntimeException("Entrepôt non trouvé"));

        Inventory inventory = new Inventory();
        inventory.setProductId(productId);
        inventory.setWarehouseId(warehouseId);
        inventory.setAvailableQuantity(availableQuantity);
        inventory.setReservedQuantity(0);

        Inventory savedInventory = inventoryRepository.save(inventory);

        // Mettre à jour les inventaires du produit
        if (product.getInventoryIds() == null)
            product.setInventoryIds(new ArrayList<>());
        product.getInventoryIds().add(savedInventory.getId());
        productRepository.save(product);

        return savedInventory;
    }
    @Override
    public void unassignInventory(String inventoryId) {
        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new RuntimeException("Inventaire non trouvé"));

        // Supprimer la référence dans le produit
        Product product = productRepository.findById(inventory.getProductId()).orElse(null);
        if (product != null && product.getInventoryIds() != null) {
            product.getInventoryIds().remove(inventoryId);
            productRepository.save(product);
        }

        inventoryRepository.deleteById(inventoryId);
    }

}