package tn.epac.orderservice.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String status;
    private String shippingMethod;
    private String shippingLocation;
    private String deliveryLocation;
    private LocalDate createdDate;
    private LocalDate expectedDate;
    private LocalDate closedDate;
    private Integer quantity;

    private String reference;
    private String type;
    private String direction;
    private String domain;
    private Long version;
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
    private double predictedPrice;
    private String estimatedFabricationTime;


}