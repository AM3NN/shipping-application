package tn.epac.orderservice.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.epac.orderservice.Entities.Order;

public interface OrderRepository extends MongoRepository<Order, String> {
}