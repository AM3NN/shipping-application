package tn.epac.billingservice.entity;

import lombok.Data;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Document(collection = "invoices")
public class Invoice {

    @Id
    private String id;
    private String orderId;
    private BigDecimal totalAmount;
    @Setter
    private LocalDate issueDate;
    private boolean sent;
    private LocalDateTime sentAt;

}