import { Routes } from '@angular/router';
import { OrderFormComponent } from './pages/orderspage/orders/order-form/order-form.component'
import {OrderListComponent} from "./pages/orderspage/orders/order-list/order-list.component";


export const frontRoutes: Routes = [

    { path: 'order-form', component: OrderFormComponent },
    { path: 'orders', component: OrderListComponent },
    { path: '', redirectTo: 'order-form', pathMatch: 'full' }
];
