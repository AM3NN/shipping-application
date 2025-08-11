package tn.epac.orderservice.DTO;


import lombok.*;
import tn.epac.orderservice.Entities.Category;
import tn.epac.orderservice.Entities.InventoryStatus;

import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class OrderProductDTO {
private ProductDTO product;
private int quantity;

}
