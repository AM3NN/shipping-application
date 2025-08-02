package tn.epac.productservice.Controllers;


import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.epac.productservice.DTO.WarehouseDTO;
import tn.epac.productservice.Services.IwarehouseService;

import java.util.List;
import java.util.Map;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/warehouses")
@RequiredArgsConstructor
public class WareHouseController {

    private final IwarehouseService warehouseService;

    @PostMapping
    public ResponseEntity<WarehouseDTO> createWarehouse(@RequestBody WarehouseDTO dto) {
        WarehouseDTO created = warehouseService.createWarehouse(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<WarehouseDTO>> getAllWarehouses() {
        return ResponseEntity.ok(warehouseService.getAllWarehouses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WarehouseDTO> getWarehouseById(@PathVariable String id) {
        return ResponseEntity.ok(warehouseService.getWarehouseById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WarehouseDTO> updateWarehouse(
            @PathVariable String id,
            @RequestBody WarehouseDTO dto
    ) {
        WarehouseDTO updated = warehouseService.updateWarehouse(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWarehouse(@PathVariable String id) {
        warehouseService.deleteWarehouse(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/{warehouseId}/assign-inventories")
    public ResponseEntity<Map<String, String>> assignInventories(
            @PathVariable String warehouseId,
            @RequestBody List<String> inventoryIds) {

        Map<String, String> result = warehouseService.assignInventoriesToWarehouse(warehouseId, inventoryIds);
        return ResponseEntity.ok(result);
    }

}