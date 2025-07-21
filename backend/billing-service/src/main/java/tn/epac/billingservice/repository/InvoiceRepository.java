package tn.epac.billingservice.repository;

import tn.epac.billingservice.entity.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface InvoiceRepository extends MongoRepository<Invoice, String> {
    Optional<Invoice> findByOrderId(String orderId);
    boolean existsByOrderId(String orderId);

}
