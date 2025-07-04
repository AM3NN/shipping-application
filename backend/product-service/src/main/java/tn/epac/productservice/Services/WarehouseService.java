package tn.epac.productservice.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.epac.productservice.DTO.WarehouseDTO;
import tn.epac.productservice.Entities.Inventory;
import tn.epac.productservice.Entities.Warehouse;
import tn.epac.productservice.Repositories.WarehouseRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WarehouseService implements IwarehouseService {

    private final WarehouseRepository warehouseRepository;

    @Override
    public WarehouseDTO createWarehouse(WarehouseDTO dto) {
        Warehouse warehouse = new Warehouse(null, dto.getName(), dto.getLocation(), dto.getCapacity(), List.of());
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
                .orElseThrow(() -> new RuntimeException("Not found"));
        warehouse.setName(dto.getName());
        warehouse.setLocation(dto.getLocation());
        warehouse.setCapacity(dto.getCapacity());
        return mapToDTO(warehouseRepository.save(warehouse));
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
                warehouse.getName(),
                warehouse.getLocation(),
                warehouse.getCapacity(),
                inventoryIds
        );
    }
}
