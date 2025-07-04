package tn.epac.productservice.Services;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.epac.productservice.DTO.InventoryDTO;
import tn.epac.productservice.Entities.Inventory;
import tn.epac.productservice.Repositories.InventoryRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryService implements IInventoryservice {

    private final InventoryRepository inventoryRepository;

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
}