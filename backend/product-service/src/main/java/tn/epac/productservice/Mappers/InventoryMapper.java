package tn.epac.productservice.Mappers;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import tn.epac.productservice.DTO.InventoryDTO;
import tn.epac.productservice.Entities.Inventory;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryMapper {

    private final ModelMapper modelMapper = new ModelMapper();
    private final InventoryMapper inventoryMapper;

    public InventoryMapper(InventoryMapper inventoryMapper) {
        this.inventoryMapper = inventoryMapper;
    }

    public InventoryDTO toInventoryDTO(Inventory inventory) {
        return modelMapper.map(inventory, InventoryDTO.class);
    }

    public Inventory toInventory(InventoryDTO inventoryDTO) {
        return modelMapper.map(inventoryDTO, Inventory.class);
    }


}
