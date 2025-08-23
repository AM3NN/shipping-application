import { Component, OnInit } from '@angular/core';
import { BillingserviceService } from "./billingservice.service";
import { TableModule } from "primeng/table";
import {CurrencyPipe, DatePipe, NgClass, NgIf} from "@angular/common";
import { Tag } from "primeng/tag";
import { KeycloakService } from "keycloak-angular";
import { Invoice } from "./invoice.model";
import { ButtonDirective } from "primeng/button";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {Dialog} from "primeng/dialog";
import {Card} from "primeng/card";

@Component({
    selector: 'app-billing',
    imports: [
        TableModule,
        CurrencyPipe,
        DatePipe,
        Tag,
        ButtonDirective,
        NgIf,
        Dialog,
        NgClass,
        Card
    ],
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
    invoices: Invoice[] = [];
    loading = true;
    stripe: Stripe | null = null;
    card: any;
    showCardForm = false;
    selectedInvoice: Invoice | null = null;
    clientId?: string;
    constructor(
        private invoiceService: BillingserviceService,
        private keycloakService: KeycloakService,
    ) { }

    async ngOnInit(): Promise<void> {
        // Charger Stripe
        this.stripe = await loadStripe('pk_test_51RxSNnRveyiEnQT7vnZKRvSTi2FQTzPsggIP2SM0EY9bzTbVOHzEIFLbqqNa9ZydgBwXThOGRJxA2dIo2zPEVy6000XVfIDljN');
        if (!this.stripe) console.error('Impossible de charger Stripe !');

        try {
            const profile = await this.keycloakService.loadUserProfile();
            const clientId = profile.id;

            this.invoiceService.getInvoices(clientId).subscribe({
                next: (data) => {
                    this.invoices = data;
                    this.loading = false;
                },
                error: (err) => {
                    console.error('Erreur chargement invoices', err);
                    this.loading = false;
                }
            });
        } catch (err) {
            console.error('Impossible de récupérer le profil Keycloak', err);
            this.loading = false;
        }
    }


    async payInvoice(invoice: Invoice) {
        if (!this.stripe || !this.card) return;

        const res = await this.invoiceService.createPaymentIntent(invoice.id).toPromise();
        if (!res?.clientSecret) return console.error('ClientSecret manquant !');

        const { paymentIntent, error } = await this.stripe.confirmCardPayment(res.clientSecret, {
            payment_method: {
                card: this.card,
                billing_details: {
                    name: invoice.customerName,
                    email: invoice.customerEmail
                }
            }
        });

        if (error) {
            console.error('Erreur Stripe:', error);
        } else if (paymentIntent?.status === 'succeeded') {
            console.log('Paiement réussi pour', invoice.orderRef);

            // ✅ Mise à jour optimiste en mémoire (UI instantanée)
            invoice.paid = true;
            invoice.status = 'PAID';
            invoice.paidAt = new Date() as any;

            this.invoiceService.payInvoice(invoice.id, paymentIntent.id).subscribe({
                next: (updated) => {
                    console.log('Facture mise à jour côté backend :', updated);

                    // ✅ Rafraîchir pour récupérer les données exactes
                    this.loadInvoices();
                    this.closeStripeForm();
                },
                error: (err) => console.error('Erreur mise à jour backend:', err)
            });
        }
    }



    viewInvoice(invoice: Invoice) { }

    downloadInvoice(invoiceId: string) {
        this.invoiceService.downloadInvoice(invoiceId);
    }


    showStripeDialog(invoice: Invoice) {
        this.selectedInvoice = invoice;
        this.showCardForm = true;

        // Monter le formulaire Stripe après que le dialog soit visible
        setTimeout(() => {
            if (!this.stripe) return;

            const cardElementDiv = document.getElementById('card-element');
            if (!cardElementDiv) return;

            const elements = this.stripe.elements();
            this.card = elements.create('card');
            this.card.mount('#card-element');

            this.card.on('change', (event: any) => {
                const displayError = document.getElementById('card-errors');
                if (displayError) displayError.textContent = event.error ? event.error.message : '';
            });
        }, 0);
    }

    closeStripeForm() {
        this.showCardForm = false;
        this.selectedInvoice = null;
        if (this.card) {
            this.card.unmount();
            this.card = null;
        }
    }


    loadInvoices(): void {
        if (!this.clientId) {
            console.warn('Aucun clientId trouvé');
            return;
        }

        this.loading = true;
        this.invoiceService.getInvoices(this.clientId).subscribe({
            next: (data) => {
                this.invoices = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Erreur lors du chargement des factures:', err);
                this.loading = false;
            }
        });
    }

    get totalInvoices(): number {
        return this.invoices.length;
    }

    get totalPaid(): number {
        return this.invoices.filter(i => i.paid).length;
    }

    get totalUnpaid(): number {
        return this.invoices.filter(i => !i.paid).length;
    }

    get totalAmount(): number {
        return this.invoices.reduce((sum, i) => sum + i.totalAmount, 0);
    }

    get totalPaidAmount(): number {
        return this.invoices
            .filter(i => i.paid)
            .reduce((sum, i) => sum + i.totalAmount, 0);
    }

    get totalUnpaidAmount(): number {
        return this.invoices
            .filter(i => !i.paid)
            .reduce((sum, i) => sum + i.totalAmount, 0);
    }

}
