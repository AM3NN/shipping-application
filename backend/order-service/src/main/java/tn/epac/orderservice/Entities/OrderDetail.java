package tn.epac.orderservice.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class OrderDetail {
    @Id
    Long id;
    String partId;
    String bindingType;
    String partStatus;
    String securityLabel;
    Boolean shrinkwrap;
    Boolean threeHoleDrill;
    String perf;
    Integer productionPage;
    Double thickness;
    Double height;
    Double width;
    Double weight;
    String textPaperType;
    String coverFinishType;
    String textColor;
    String siren;
}
