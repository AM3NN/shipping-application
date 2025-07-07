import { Routes } from '@angular/router';
import { OrderListComponent } from './frontoffice/pages/orders/order-list/order-list';
import { OrderFormComponent } from './frontoffice/pages/orders/order-form/order-form';

export const routes: Routes = [
  { path: 'orders', component: OrderListComponent },
  { path: 'order-form', component: OrderFormComponent },  // <-- Add this route
// <-- Add this

];
