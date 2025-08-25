package tn.epac.ordervalidatorservice.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "invalid-orders")
public class InvalidOrder {
    private String orderId;
    private String originalRow;
    private List<String> errors;
    private LocalDateTime rejectedAt;
}