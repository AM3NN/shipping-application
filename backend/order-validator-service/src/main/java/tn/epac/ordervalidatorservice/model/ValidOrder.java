package tn.epac.ordervalidatorservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Document(collection = "valid-orders")
public class ValidOrder {
    @Id
    private String orderId;
    private String orderNum;
    private LocalDate expectedDate;
    private LocalDateTime receptionDate;
    private LocalDateTime deliveryDate;
    private Integer quantity;
    private Integer qtyMin;
    private Integer qtyMax;
    private Integer qtyProduced;
    private Integer qtyDelivered;
    private String priorityLevel;
    private String orderStatus;
    private String partId;
    private String isbn13;
    private String title;
    private String bindingType;
    private String partStatus;
    private String securityLabel;
    private Integer shrinkwrap;
    private Integer threeHoleDrill;
    private Integer perf;
    private Integer productionPage;
    private Double thickness;
    private Double height;
    private Double width;
    private Double weight;
    private String textPaperType;
    private String coverFinishType;
    private String textColor;
    private String siren;
    private BigDecimal unitPrice;
}