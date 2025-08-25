package tn.epac.shippingservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Document(collection = "shipments")
public class Shipment {

    @Id
    private String id;
    private String orderId;
    private String trackingNumber;
    private String carrier;
    private String status;
    private LocalDate estimatedDeliveryDate;
    private LocalDateTime actualDeliveryDate;
    private String deliveryLocation;
    private LocalDateTime createdAt;
}