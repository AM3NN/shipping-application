// client/client.routes.ts
import { Routes } from '@angular/router';
import {ClientLayout} from "../../layout/Clientlayout/client.layout";
import {ClientDashboardComponent} from "./client-dashboard/client-dashboard.component";
import {ProductsComponent} from "./products/products.component";
import {MyProductsComponent} from "./my-products/my-products.component";

import {BillingComponent} from "./billing/billing.component";
import {OrderesclientComponent} from "./ordersclient/orderesclient.component";
import {TestComponent} from "../uikit/test/test.component";


export const clientRoutes: Routes = [
    {
        path: '',
        component: ClientLayout,
        children: [
            { path: 'dashboard', component: ClientDashboardComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'my-products', component: MyProductsComponent },
            { path: 'orders', component: OrderesclientComponent },
            { path: 'billing', component: BillingComponent },
            { path: 'test', component: TestComponent },
        ]
    }

];
