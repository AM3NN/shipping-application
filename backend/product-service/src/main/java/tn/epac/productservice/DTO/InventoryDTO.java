package tn.epac.productservice.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryDTO {
    private String id;
    private int reservedQuantity;
    private int availableQuantity;
    private String warehouseId;
    private String productId;
}
