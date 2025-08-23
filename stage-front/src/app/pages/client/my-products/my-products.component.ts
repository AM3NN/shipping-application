import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {CurrencyPipe, NgIf} from "@angular/common";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {Tag} from "primeng/tag";
import {Toolbar} from "primeng/toolbar";
import {OrderDetail} from "./order.model";
import {OrderService} from "./order.service";
import {KeycloakService} from "keycloak-angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-my-products',
    imports: [
        Button,
        IconField,
        InputIcon,
        InputText,
        PrimeTemplate,
        TableModule,
        Toolbar,
        RouterLink
    ],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.scss'
})
export class MyProductsComponent {

    customProducts: OrderDetail[] = [];

    constructor(private orderService: OrderService, private keycloak: KeycloakService) {}

    async ngOnInit() {
        const profile = await this.keycloak.loadUserProfile();
        if (profile && profile.id) {
            this.orderService.getMyCustomProducts(profile.id).subscribe({
                next: (data) => this.customProducts = data,
                error: (err) => console.error(err)
            });
        }
    }

    exportCSV() {

    }

    onGlobalFilter(dt: Table<OrderDetail>, $event: Event) {

    }

    allproducts() {

    }

    addCustomProduct() {

    }
}
