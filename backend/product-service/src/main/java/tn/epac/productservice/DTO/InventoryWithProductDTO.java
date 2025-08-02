package tn.epac.productservice.DTO;

import tn.epac.productservice.Entities.Inventory;
import tn.epac.productservice.Entities.Product;

public class InventoryWithProductDTO {

    private Inventory inventory;
    private Product product;

    public InventoryWithProductDTO(Inventory inventory, Product product) {
        this.inventory = inventory;
        this.product = product;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
