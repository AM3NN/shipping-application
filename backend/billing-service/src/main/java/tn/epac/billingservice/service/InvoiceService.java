package tn.epac.billingservice.service;

import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.borders.Border;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tn.epac.billingservice.client.OrderClient;
import tn.epac.billingservice.dto.OrderDto;
import tn.epac.billingservice.entity.Invoice;
import tn.epac.billingservice.repository.InvoiceRepository;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
public class InvoiceService {

    private final OrderClient orderClient;
    private final InvoiceRepository invoiceRepository;
    private final JavaMailSender mailSender;
    private final JwtDecoder jwtDecoder;
    public InvoiceService(OrderClient orderClient, InvoiceRepository invoiceRepository, JavaMailSender mailSender, JwtDecoder jwtDecoder) {
        this.orderClient = orderClient;
        this.invoiceRepository = invoiceRepository;
        this.mailSender = mailSender;
        this.jwtDecoder = jwtDecoder;
    }

    public Invoice generateInvoice(String orderId, String authToken) {
        if (invoiceRepository.existsByOrderId(orderId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Invoice already exists");
        }
        OrderDto order = orderClient.getOrderById(orderId, authToken);
        if (order == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
        }
        Invoice invoice = new Invoice();
        invoice.setOrderId(String.valueOf(order.getId()));
        invoice.setTotalAmount(order.getTotalAmount());
        invoice.setIssueDate(LocalDate.now());

        String customerName = extractCustomerNameFromJwt(authToken);

        Invoice saved = invoiceRepository.save(invoice);
        byte[] pdfBytes = createPdf(saved, order, customerName);
        sendInvoiceEmail(saved, pdfBytes, customerName, authToken);
        return saved;
    }
//ffff
    private String extractCustomerNameFromJwt(String authToken) {
        try {
            Jwt jwt = jwtDecoder.decode(authToken);
            String customerName = jwt.getClaimAsString("preferred_username");
            if (customerName == null) {
                customerName = jwt.getClaimAsString("name") != null ? jwt.getClaimAsString("name") : "Unknown Customer";
            }
            return customerName;
        } catch (Exception e) {
            return "Unknown Customer";
        }
    }

    public Invoice findByOrderId(String orderId) {
        return invoiceRepository.findByOrderId(orderId).orElse(null);
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public byte[] createPdf(Invoice invoice, OrderDto order, String customerName) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document doc = new Document(pdfDoc);
            doc.setMargins(40, 40, 40, 40);
            doc.setFontSize(11);

            Paragraph companyHeader = new Paragraph()
                    .add(new Text("EPAC COMPANY\n").setFontSize(16).setBold())
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

            Table detailsTable = new Table(new float[]{30, 70});
            detailsTable.setMarginBottom(20);
            addDetailRow(detailsTable, "Invoice Number:", invoice.getId());
            addDetailRow(detailsTable, "Order Number:", invoice.getOrderId());
            addDetailRow(detailsTable, "Customer Name:", customerName);
            addDetailRow(detailsTable, "Date Issued:", invoice.getIssueDate().toString());
            addDetailRow(detailsTable, "Payment Due:", invoice.getIssueDate().plusDays(30).toString());

            if (order.getExpectedDate() != null) {
                addDetailRow(detailsTable, "Expected Delivery:", order.getExpectedDate().toString());
            }
            if (order.getEstimatedFabricationTime() != null && !order.getEstimatedFabricationTime().isEmpty()) {
                addDetailRow(detailsTable, "Fabrication Time:", order.getEstimatedFabricationTime());
            }
            if (order.getPredictedPrice() != 0.0) {
                addDetailRow(detailsTable, "Predicted Price:", String.format("%.2f", order.getPredictedPrice()));
            }
            doc.add(detailsTable);

            Table itemsTable = new Table(new float[]{50, 15, 15, 20});
            itemsTable.setMarginTop(20);
            itemsTable.addHeaderCell(createHeaderCell("DESCRIPTION"));
            itemsTable.addHeaderCell(createHeaderCell("UNIT PRICE (TND)"));
            itemsTable.addHeaderCell(createHeaderCell("QTY"));
            itemsTable.addHeaderCell(createHeaderCell("AMOUNT (TND)"));
            BigDecimal unitPrice = order.getTotalAmount().divide(BigDecimal.valueOf(order.getQuantity()), 2, RoundingMode.HALF_UP);
            int quantity = order.getQuantity();
            BigDecimal amount = unitPrice.multiply(BigDecimal.valueOf(quantity));
            addItemRow(itemsTable, "Custom Product/Service", unitPrice, quantity, amount);
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
                    .add("EPAC Company - Tel: +216 70 526 370")
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.CENTER);
            doc.add(footer);

            doc.close();
            return baos.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to generate PDF invoice");
        }
    }

    private void sendInvoiceEmail(Invoice invoice, byte[] pdfBytes, String customerName, String authToken) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            String recipientEmail = extractRecipientEmailFromJwt(authToken);

            helper.setTo(recipientEmail);
            helper.setSubject("Your Invoice #" + invoice.getId());
            helper.setFrom("no-reply@epac.tn");
            helper.setText(
                    "Dear " + customerName + ",\n\n" +
                            "Thank you for your order! Please find your invoice attached.\n" +
                            "Invoice Number: " + invoice.getId() + "\n" +
                            "Order Number: " + invoice.getOrderId() + "\n" +
                            "Total Amount: " + String.format("%.2f", invoice.getTotalAmount()) + " TND\n\n" +
                            "Best regards,\nEPAC Company"
            );

            helper.addAttachment("invoice_" + invoice.getOrderId() + ".pdf", new ByteArrayResource(pdfBytes));
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send invoice email");
        }
    }

    private String extractRecipientEmailFromJwt(String authToken) {
        try {
            Jwt jwt = jwtDecoder.decode(authToken);
            String recipientEmail = jwt.getClaimAsString("email");
            if (recipientEmail == null || recipientEmail.isEmpty()) {
                recipientEmail = jwt.getClaimAsString("preferred_username");
                if (recipientEmail == null || recipientEmail.isEmpty()) {
                    recipientEmail = "amenallah.laouini@esprit.tn";
                }
            }
            return recipientEmail;
        } catch (Exception e) {
            return "amenallah.laouini@esprit.tn";
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