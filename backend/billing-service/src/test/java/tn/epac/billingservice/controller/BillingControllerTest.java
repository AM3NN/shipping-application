package tn.epac.billingservice.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.web.servlet.MockMvc;
import tn.epac.billingservice.client.OrderClient;
import tn.epac.billingservice.dto.OrderDto;
import tn.epac.billingservice.entity.Invoice;
import tn.epac.billingservice.service.InvoiceService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BillingController.class)
class BillingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private OrderClient orderClient;

    private Invoice testInvoice;
    private OrderDto testOrder;
    private Jwt testJwt;

    @TestConfiguration
    static class TestConfig {
        @Bean
        public InvoiceService invoiceService() {
            return Mockito.mock(InvoiceService.class);
        }

        @Bean
        public OrderClient orderClient() {
            return Mockito.mock(OrderClient.class);
        }
    }

    @BeforeEach
    void setUp() {
        // Set up test invoice
        testInvoice = new Invoice();
        testInvoice.setId("1");
        testInvoice.setOrderId("123");
        testInvoice.setTotalAmount(new BigDecimal("199.99"));
        testInvoice.setIssueDate(LocalDate.now());
        testInvoice.setSent(true);
        testInvoice.setSentAt(LocalDateTime.now());

        // Set up test order
        testOrder = new OrderDto();
        testOrder.setId(123);
        testOrder.setUserId("123e4567-e89b-12d3-a456-426614174000");
        testOrder.setStatus("Pending");
        testOrder.setTotalAmount(new BigDecimal("199.99"));
        testOrder.setQuantity(2);
        testOrder.setCreatedDate(LocalDate.now().minusDays(3));
        testOrder.setExpectedDate(LocalDate.now().plusDays(7));
        testOrder.setDeliveryLocation("Customer B");
        testOrder.setPredictedPrice(180.00);
        testOrder.setShippingMethod("Air");

        // Set up test JWT
        testJwt = Jwt.withTokenValue("test-token")
                .header("alg", "HS256")
                .claim("sub", "123e4567-e89b-12d3-a456-426614174000")
                .claim("preferred_username", "testuser")
                .claim("name", "Test User")
                .claim("email", "testuser@example.com")
                .build();
    }

    @Test
    void testGenerateInvoice() throws Exception {
        when(invoiceService.generateInvoice("123", testJwt.getTokenValue())).thenReturn(testInvoice);

        mockMvc.perform(post("/billing/invoices/123")
                        .with(jwt().jwt(testJwt))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId").value("123"))
                .andExpect(jsonPath("$.totalAmount").value(199.99))
                .andExpect(jsonPath("$.sent").value(true));
    }

    @Test
    void testGetInvoiceByOrderId() throws Exception {
        when(invoiceService.findByOrderId("123")).thenReturn(testInvoice);

        mockMvc.perform(get("/billing/invoices/123")
                        .with(jwt().jwt(testJwt)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.orderId").value("123"))
                .andExpect(jsonPath("$.totalAmount").value(199.99));
    }

    @Test
    void testExportCsv() throws Exception {
        when(invoiceService.getAllInvoices()).thenReturn(Collections.singletonList(testInvoice));

        mockMvc.perform(get("/billing/invoices/reports/csv")
                        .with(jwt().jwt(testJwt)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].orderId").value("123"))
                .andExpect(jsonPath("$[0].totalAmount").value(199.99));
    }

    @Test
    void testDownloadInvoice() throws Exception {
        byte[] pdfBytes = "Sample PDF content".getBytes();
        when(invoiceService.findByOrderId("123")).thenReturn(testInvoice);
        when(orderClient.getOrderById(anyString(), anyString())).thenReturn(testOrder);
        when(invoiceService.createPdf(testInvoice, testOrder, "Test User")).thenReturn(pdfBytes);

        mockMvc.perform(get("/billing/invoices/123/download")
                        .with(jwt().jwt(testJwt)))
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.CONTENT_TYPE, containsString(MediaType.APPLICATION_PDF_VALUE)))
                .andExpect(header().string(HttpHeaders.CONTENT_DISPOSITION, containsString("attachment;filename=invoice_123.pdf")))
                .andExpect(content().bytes(pdfBytes));
    }

    @Test
    void testDownloadInvoice_FileNotFound() throws Exception {
        when(invoiceService.findByOrderId("123")).thenReturn(null);

        mockMvc.perform(get("/billing/invoices/123/download")
                        .with(jwt().jwt(testJwt)))
                .andExpect(status().isNotFound());
    }
}
