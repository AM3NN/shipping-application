package tn.epac.orderservice.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.epac.orderservice.Entities.Order;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByClientId(String clientId);
}