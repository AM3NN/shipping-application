package tn.epac.orderservice.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class  Order {

    @Id
    private int id;
    private String userId;
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

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", status='" + status + '\'' +
                ", shippingMethod='" + shippingMethod + '\'' +
                ", shippingLocation='" + shippingLocation + '\'' +
                ", deliveryLocation='" + deliveryLocation + '\'' +
                ", createdDate=" + createdDate +
                ", expectedDate=" + expectedDate +
                ", closedDate=" + closedDate +
                ", quantity=" + quantity +
                ", reference='" + reference + '\'' +
                ", type='" + type + '\'' +
                ", direction='" + direction + '\'' +
                ", domain='" + domain + '\'' +
                ", version=" + version +
                ", shippingCost=" + shippingCost +
                ", shippingCurrency='" + shippingCurrency + '\'' +
                ", discount=" + discount +
                ", discountCurrency='" + discountCurrency + '\'' +
                ", netAmount=" + netAmount +
                ", netCurrency='" + netCurrency + '\'' +
                ", tax=" + tax +
                ", taxCurrency='" + taxCurrency + '\'' +
                ", totalAmount=" + totalAmount +
                ", totalCurrency='" + totalCurrency + '\'' +
                ", predictedPrice=" + predictedPrice +
                ", estimatedFabricationTime='" + estimatedFabricationTime + '\'' +
                '}';
    }
}