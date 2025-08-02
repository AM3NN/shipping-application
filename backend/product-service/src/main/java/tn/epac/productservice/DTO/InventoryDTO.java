package tn.epac.productservice.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryDTO {
    private String id;
    private String name;         // Ex: "Stock Entrepôt Nord"
    private String reference;    // Ex: "INV-2025-NORD-001"
    private int reservedQuantity;
    private int availableQuantity;
    private String warehouseId;
    private String productId;
}
