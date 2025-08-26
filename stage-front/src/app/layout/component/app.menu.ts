import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];


    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Products',
                items: [
                    { label: 'All Products', icon: 'pi pi-box', routerLink: ['/uikit/product'] },
                    { label: 'Warehouses', icon: 'pi pi-building', routerLink: ['/uikit/warehouse'] },
                    { label: 'Scrapped Products', icon: 'pi pi-ban', routerLink: ['/uikit/csv'] },
                ]
            },
            {
                label: 'Orders',
                items: [
                    { label: 'Orders', icon: 'pi pi-shopping-cart', routerLink: ['/uikit/orderss'] }
                ]
            },
            {
                label: 'Billing',
                items: [
                    { label: 'Invoices', icon: 'pi pi-file-invoice', routerLink: ['/uikit/invoices'] },

                ]
            },
            {
                label: 'Users',
                items: [
                    { label: 'Manage Users', icon: 'pi pi-users', routerLink: ['/uikit/manageusers'] }
                ]
            }
        ];

    }
}
