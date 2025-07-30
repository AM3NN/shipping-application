package tn.epac.productservice.DTO;


import lombok.*;
import tn.epac.productservice.Entities.Category;
import tn.epac.productservice.Entities.InventoryStatus;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProductDTO {
    private String id;
    private String name;
    private String reference;
    private String description;
    private String type;
    private String version;
    private int quantity;
    private float price;
    private List<String> inventoryIds;
    private Category category;
    private InventoryStatus inventoryStatus;
    private String imageUrl;
}
