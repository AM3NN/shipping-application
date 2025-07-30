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


    public InventoryDTO toInventoryDTO(Inventory inventory) {
        return modelMapper.map(inventory, InventoryDTO.class);
    }

    public Inventory toInventory(InventoryDTO inventoryDTO) {
        return modelMapper.map(inventoryDTO, Inventory.class);
    }

    public List<InventoryDTO> toDTOList(List<Inventory> inventories) {
        return inventories.stream()
                .map(this::toInventoryDTO)
                .collect(Collectors.toList());
    }
}
