// client/client.routes.ts
import { Routes } from '@angular/router';
import {ClientLayout} from "../../layout/Clientlayout/client.layout";
import {ClientDashboardComponent} from "./client-dashboard/client-dashboard.component";


export const clientRoutes: Routes = [
    {
        path: '',
        component: ClientLayout,
        children: [
            { path: 'dashboard', component: ClientDashboardComponent }
        ]
    }
];
