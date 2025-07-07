package tn.epac.orderservice.DTO;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class OrderRequestDTO {
    private String status;
    private String shippingMethod;
    private String shippingLocation;      // add if needed (you had it in entity)
    private String deliveryLocation;
    private LocalDate createdDate;
    private LocalDate expectedDate;       // optional, add if needed
    private LocalDate closedDate;         // optional, add if needed

    private String reference;
    private String type;
    private String direction;
    private String domain;

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
}
