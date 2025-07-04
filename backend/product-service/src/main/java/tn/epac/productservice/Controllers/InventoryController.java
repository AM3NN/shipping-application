package tn.epac.productservice.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.epac.productservice.DTO.InventoryDTO;
import tn.epac.productservice.Services.IInventoryservice;

import java.util.List;

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
        return ResponseEntity.ok(inventoryService.getInventoryById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryDTO> updateInventory(
            @PathVariable String id,
            @RequestBody InventoryDTO dto
    ) {
        InventoryDTO updated = inventoryService.updateInventory(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable String id) {
        inventoryService.deleteInventory(id);
        return ResponseEntity.noContent().build();
    }
}