export interface InvoiceItem {
    productId: string;     // Référence produit
    productName: string;   // Nom produit
    quantity: number;      // Quantité
    unitPrice: number;     // Prix unitaire
    totalPrice: number;    // Total = quantity * unitPrice
}

export interface Invoice {

    id: string;            // Invoice ID
    orderId: string;
    orderRef?: string;
    customerId: string;
    stripePriceId:string;// ID du client
    customerName: string;  // Nom du client
    customerEmail: string; // Email du client
    items: InvoiceItem[];  // Liste des produits avec référence et nom
    netAmount: number;     // Montant hors taxes
    tax: number;           // Montant taxes
    discount: number;      // Réduction éventuelle
    totalAmount: number;   // Total = net + tax - discount
    paid: boolean;         // Facture réglée ou non
    paymentIntentId?: string; // Stripe Payment Intent ID

    issueDate: string;     // Date d'émission (ISO string)
    dueDate: string;       // Date limite de paiement (ISO string)
    sentAt?: string;       // Date d'envoi (ISO string)
    paidAt?: string;       // Date du paiement (ISO string)

    status: string;        // Draft / Sent / Paid / Overdue
    currency: string;      // Devise (USD, EUR, ...)
    notes?: string;        // Commentaires ou informations supplémentaires
}
