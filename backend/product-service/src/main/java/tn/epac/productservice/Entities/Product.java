package tn.epac.productservice.Entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "products")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    private String id;

    private String name;
    private String reference;
    private String description;
    private String type;
    private String version;
    private int quantity;
    private float price;
    private List<String> inventoryIds; // Référence aux IDs des inventaires
}