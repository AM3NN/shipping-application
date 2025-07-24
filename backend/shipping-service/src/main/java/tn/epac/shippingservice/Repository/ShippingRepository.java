package tn.epac.shippingservice.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.epac.shippingservice.Entities.Shipping;

import java.util.List;
import java.util.Optional;

public interface ShippingRepository extends MongoRepository<Shipping, String> {
    Optional<Shipping> findTopByOrderIdOrderByDeliveryDateDesc(String orderId);

    // Renvoie l'historique complet trié par date
    List<Shipping> findByOrderIdOrderByDeliveryDateDesc(String orderId);
    Optional<Shipping> findByOrderId(String orderId);
}
