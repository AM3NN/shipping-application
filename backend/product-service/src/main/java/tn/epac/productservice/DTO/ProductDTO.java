package tn.epac.productservice.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductDTO {
    private String name;
    private String reference;
    private String description;
    private String type;
    private String version;
    private int quantity;
    private float price;
    private List<String> inventoryIds;
}
