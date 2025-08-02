package tn.epac.productservice.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.epac.productservice.DTO.WarehouseDTO;
import tn.epac.productservice.Entities.Inventory;
import tn.epac.productservice.Entities.Warehouse;
import tn.epac.productservice.Repositories.InventoryRepository;
import tn.epac.productservice.Repositories.WarehouseRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WarehouseService implements IwarehouseService {

    private final WarehouseRepository warehouseRepository;
   private final InventoryRepository inventoryRepository;
    @Override
    public WarehouseDTO createWarehouse(WarehouseDTO dto) {
        Warehouse warehouse = new Warehouse(null, dto.getName(), dto.getLocation(),dto.getCountry(),dto.getCapacity(),List.of());
        Warehouse saved = warehouseRepository.save(warehouse);
        return mapToDTO(saved);
    }

    @Override
    public List<WarehouseDTO> getAllWarehouses() {
        return warehouseRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public WarehouseDTO getWarehouseById(String id) {
        Warehouse w = warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        return mapToDTO(w);
    }

    @Override
    public WarehouseDTO updateWarehouse(String id, WarehouseDTO dto) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));

        warehouse.setName(dto.getName());
        warehouse.setLocation(dto.getLocation());
        warehouse.setCountry(dto.getCountry());
        warehouse.setCapacity(dto.getCapacity());

        // Charger les objets Inventory à partir des IDs
        List<Inventory> inventories = inventoryRepository.findAllById(dto.getInventoryIds());
        warehouse.setInventories(inventories);

        Warehouse updated = warehouseRepository.save(warehouse);
        return mapToDTO(updated);
    }


    @Override
    public void deleteWarehouse(String id) {
        warehouseRepository.deleteById(id);
    }

    private WarehouseDTO mapToDTO(Warehouse warehouse) {
        List<String> inventoryIds = warehouse.getInventories() != null ?
                warehouse.getInventories().stream()
                        .map(Inventory::getId)
                        .collect(Collectors.toList()) : List.of();
        return new WarehouseDTO(
                warehouse.getId(),
                warehouse.getName(),
                warehouse.getLocation(),
                warehouse.getCountry(),
                warehouse.getCapacity(),
                inventoryIds
        );
    }

    @Override
    public Map<String, String> assignInventoriesToWarehouse(String warehouseId, List<String> inventoryIds) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));

        List<Inventory> inventoriesToAssign = inventoryRepository.findAllById(inventoryIds);

        // Calculer la quantité totale à ajouter
        int totalQuantityToAssign = inventoriesToAssign.stream()
                .mapToInt(inv -> inv.getAvailableQuantity() + inv.getReservedQuantity())
                .sum();

        // Récupérer la quantité déjà présente dans ce warehouse
        int currentQuantityInWarehouse = inventoryRepository.findByWarehouseId(warehouseId).stream()
                .mapToInt(inv -> inv.getAvailableQuantity() + inv.getReservedQuantity())
                .sum();

        // Vérifier la capacité
        if (currentQuantityInWarehouse + totalQuantityToAssign > warehouse.getCapacity()) {
            throw new RuntimeException("Warehouse capacity exceeded");
        }

        // Mise à jour des inventaires
        for (Inventory inventory : inventoriesToAssign) {
            inventory.setWarehouseId(warehouseId);
        }

        inventoryRepository.saveAll(inventoriesToAssign);

        // Retour JSON
        Map<String, String> response = new HashMap<>();
        response.put("message", "Inventories assigned successfully to warehouse.");
        return response;
    }

}
