import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { LayoutService } from '../../../../layout/service/layout.service';
import { BillingserviceService } from '../../billing/billingservice.service';
import { Invoice } from '../../billing/invoice.model';
import { KeycloakService } from 'keycloak-angular';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'app-invoicepermonth',
    standalone: true,
    imports: [ChartModule],
    template: `
        <div class="card !mb-8">
            <div class="font-semibold text-xl mb-4">Invoice per month</div>
            <p-chart type="bar" [data]="chartData" [options]="chartOptions" class="h-80" />
        </div>
    `,
    styleUrls: ['./invoicepermonth.component.scss']
})
export class InvoicepermonthComponent implements OnInit, OnDestroy {
    chartData: any = { labels: [], datasets: [] };
    chartOptions: any = {};
    subscription!: Subscription;

    constructor(
        private invoiceService: BillingserviceService,
        private keycloakService: KeycloakService,
        public layoutService: LayoutService
    ) {}

    async ngOnInit() {
        try {
            const profile = await this.keycloakService.loadUserProfile();
            const clientId = profile.id;

            // 🔹 premier chargement direct
            this.invoiceService.getInvoices(clientId).subscribe({
                next: invoices => this.prepareChartData(invoices),
                error: err => console.error('Erreur initiale factures', err)
            });

            // 🔹 écoute des updates layout
            this.subscription = this.layoutService.configUpdate$
                .pipe(
                    debounceTime(25),
                    switchMap(() => this.invoiceService.getInvoices(clientId))
                )
                .subscribe({
                    next: invoices => this.prepareChartData(invoices),
                    error: err => console.error('Erreur lors du rechargement factures', err)
                });

        } catch (err) {
            console.error('Impossible de récupérer le profil Keycloak', err);
        }
    }

    prepareChartData(invoices: Invoice[]) {
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const paidAmounts = new Array(12).fill(0);
        const unpaidAmounts = new Array(12).fill(0);

        invoices.forEach(inv => {
            if (!inv.issueDate) return;
            const month = new Date(inv.issueDate).getMonth();
            const amount = Number(inv.totalAmount) || 0;

            if (inv.paid) {
                paidAmounts[month] += amount;
            } else {
                unpaidAmounts[month] += amount;
            }
        });

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const borderColor = documentStyle.getPropertyValue('--surface-border');
        const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

        this.chartData = {
            labels: months,
            datasets: [
                {
                    type: 'bar',
                    label: 'Paid',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                    data: paidAmounts,
                    barThickness: 32,
                    borderRadius: {
                        topLeft: 8,
                        topRight: 8,
                        bottomLeft: 0,
                        bottomRight: 0
                    },
                    borderSkipped: false
                },
                {
                    type: 'bar',
                    label: 'Unpaid',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                    data: unpaidAmounts,
                    barThickness: 32,
                    borderRadius: {
                        topLeft: 8,
                        topRight: 8,
                        bottomLeft: 0,
                        bottomRight: 0
                    },
                    borderSkipped: false
                }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: { color: textColor }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: textMutedColor },
                    grid: { color: 'transparent', borderColor: 'transparent' }
                },
                y: {
                    stacked: true,
                    ticks: { color: textMutedColor },
                    grid: {
                        color: borderColor,
                        borderColor: 'transparent',
                        drawTicks: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
