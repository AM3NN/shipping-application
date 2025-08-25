package tn.epac.billingservice.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
@Data
public class OrderDto {
    private int id;
    private String userId;
    private String status;
    private BigDecimal totalAmount;
    private Integer quantity;
    private LocalDate createdDate;
    private LocalDate expectedDate;
    private LocalDate closedDate;
    private String estimatedFabricationTime;
    private double predictedPrice;
    private String deliveryLocation;
    private String shippingMethod;



}