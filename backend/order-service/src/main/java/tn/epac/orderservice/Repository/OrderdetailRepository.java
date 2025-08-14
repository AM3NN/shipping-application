package tn.epac.orderservice.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.epac.orderservice.Entities.Order;
import tn.epac.orderservice.Entities.OrderDetail;

import java.util.List;


public interface OrderdetailRepository extends MongoRepository<OrderDetail, String> {


}
