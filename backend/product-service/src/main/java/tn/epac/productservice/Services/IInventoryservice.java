package tn.epac.productservice.Services;

import tn.epac.productservice.DTO.InventoryDTO;

import java.util.List;

public interface IInventoryservice {
    InventoryDTO createInventory(InventoryDTO dto);
    List<InventoryDTO> getAllInventories();
    InventoryDTO getInventoryById(String id);
    InventoryDTO updateInventory(String id, InventoryDTO dto);
    void deleteInventory(String id);
}