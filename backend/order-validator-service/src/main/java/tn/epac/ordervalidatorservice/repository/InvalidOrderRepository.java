package tn.epac.ordervalidatorservice.repository;

import tn.epac.ordervalidatorservice.model.InvalidOrder;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvalidOrderRepository extends MongoRepository<InvalidOrder, String> {}