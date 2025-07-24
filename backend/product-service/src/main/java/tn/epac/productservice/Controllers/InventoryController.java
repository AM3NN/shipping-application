package tn.epac.productservice.Controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.epac.productservice.DTO.InventoryDTO;
import tn.epac.productservice.Entities.Inventory;
import tn.epac.productservice.Services.IInventoryservice;

import java.util.List;
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/inventories")
public class InventoryController {
    private final IInventoryservice inventoryService;

    public InventoryController(IInventoryservice inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping
    public ResponseEntity<InventoryDTO> createInventory(@RequestBody InventoryDTO dto) {
        InventoryDTO created = inventoryService.createInventory(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<InventoryDTO>> getAllInventories() {
        return ResponseEntity.ok(inventoryService.getAllInventories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryDTO> getInventoryById(@PathVariable String id) {
        InventoryDTO inventory = inventoryService.getInventoryById(id);  // Laisse passer l'exception
        return ResponseEntity.ok(inventory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable String id) {
        inventoryService.deleteInventory(id);  // Laisse passer l'exception
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<InventoryDTO> updateInventory(
            @PathVariable String id,
            @RequestBody InventoryDTO dto
    ) {
        InventoryDTO updated = inventoryService.updateInventory(id, dto);
        return ResponseEntity.ok(updated);
    }


    @PostMapping("/assign")
    public ResponseEntity<Inventory> assign(
            @RequestParam String productId,
            @RequestParam String warehouseId,
            @RequestParam int quantity
    ) {
        Inventory inventory = inventoryService.assignProductToWarehouse(productId, warehouseId, quantity);
        return ResponseEntity.ok(inventory);
    }

    // ❌ Supprimer une assignation
    @DeleteMapping("/{inventoryId}")
    public ResponseEntity<Void> unassign(@PathVariable String inventoryId) {
        inventoryService.unassignInventory(inventoryId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/warehouse/{warehouseId}")
    public ResponseEntity<List<InventoryDTO>> getByWarehouse(@PathVariable String warehouseId) {
        return ResponseEntity.ok(inventoryService.getInventoriesByWarehouse(warehouseId));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<InventoryDTO>> getByProduct(@PathVariable String productId) {
        return ResponseEntity.ok(inventoryService.getInventoriesByProduct(productId));
    }
}