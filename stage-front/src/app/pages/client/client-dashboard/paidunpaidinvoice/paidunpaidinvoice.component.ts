import { Component, OnDestroy, OnInit } from '@angular/core';
import { UIChart } from "primeng/chart";
import { Subscription } from "rxjs";
import { BillingserviceService } from "../../billing/billingservice.service";
import { KeycloakService } from "keycloak-angular";
import { LayoutService } from "../../../../layout/service/layout.service";
import { Invoice } from "../../billing/invoice.model";

@Component({
    selector: 'app-paidunpaidinvoice',
    standalone: true,
    imports: [UIChart],
    templateUrl: './paidunpaidinvoice.component.html',
    styleUrls: ['./paidunpaidinvoice.component.scss']
})
export class PaidunpaidinvoiceComponent implements OnInit, OnDestroy {

    chartData: any;
    chartOptions: any;

    private subscription = new Subscription();

    constructor(
        private invoiceService: BillingserviceService,
        private keycloakService: KeycloakService,
        public layoutService: LayoutService
    ) {}

    async ngOnInit() {
        try {
            const profile = await this.keycloakService.loadUserProfile();
            const clientId = profile.id;

            // 🔹 Chargement initial des factures
            this.subscription.add(
                this.invoiceService.getInvoices(clientId).subscribe({
                    next: (invoices: Invoice[]) => {
                        this.updateChart(invoices);
                    },
                    error: err => console.error('Erreur initiale factures', err)
                })
            );

            // 🔹 Réagir si layout change (dark mode, refresh, etc.)
            this.subscription.add(
                this.layoutService.configUpdate$.subscribe(() => {
                    this.refreshChartOptions();
                })
            );

        } catch (err) {
            console.error('Impossible de récupérer le profil Keycloak', err);
        }
    }

    // Calcul Paid vs Unpaid
    private updateChart(invoices: Invoice[]) {
        const paidCount = invoices.filter(inv => inv.status === 'PAID').length;
        const unpaidCount = invoices.filter(inv => inv.status !== 'PAID').length;

        this.chartData = {
            labels: ['Paid', 'Unpaid'],
            datasets: [
                {
                    data: [paidCount, unpaidCount],
                    backgroundColor: ['#40E0D0', '#844cd8'],       // turquoise clair et bleu mouvant
                    hoverBackgroundColor: ['#48D1CC', 'rgba(127,69,221,0.8)'],

                    borderWidth: 2
                }
            ]
        };

        this.refreshChartOptions();
    }

    private refreshChartOptions() {
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {

                    }
                }
            }
        };
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
