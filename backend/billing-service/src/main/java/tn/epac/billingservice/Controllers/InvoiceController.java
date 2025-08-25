package tn.epac.billingservice.Controllers;


import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import tn.epac.billingservice.DTO.OrderDTO;
import tn.epac.billingservice.Entities.Invoice;
import tn.epac.billingservice.Repositories.InvoiceRepository;
import tn.epac.billingservice.Services.InvoiceService;
import tn.epac.billingservice.Services.OrderClient;
import tn.epac.billingservice.Services.PaymentService;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/billings")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;
    private final OrderClient orderClient;
    private final PaymentService paymentService;
    private final InvoiceRepository invoiceRepository;
    public InvoiceController(OrderClient orderClient, PaymentService paymentService, InvoiceRepository invoiceRepository) {
        this.orderClient = orderClient;
        this.paymentService = paymentService;
        this.invoiceRepository = invoiceRepository;
    }


    @GetMapping("/orders")
    public ResponseEntity<List<OrderDTO>> getOrdersfromprderService() {
        List<OrderDTO> orders = orderClient.getAllOrders();
        return ResponseEntity.ok(orders);
    }
    @GetMapping("/getorder/{id}")
    public OrderDTO getOrder(@PathVariable("id") String id) {
        return orderClient.getOrder(id);
    }
    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        return invoiceService.createInvoice(invoice);
    }
    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }
    @PostMapping("/generate/{orderId}")
    public ResponseEntity<?> generateInvoice(@PathVariable String orderId) {
        try {
            Invoice invoice = invoiceService.generateInvoiceFromOrder(orderId);

            if (invoice == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No invoice could be generated for orderId: " + orderId);
            }

            return ResponseEntity.ok(invoice);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while generating invoice: " + e.getMessage());
        }
    }
    @GetMapping("/test/{id}")
    public ResponseEntity<OrderDTO> testGetOrder(@PathVariable String id) {
        OrderDTO order = orderClient.getOrder(id);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/myinvoices/{clientId}")
    public ResponseEntity<List<Invoice>> getMyInvoices(@PathVariable String clientId) {
        List<Invoice> invoices = invoiceService.getMyInvoices(clientId);
        return ResponseEntity.ok(invoices);
    }
    @GetMapping("/download/{invoiceId}")
    public ResponseEntity<byte[]> downloadInvoice(@PathVariable String invoiceId) throws IOException {
        Invoice invoice = invoiceService.getInvoiceById(invoiceId);

        // Générer le PDF (OpenPDF ou iText)
        ByteArrayOutputStream pdfOutputStream = invoiceService.generateInvoicePdf(invoice);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.builder("attachment")
                .filename("invoice_" + invoice.getOrderRef() + ".pdf")
                .build());

        return new ResponseEntity<>(pdfOutputStream.toByteArray(), headers, HttpStatus.OK);
    }
    @PostMapping("/create-payment-intent/{invoiceId}")
    public ResponseEntity<Map<String, Object>> createPaymentIntent(@PathVariable String invoiceId) {
        try {
            // 1️⃣ Récupérer la facture
            Invoice invoice = invoiceService.getInvoiceById(invoiceId);
            if (invoice == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Invoice not found"));
            }

            // 2️⃣ Vérifier le montant
            if (invoice.getTotalAmount() == null || invoice.getTotalAmount().compareTo(BigDecimal.ZERO) <= 0) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Invalid invoice amount"));
            }

            // 3️⃣ Convertir le montant en centimes
            Long amount = invoice.getTotalAmount().multiply(new BigDecimal(100)).longValue();

            // 4️⃣ Création du PaymentIntent Stripe
            Map<String, Object> params = new HashMap<>();
            params.put("amount", amount);
            params.put("currency", "usd");
            params.put("payment_method_types", Arrays.asList("card")); // obligatoire

            PaymentIntent intent = PaymentIntent.create(params);

            // 5️⃣ Réponse
            Map<String, Object> response = new HashMap<>();
            response.put("clientSecret", intent.getClientSecret());
            return ResponseEntity.ok(response);

        } catch (StripeException e) {
            e.printStackTrace(); // log complet pour debug
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    @PutMapping("/invoices/{id}/pay")
    public ResponseEntity<Invoice> payInvoice(@PathVariable String id, @RequestBody Map<String, String> payload) {
        return invoiceRepository.findById(id)
                .map(invoice -> {
                    invoice.setPaid(true);                         // ✅ payé
                    invoice.setStatus("PAID");                     // ✅ statut
                    invoice.setPaidAt(LocalDateTime.now());        // ✅ date paiement

                    // Si tu veux enregistrer l’ID du paiement stripe (si fourni)
                    if (payload.containsKey("paymentIntentId")) {
                        invoice.setPaymentIntentId(payload.get("paymentIntentId"));
                    }

                    Invoice updated = invoiceRepository.save(invoice);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/total-revenue")
    public ResponseEntity<Map<String, Object>> getTotalRevenue() {
        try {
            BigDecimal totalRevenue = invoiceService.getTotalRevenue();
            return ResponseEntity.ok(Map.of(
                    "totalRevenue", totalRevenue
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Failed to calculate total revenue",
                    "details", e.getMessage()
            ));
        }
    }

}