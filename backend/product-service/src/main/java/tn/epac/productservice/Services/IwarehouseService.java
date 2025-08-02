package tn.epac.productservice.Services;


import tn.epac.productservice.DTO.WarehouseDTO;

import java.util.List;
import java.util.Map;

public interface IwarehouseService {
    WarehouseDTO createWarehouse(WarehouseDTO dto);
    List<WarehouseDTO> getAllWarehouses();
    WarehouseDTO getWarehouseById(String id);
    WarehouseDTO updateWarehouse(String id, WarehouseDTO dto);
    void deleteWarehouse(String id);

    public Map<String, String> assignInventoriesToWarehouse(String warehouseId, List<String> inventoryIds);

}