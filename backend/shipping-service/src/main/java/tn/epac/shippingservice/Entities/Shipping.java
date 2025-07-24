package tn.epac.shippingservice.Entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;


@Document(collection = "shipping")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Shipping {
    @Id
    private String id;
    private String reference;
    private String status;
    private String shippingMethod;
    private String shippingLocation;
    private String deliveryLocation;
    private Date shippedDate;
    private Date deliveryDate;
    private String trackingNumber;
    private String orderId;
    private List<ShippingEvent> history;

}