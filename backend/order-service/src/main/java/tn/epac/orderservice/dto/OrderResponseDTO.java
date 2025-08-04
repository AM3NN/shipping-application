package tn.epac.orderservice.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class OrderResponseDTO {
    private int id;
    private String status;
    private String deliveryLocation;
    private LocalDate createdDate;
    private LocalDate expectedDate;
    private Integer quantity;
    private BigDecimal totalAmount;
    private String totalCurrency;
    private Double predictedPrice;
    private String estimatedFabricationTime;
    private Double height;
    private Double width;
    private Double thickness;
    private Double weight;
    private String reference;
    private String textPaperType;
    private String coverFinishType;
    private String bindingType;
}
