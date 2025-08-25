package tn.epac.billingservice.controller;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import tn.epac.billingservice.client.OrderClient;
import tn.epac.billingservice.dto.OrderDto;
import tn.epac.billingservice.entity.Invoice;
import tn.epac.billingservice.service.InvoiceService;

import java.util.List;

@RestController
@RequestMapping("/billing/invoices")
public class BillingController {

    private final InvoiceService invoiceService;
    private final OrderClient orderClient;

    public BillingController(InvoiceService invoiceService, OrderClient orderClient) {
        this.invoiceService = invoiceService;
        this.orderClient = orderClient;
    }

    @PostMapping("/{orderId}")
    public ResponseEntity<Invoice> generate(@PathVariable String orderId, @AuthenticationPrincipal Jwt jwt) {
        try {
            String authToken = jwt.getTokenValue();
            Invoice invoice = invoiceService.generateInvoice(orderId, authToken);
            return ResponseEntity.ok(invoice);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to generate invoice", e);
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Invoice> getInvoiceByOrderId(@PathVariable String orderId, @AuthenticationPrincipal Jwt jwt) {
        Invoice invoice = invoiceService.findByOrderId(orderId);
        if (invoice == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(invoice);
    }

    @GetMapping("/reports/csv")
    public List<Invoice> exportCsv() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/{orderId}/download")
    public ResponseEntity<Resource> downloadInvoice(
            @PathVariable String orderId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        try {
            String authToken = jwt.getTokenValue();
            Invoice invoice = invoiceService.findByOrderId(orderId);
            if (invoice == null) {
                return ResponseEntity.notFound().build();
            }

            OrderDto order = orderClient.getOrderById(orderId, authToken);
            String customerName = extractCustomerNameFromJwt(jwt);

            byte[] pdfBytes = invoiceService.createPdf(invoice, order, customerName);

            if (pdfBytes == null || pdfBytes.length == 0) {
                // No PDF generated → respond gracefully
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null);
            }

            ByteArrayResource resource = new ByteArrayResource(pdfBytes);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment;filename=invoice_" + orderId + ".pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .contentLength(resource.contentLength())
                    .body(resource);

        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to generate PDF",
                    e
            );
        }
    }


    private String extractCustomerNameFromJwt(Jwt jwt) {
        String customerName = jwt.getClaimAsString("preferred_username");
        if (customerName == null) {
            customerName = jwt.getClaimAsString("name") != null ? jwt.getClaimAsString("name") : "Unknown Customer";
        }
        return customerName;
    }
}