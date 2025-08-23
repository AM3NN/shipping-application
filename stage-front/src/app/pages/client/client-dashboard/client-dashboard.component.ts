import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ClientstatwidgetComponent} from "./clientstatwidget/clientstatwidget.component";
import {OrderevolutionComponent} from "./orderevolution/orderevolution.component";
import {InvoicepermonthComponent} from "./invoicepermonth/invoicepermonth.component";
import {PaidunpaidinvoiceComponent} from "./paidunpaidinvoice/paidunpaidinvoice.component";

@Component({
  selector: 'app-client-dashboard',
    standalone: true,
    imports: [CommonModule, ClientstatwidgetComponent, OrderevolutionComponent, InvoicepermonthComponent, PaidunpaidinvoiceComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent {

}
