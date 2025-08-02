package tn.epac.productservice.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WarehouseDTO {
    private String id;
    private String name;
    private String location;
    private String country;
    private int capacity;
    private List<String> inventoryIds; // liste d'IDs d'inventaires
}
