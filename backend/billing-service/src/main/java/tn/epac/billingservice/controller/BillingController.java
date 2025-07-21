package tn.epac.billingservice.controller;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import tn.epac.billingservice.entity.Invoice;
import tn.epac.billingservice.repository.InvoiceRepository;
import tn.epac.billingservice.service.InvoiceService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/billing/invoices")
public class BillingController {

    private final InvoiceService invoiceService;
    private final InvoiceRepository invoiceRepository;

    public BillingController(InvoiceService invoiceService,
                             InvoiceRepository invoiceRepository) {
        this.invoiceService = invoiceService;
        this.invoiceRepository = invoiceRepository;
    }

    @PostMapping("/{orderId}")
    public Mono<ResponseEntity<Invoice>> generate(@PathVariable String orderId) {
        return invoiceService.generateInvoice(orderId)
                .map(invoice -> ResponseEntity.ok(invoice))
                .onErrorResume(e -> {
                    e.printStackTrace();
                    if (e instanceof ResponseStatusException) {
                        ResponseStatusException ex = (ResponseStatusException) e;
                        return Mono.just(ResponseEntity.status(ex.getStatusCode()).build());
                    }
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }


    @GetMapping("/{orderId}")
    public Mono<ResponseEntity<Invoice>> getInvoiceByOrderId(@PathVariable String orderId) {
        return invoiceService.findByOrderId(orderId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }


    @GetMapping("/reports/csv")
    public List<Invoice> exportCsv() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/{orderId}/download")
    public Mono<ResponseEntity<?>> downloadInvoice(@PathVariable String orderId) {
        return invoiceService.findByOrderId(orderId)
                .flatMap(invoice -> {
                    Path pdfPath = Paths.get("invoices", "invoice_" + orderId + ".pdf");

                    if (!Files.exists(pdfPath)) {
                        return Mono.just(ResponseEntity.notFound().build());
                    }

                    try {
                        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(pdfPath));
                        return Mono.just(
                                ResponseEntity.ok()
                                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=invoice_" + orderId + ".pdf")
                                        .contentType(MediaType.APPLICATION_PDF)
                                        .contentLength(resource.contentLength())
                                        .body(resource)
                        );
                    } catch (IOException e) {
                        return Mono.error(e);
                    }
                })
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }





}
