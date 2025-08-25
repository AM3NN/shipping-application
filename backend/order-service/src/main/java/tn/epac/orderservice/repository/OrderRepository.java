package tn.epac.orderservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.epac.orderservice.entities.Order;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, Integer> {
    List<Order> findByUserId(String userId);

}