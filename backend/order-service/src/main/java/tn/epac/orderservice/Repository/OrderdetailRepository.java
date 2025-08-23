package tn.epac.orderservice.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import tn.epac.orderservice.Entities.Order;
import tn.epac.orderservice.Entities.OrderDetail;

import java.util.List;


public interface OrderdetailRepository extends MongoRepository<OrderDetail, String> {

    @Query("{ '_id': { $in: ?0 } }")
    List<OrderDetail> findByIds(List<ObjectId> ids);
    List<OrderDetail> findByIdIn(List<ObjectId> ids);
}
