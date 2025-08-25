package tn.epac.shippingservice.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import tn.epac.shippingservice.model.Shipment;
import reactor.core.publisher.Mono;

@Repository
public interface ShipmentRepository extends ReactiveMongoRepository<Shipment, String> {
    Mono<Shipment> findByOrderId(String orderId);
}
