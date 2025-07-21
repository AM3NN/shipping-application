package tn.epac.billingservice.service;

import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.borders.Border;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import tn.epac.billingservice.client.OrderClient;
import tn.epac.billingservice.entity.Invoice;
import tn.epac.billingservice.repository.InvoiceRepository;

import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@Service
public class InvoiceService {

    private final OrderClient orderClient;
    private final InvoiceRepository invoiceRepository;

    public InvoiceService(OrderClient orderClient,
                          InvoiceRepository invoiceRepository) {
        this.orderClient = orderClient;
        this.invoiceRepository = invoiceRepository;
    }
    public Mono<Invoice> generateInvoice(String orderId) {
        return Mono.fromCallable(() -> {
            if (invoiceRepository.existsByOrderId(orderId)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Invoice already exists");
            }
            var order = orderClient.getOrderById(orderId).block();  // blocking here
            if (order == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
            }

            Invoice invoice = new Invoice();
            invoice.setOrderId(order.getId());
            invoice.setTotalAmount(order.getTotalAmount());
            invoice.setIssueDate(LocalDate.now());

            Invoice saved = invoiceRepository.save(invoice);
            createPdf(orderId, saved);
            return saved;
        }).subscribeOn(Schedulers.boundedElastic());
    }

    public Mono<Invoice> findByOrderId(String orderId) {
        return Mono.justOrEmpty(invoiceRepository.findByOrderId(orderId).stream().findFirst().orElse(null));
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    private void createPdf(String orderId, Invoice invoice) {
        try {
            Path dir = Paths.get("invoices");
            Files.createDirectories(dir);
            Path pdfPath = dir.resolve("invoice_" + orderId + ".pdf");

            try (PdfWriter writer = new PdfWriter(pdfPath.toString());
                 PdfDocument pdfDoc = new PdfDocument(writer);
                 Document doc = new Document(pdfDoc)) {

                doc.setMargins(40, 40, 40, 40);
                doc.setFontSize(11);

                Table headerTable = new Table(new float[]{30, 70});
                headerTable.setWidth(100);
                // Add company header
                Paragraph companyHeader = new Paragraph()
                        .add(new Text("EPAC COMPANY\n").setFontSize(16).setBold())
                        .add(new Text("123 Business Street, Tunis\n").setFontSize(10))
                        .add(new Text("Phone: +216 70 526 370\n").setFontSize(10))
                        .add(new Text("Email: contact@epac.tn\n").setFontSize(10))
                        .add(new Text("VAT: TN12345678\n").setFontSize(10))
                        .setTextAlignment(TextAlignment.RIGHT);
                doc.add(companyHeader);
                doc.add(new Paragraph("\n"));
                Paragraph title = new Paragraph("TAX INVOICE")
                        .setFontSize(20)
                        .setBold()
                        .setTextAlignment(TextAlignment.CENTER)
                        .setFontColor(new DeviceRgb(0, 0, 139))
                        .setMarginBottom(20);
                doc.add(title);

                // Invoice details
                Table detailsTable = new Table(new float[]{30, 70});
                detailsTable.setMarginBottom(20);

                var order = orderClient.getOrderById(orderId).block();

                addDetailRow(detailsTable, "Invoice Number:", invoice.getId().toString());
                addDetailRow(detailsTable, "Order Number:", invoice.getOrderId());
                addDetailRow(detailsTable, "Date Issued:", invoice.getIssueDate().toString());
                addDetailRow(detailsTable, "Payment Due:", invoice.getIssueDate().plusDays(30).toString());

                if (order != null) {
                    if (order.getExpectedDate() != null) {
                        addDetailRow(detailsTable, "Expected Delivery:", order.getExpectedDate().toString());
                    }
                    if (order.getEstimatedFabricationTime() != null && !order.getEstimatedFabricationTime().isEmpty()) {
                        addDetailRow(detailsTable, "Fabrication Time:", order.getEstimatedFabricationTime());
                    }
                }

                doc.add(detailsTable);

                Table itemsTable = new Table(new float[]{50, 15, 15, 20});
                itemsTable.setMarginTop(20);
                itemsTable.addHeaderCell(createHeaderCell("DESCRIPTION"));
                itemsTable.addHeaderCell(createHeaderCell("UNIT PRICE (TND)"));
                itemsTable.addHeaderCell(createHeaderCell("QTY"));
                itemsTable.addHeaderCell(createHeaderCell("AMOUNT (TND)"));
                BigDecimal unitPrice = order != null ? order.getTotalAmount().divide(BigDecimal.valueOf(6)) : invoice.getTotalAmount();
                int quantity = 6;
                BigDecimal amount = unitPrice.multiply(BigDecimal.valueOf(quantity));

                addItemRow(itemsTable, "Custom Product/Service",
                        unitPrice, quantity, amount);
                BigDecimal subtotal = amount;
                BigDecimal taxRate = new BigDecimal("0.19");
                BigDecimal taxAmount = subtotal.multiply(taxRate);
                BigDecimal grandTotal = subtotal.add(taxAmount);

                addTotalRow(itemsTable, "SUBTOTAL:", subtotal);
                addTotalRow(itemsTable, "VAT (19%):", taxAmount);
                addGrandTotalRow(itemsTable, "GRAND TOTAL:", grandTotal);

                doc.add(itemsTable);
                Paragraph paymentInfo = new Paragraph()
                        .add(new Text("\nPAYMENT INSTRUCTIONS:\n").setBold())
                        .add("Bank: EPAC Bank\n")
                        .add("Please reference invoice number in payment")
                        .setFontSize(10)
                        .setMarginTop(20);
                doc.add(paymentInfo);

                Paragraph footer = new Paragraph()
                        .add("\n\nThank you for your business!\n")
                        .add("EPAC Company - Reg. Code: A123B456 - Tel: +216 70 526 370")
                        .setFontSize(10)
                        .setTextAlignment(TextAlignment.CENTER);
                doc.add(footer);

            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to generate PDF invoice");
        }
    }


    private void addDetailRow(Table table, String label, String value) {
        table.addCell(createCell(label, true));
        table.addCell(createCell(value, false));
    }

    private void addItemRow(Table table, String description, BigDecimal unitPrice, int quantity, BigDecimal amount) {
        table.addCell(createCell(description, false));
        table.addCell(createCell(String.format("%.2f", unitPrice), false).setTextAlignment(TextAlignment.RIGHT));
        table.addCell(createCell(String.valueOf(quantity), false).setTextAlignment(TextAlignment.RIGHT));
        table.addCell(createCell(String.format("%.2f", amount), false).setTextAlignment(TextAlignment.RIGHT));
    }

    private void addTotalRow(Table table, String label, BigDecimal value) {
        table.addCell(createCell("", false).setBorder(Border.NO_BORDER));
        table.addCell(createCell("", false).setBorder(Border.NO_BORDER));
        table.addCell(createCell(label, true).setTextAlignment(TextAlignment.RIGHT));
        table.addCell(createCell(String.format("%.2f", value), false).setTextAlignment(TextAlignment.RIGHT));
    }

    private void addGrandTotalRow(Table table, String label, BigDecimal value) {
        table.addCell(createCell("", false).setBorder(Border.NO_BORDER));
        table.addCell(createCell("", false).setBorder(Border.NO_BORDER));
        table.addCell(createCell(label, true).setTextAlignment(TextAlignment.RIGHT)
                .setBackgroundColor(new DeviceRgb(230, 230, 230)));
        table.addCell(createCell(String.format("%.2f", value), true).setTextAlignment(TextAlignment.RIGHT)
                .setBackgroundColor(new DeviceRgb(230, 230, 230)));
    }

    private Cell createCell(String text, boolean isBold) {
        Paragraph p = new Paragraph(text);
        if (isBold) {
            p.setBold();
        }
        return new Cell().add(p)
                .setPadding(5)
                .setBorder(Border.NO_BORDER);
    }

    private Cell createHeaderCell(String text) {
        return new Cell()
                .add(new Paragraph(text).setBold())
                .setBackgroundColor(new DeviceRgb(70, 70, 70))
                .setFontColor(new DeviceRgb(255, 255, 255))
                .setPadding(8)
                .setTextAlignment(TextAlignment.CENTER);
    }
}