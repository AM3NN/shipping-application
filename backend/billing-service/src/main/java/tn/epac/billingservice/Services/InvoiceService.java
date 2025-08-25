package tn.epac.billingservice.Services;


import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import tn.epac.billingservice.DTO.OrderDTO;
import tn.epac.billingservice.DTO.OrderDetailDTO;
import tn.epac.billingservice.DTO.UserProfileDto;
import tn.epac.billingservice.Entities.Invoice;
import tn.epac.billingservice.Repositories.InvoiceRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.stream.Collectors;

@Slf4j
@Service
public class InvoiceService implements IinvoiceService{

    @Autowired
    private InvoiceRepository invoiceRepository;
    private OrderClient orderClient;
    private UserClient userClient;

    private final JavaMailSender mailSender;
    public InvoiceService(OrderClient orderClient, UserClient userClient, JavaMailSender mailSender) {
        this.orderClient = orderClient;
        this.userClient = userClient;

        this.mailSender = mailSender;
    }

    @Override
    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    @Override
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }


    @Override
    public Invoice generateInvoiceFromOrder(String orderId) {
        try {
            // 1️⃣ Récupérer la commande
            OrderDTO order = orderClient.getOrder(orderId);
            if (order == null) {
                throw new IllegalStateException("Order not found for ID: " + orderId);
            }

            // 2️⃣ Récupérer les infos du client
            UserProfileDto clientProfile = null;
            try {
                clientProfile = userClient.getUserProfile(order.getClientId());
            } catch (FeignException.NotFound e) {
                log.warn("Client not found with ID: {}", order.getClientId());
            }

            String customerName = clientProfile != null ? clientProfile.getUsername() : "Client Name Placeholder";
            String customerEmail = clientProfile != null ? clientProfile.getEmail() : "email@example.com";

            // 3️⃣ Mapper les produits classiques vers InvoiceItem
            List<Invoice.InvoiceItem> items = order.getProducts().stream().map(orderProduct -> {
                Invoice.InvoiceItem item = new Invoice.InvoiceItem();
                item.setProductId(orderProduct.getProduct().getId());
                item.setProductName(orderProduct.getProduct().getName());
                item.setQuantity(orderProduct.getQuantity());
                BigDecimal unitPrice = BigDecimal.valueOf(orderProduct.getProduct().getPrice());
                item.setUnitPrice(unitPrice);
                item.setTotalPrice(unitPrice.multiply(BigDecimal.valueOf(orderProduct.getQuantity())));
                return item;
            }).collect(Collectors.toList());

            // 4️⃣ Ajouter les customProducts (OrderDetails) comme items
            List<OrderDetailDTO> customProducts = orderClient.getOrderDetails(orderId);
            if (customProducts == null || customProducts.isEmpty()) {
                log.info("Aucun customProduct trouvé pour la commande {}", orderId);
            } else {
                log.info("CustomProducts trouvés pour la commande {}: {}", orderId, customProducts);
            }
            List<Invoice.InvoiceItem> customItems = customProducts.stream()
                    .map(detail -> {
                        Invoice.InvoiceItem item = new Invoice.InvoiceItem();
                        item.setProductId(detail.getId());
                        item.setProductName(detail.getReference()); // ou un nom plus descriptif
                        item.setQuantity(detail.getQuantity());
                        // Calculer le prix selon ton modèle ou utiliser un champ totalAmount si présent
                        BigDecimal total = BigDecimal.valueOf(
                                detail.getWeight() != null ? detail.getWeight() : 0
                        );
                        item.setUnitPrice(total);
                        item.setTotalPrice(total.multiply(BigDecimal.valueOf(detail.getQuantity())));
                        return item;
                    })
                    .collect(Collectors.toList());

            // Ajouter les customItems aux items existants
            items.addAll(customItems);

            // 5️⃣ Calculer les montants globaux
            BigDecimal net = order.getNetAmount() != null ? order.getNetAmount() : BigDecimal.ZERO;
            BigDecimal tax = order.getTax() != null ? order.getTax() : BigDecimal.ZERO;
            BigDecimal discount = order.getDiscount() != null ? order.getDiscount() : BigDecimal.ZERO;
            BigDecimal total = net.add(tax).subtract(discount);

            // 6️⃣ Construire la facture
            Invoice invoice = new Invoice();
            invoice.setOrderId(order.getId());
            invoice.setOrderRef(order.getReference());
            invoice.setCustomerId(order.getClientId());
            invoice.setCustomerName(customerName);
            invoice.setCustomerEmail(customerEmail);
            invoice.setItems(items);
            invoice.setNetAmount(net);
            invoice.setTax(tax);
            invoice.setDiscount(discount);
            invoice.setTotalAmount(total);
            invoice.setPaid(false);
            invoice.setIssueDate(LocalDate.now());
            invoice.setDueDate(LocalDate.now().plusDays(30));
            invoice.setStatus("Draft");
            invoice.setCurrency(order.getTotalCurrency() != null ? order.getTotalCurrency() : "USD");

            // 7️⃣ Sauvegarder et retourner
            invoiceRepository.save(invoice);
            sendInvoiceEmail(invoice);

            return invoice;

        } catch (FeignException.Unauthorized e) {
            throw new IllegalStateException("Unauthorized while accessing order-service or user-service", e);
        } catch (FeignException e) {
            throw new IllegalStateException("Error while calling remote service: " + e.status(), e);
        }
    }



    @Override
    public List<Invoice> getMyInvoices(String clientId) {
        return invoiceRepository.findByCustomerId(clientId);
    }

    private void sendInvoiceEmail(Invoice invoice) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(invoice.getCustomerEmail());
            message.setSubject("Votre facture #" + invoice.getId());
            message.setText("Bonjour " + invoice.getCustomerName() + ",\n\n"
                    + "Votre facture a été générée avec succès.\n"
                    + "Montant total: " + invoice.getTotalAmount() + " " + invoice.getCurrency() + "\n"
                    + "Date d’échéance: " + invoice.getDueDate() + "\n\n"
                    + "Merci pour votre confiance.");

            mailSender.send(message);

            // Mettre à jour le statut de l’envoi
            invoice.setStatus("Sent");
            invoice.setSentAt(LocalDateTime.now());
            invoiceRepository.save(invoice);

        } catch (Exception e) {
            e.printStackTrace();
            // Si erreur email, garder la facture en Draft
        }
    }
    public ByteArrayOutputStream generateInvoicePdf(Invoice invoice) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        // Code OpenPDF ou iText pour créer le PDF
        Document document = new Document();
        PdfWriter.getInstance(document, out);
        document.open();
        document.add(new Paragraph("Invoice #" + invoice.getOrderRef()));
        document.add(new Paragraph("Customer: " + invoice.getCustomerName()));
        document.add(new Paragraph("Amount: " + invoice.getTotalAmount()));
        // Ajouter items, dates, etc.
        document.close();
        return out;
    }


    public Invoice getInvoiceById(String invoiceId) {
        return invoiceRepository.findById(invoiceId).orElse(null);
    }


 @Override
 public BigDecimal getTotalRevenue() {
        List<Invoice> paidInvoices = invoiceRepository.findByPaidTrue(); // toutes les factures payées
        return paidInvoices.stream()
                .map(Invoice::getTotalAmount)          // récupère totalAmount de chaque facture
                .reduce(BigDecimal.ZERO, BigDecimal::add); // additionne tous les montants
    }
}