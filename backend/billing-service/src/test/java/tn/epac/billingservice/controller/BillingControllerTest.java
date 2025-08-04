package tn.epac.billingservice.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;
import tn.epac.billingservice.entity.Invoice;
import tn.epac.billingservice.repository.InvoiceRepository;
import tn.epac.billingservice.service.InvoiceService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;

import static org.mockito.Mockito.when;

@WebFluxTest(BillingController.class)
class BillingControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Mock
    private InvoiceService invoiceService;

    @Mock
    private InvoiceRepository invoiceRepository;

    private Invoice testInvoice;

    @BeforeEach
    void setUp() {
        testInvoice = new Invoice();
        testInvoice.setId("1");
        testInvoice.setOrderId("ORD123");
        testInvoice.setTotalAmount(new BigDecimal("199.99"));
        testInvoice.setIssueDate(LocalDate.now());
        testInvoice.setSent(true);
        testInvoice.setSentAt(LocalDateTime.now());
    }

    @Test
    void testGenerateInvoice() {
        when(invoiceService.generateInvoice("ORD123")).thenReturn(Mono.just(testInvoice));

        webTestClient.post()
                .uri("/billing/invoices/ORD123")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.orderId").isEqualTo("ORD123")
                .jsonPath("$.totalAmount").isEqualTo(199.99)
                .jsonPath("$.sent").isEqualTo(true);
    }

    @Test
    void testGetInvoiceByOrderId() {
        when(invoiceService.findByOrderId("ORD123")).thenReturn(Mono.just(testInvoice));

        webTestClient.get()
                .uri("/billing/invoices/ORD123")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.id").isEqualTo("1")
                .jsonPath("$.orderId").isEqualTo("ORD123")
                .jsonPath("$.totalAmount").isEqualTo(199.99);
    }

    @Test
    void testExportCsv() {
        when(invoiceService.getAllInvoices()).thenReturn(Collections.singletonList(testInvoice));

        webTestClient.get()
                .uri("/billing/invoices/reports/csv")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$[0].orderId").isEqualTo("ORD123")
                .jsonPath("$[0].totalAmount").isEqualTo(199.99);
    }

    @Test
    void testDownloadInvoice_FileNotFound() {
        when(invoiceService.findByOrderId("ORD123")).thenReturn(Mono.just(testInvoice));

        webTestClient.get()
                .uri("/billing/invoices/ORD123/download")
                .exchange()
                .expectStatus().isNotFound(); // unless PDF exists in /invoices
    }
}
