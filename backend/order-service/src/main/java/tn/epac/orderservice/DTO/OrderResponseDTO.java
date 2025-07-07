package tn.epac.orderservice.DTO;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class OrderResponseDTO {
    private String id;
    private String status;
    private String deliveryLocation;
    private LocalDate createdDate;
    private BigDecimal totalAmount;
    private String totalCurrency;
}
