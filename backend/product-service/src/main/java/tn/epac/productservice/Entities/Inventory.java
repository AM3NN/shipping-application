package tn.epac.productservice.Entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Inventories")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Inventory {
    @Id
    private String id;
    private String name;         // Ex: "Stock Entrepôt Nord"
    private String reference;    // Ex: "INV-2025-NORD-001"
    private int reservedQuantity;
    private int availableQuantity;
    private String warehouseId; // Référence à Warehouse
    private String productId;   // Référence à Product
}