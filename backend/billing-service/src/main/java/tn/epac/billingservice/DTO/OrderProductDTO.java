package tn.epac.billingservice.DTO;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class OrderProductDTO {
private ProductDTO product;
private int quantity;

}
