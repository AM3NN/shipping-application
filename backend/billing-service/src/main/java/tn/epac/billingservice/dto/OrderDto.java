package tn.epac.billingservice.dto;

import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
@Data
public class OrderDto {
    @Getter
    private String id;
    private String status;
    @Getter
    private BigDecimal totalAmount;
    private Integer quantity;
    private LocalDate createdDate;
    private LocalDate expectedDate;
    private LocalDate closedDate;
    private String estimatedFabricationTime;


}