package tn.epac.billingservice.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.epac.billingservice.Entities.Invoice;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends MongoRepository<Invoice, String> {
    Optional<Invoice> findByPaymentIntentId(String paymentIntentId);
    List<Invoice> findByCustomerId(String customerId);
}