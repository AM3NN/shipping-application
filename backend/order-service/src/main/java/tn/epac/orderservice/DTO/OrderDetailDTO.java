package tn.epac.orderservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {
    String id;
    String Reference;
    String bindingType;
    String partStatus;
    Boolean securityLabel;
    Boolean shrinkwrap;
    Boolean threeHoleDrill;
    Boolean perf;
    Integer productionPage;
    Double thickness;
    Double height;
    Double width;
    Double weight;
    String textPaperType;
    String coverFinishType;
    String textColor;
    String siren;
    int quantity;
}
