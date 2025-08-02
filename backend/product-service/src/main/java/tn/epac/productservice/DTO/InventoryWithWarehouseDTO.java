package tn.epac.productservice.DTO;

import tn.epac.productservice.Entities.Inventory;
import tn.epac.productservice.Entities.Warehouse;

public class InventoryWithWarehouseDTO {

    private Inventory inventory;
    private Warehouse warehouse;

    public InventoryWithWarehouseDTO(Inventory inventory, Warehouse warehouse) {
        this.inventory = inventory;
        this.warehouse = warehouse;
    }

    // Getters et setters
    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }
}
