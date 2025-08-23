package tn.epac.billingservice.DTO;


import lombok.*;


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
