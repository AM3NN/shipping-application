package tn.epac.billingservice.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@Document(collection = "invoices")
public class Invoice {

    // 1️⃣ Identifiants
    @Id
    private String id;
    private String  stripePriceId;// Invoice ID
    private String orderId;
    private String orderRef;
    private String customerId;          // ID du client
    private String customerName;        // Nom du client
    private String customerEmail;       // Email du client

    // 2️⃣ Produits de la facture
    private List<InvoiceItem> items;    // Liste des produits avec référence et nom

    // 3️⃣ Montants
    private BigDecimal netAmount;       // Montant hors taxes
    private BigDecimal tax;             // Montant taxes
    private BigDecimal discount;        // Réduction éventuelle
    private BigDecimal totalAmount;     // Total = net + tax - discount
    private boolean paid;               // Facture réglée ou non
    private String paymentIntentId;     // Stripe Payment Intent ID

    // 4️⃣ Dates
    private LocalDate issueDate;        // Date d'émission
    private LocalDate dueDate;          // Date limite de paiement
    private LocalDateTime sentAt;       // Date d'envoi
    private LocalDateTime paidAt;       // Date du paiement

    // 5️⃣ Statut / Informations supplémentaires
    private String status;              // Draft / Sent / Paid / Overdue
    private String currency;            // Devise (USD, EUR, ...)
    private String notes;               // Commentaires ou informations supplémentaires

    // Inner class pour représenter un item de facture
    @Getter
    @Setter
    public static class InvoiceItem {
        private String productId;       // Référence produit
        private String productName;     // Nom produit
        private int quantity;           // Quantité
        private BigDecimal unitPrice;   // Prix unitaire
        private BigDecimal totalPrice;  // Total = quantity * unitPrice
    }
}