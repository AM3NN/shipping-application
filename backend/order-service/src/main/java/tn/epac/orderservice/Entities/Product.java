package tn.epac.orderservice.Entities;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "products")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Product {

    @Id
    private String id;

    @NotEmpty
    @Size(min = 2, max = 15)
    private String name;

    @NotEmpty
    private String reference;

    @NotEmpty
    @Size(min = 2)
    private String description;

    private String type;

    private String version;

    private int quantity;

    private float price;

    private List<String> inventoryIds;

    private Category category;

    private InventoryStatus inventoryStatus;

    private String imageUrl;  // <-- champ ajouté pour l'image
}
