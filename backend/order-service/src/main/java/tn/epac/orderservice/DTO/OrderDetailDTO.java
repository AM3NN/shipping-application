package tn.epac.orderservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {
    private Long id;
    private String bindingType;
    private String partStatus;
    private String securityLabel;
    private Boolean shrinkwrap;
    private Boolean threeHoleDrill;
    private String perf;
    private Integer productionPage;
    private Double thickness;
    private Double height;
    private Double width;
    private Double weight;
    private String textPaperType;
    private String coverFinishType;
    private String textColor;
    private String siren;
    int quantity;
}
