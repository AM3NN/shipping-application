package tn.epac.orderservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.epac.orderservice.entities.Order;

public interface OrderRepository extends MongoRepository<Order, Integer> {
}