package tn.epac.shippingservice.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class OrderDto {
    private String id;
    private String deliveryLocation;
    private LocalDate expectedDate;
    private String status;
}