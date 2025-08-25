import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import {authGuard, AuthGuard} from './auth.guard';
import {ClientLayout} from "./app/layout/Clientlayout/client.layout";
import {ClientDashboardComponent} from "./app/pages/client/client-dashboard/client-dashboard.component";

export const appRoutes: Routes = [
    { path: '', redirectTo: '/uikit/dash', pathMatch: 'full' },
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            { path: 'Dash', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            {
                path: 'user', // protège la route, accessible uniquement si authentifié
                loadChildren: () => import('./app/pages/user/user.routes') // lazy loading du module User
            },
        ]
    },
    {
        path: 'client',
        canActivate: [authGuard],
        loadChildren: () => import('./app/pages/client/client.routes').then(m => m.clientRoutes)
    },


    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' },


];
