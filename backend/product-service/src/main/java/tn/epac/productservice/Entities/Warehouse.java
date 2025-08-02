package tn.epac.productservice.Entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
@Document(collection = "Warehouses")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Warehouse {
    @Id
    private String id;
    private String name;
    private String location;
    private String country;
    private int capacity;
    private List<Inventory> inventories; // Références aux inventaires


}