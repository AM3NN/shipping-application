package tn.epac.ordervalidatorservice.repository;

import tn.epac.ordervalidatorservice.model.ValidOrder;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ValidOrderRepository extends MongoRepository<ValidOrder, String> {}