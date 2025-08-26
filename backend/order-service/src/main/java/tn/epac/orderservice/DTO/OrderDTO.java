package tn.epac.orderservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tn.epac.orderservice.Entities.OrderDetail;
import tn.epac.orderservice.Entities.OrderProduct;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private String id;
    private String status;
    private String shippingMethod;
    private String shippingLocation;
    private String deliveryLocation;
    private LocalDate createdDate;
    private LocalDate expectedDate;
    private LocalDate closedDate;
    private String reference;
    private String type;
    private String direction;
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
    private String clientId;
    private String clientEmail;
    // Liste des produits de la commande
    private List<OrderProductDTO> products;
    private List<OrderDetailDTO> customproducts;
}
