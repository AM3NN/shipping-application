package tn.epac.orderservice.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class OrderRequestDTO {
    private String userId;
    private boolean shrinkwrap;
    private int productionPage;
    private boolean perf;
    private boolean threeHoleDrill;
    private String textColor;
    private String status;
    private String shippingMethod;
    private String shippingLocation;
    private String deliveryLocation;
    private LocalDate createdDate;
    private LocalDate expectedDate;
    private LocalDate closedDate;
    private Double height;
    private Double width;
    private Double thickness;
    private Double weight;
    private String reference;
    private String type;
    private String direction;
    private String domain;
    private Integer quantity;
    private String textPaperType;
    private String coverFinishType;
    private String bindingType;
    private BigDecimal shippingCost;
    private String shippingCurrency;
    private BigDecimal discount;
    private String discountCurrency;
    private BigDecimal netAmount;
    private String netCurrency;
    private BigDecimal tax;
    private String taxCurrency;
    private BigDecimal totalAmount;
    private String totalCurrency;
    private Double predictedPrice;
    private String estimatedFabricationTime;
}
