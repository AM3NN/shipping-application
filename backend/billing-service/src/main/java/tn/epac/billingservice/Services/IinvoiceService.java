package tn.epac.billingservice.Services;

import tn.epac.billingservice.Entities.Invoice;

import java.util.List;

public interface IinvoiceService {
    public Invoice createInvoice(Invoice invoice);

    List<Invoice> getAllInvoices();
    public Invoice generateInvoiceFromOrder(String orderId);
    List<Invoice> getMyInvoices(String clientId);
}
