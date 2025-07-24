package tn.epac.shippingservice.Services;

import tn.epac.shippingservice.Entities.Shipping;

import java.util.List;
import java.util.Optional;

public interface IShippingService {
    Shipping createShipping(Shipping shipping);
    List<Shipping> getAllShippings();
    Optional<Shipping> getShippingById(String id);
    Shipping updateShipping(String id, Shipping shipping);
    void deleteShipping(String id);

    Shipping getShipmentStatus(String orderId);

    List<Shipping> getShipmentHistory(String orderId);
}