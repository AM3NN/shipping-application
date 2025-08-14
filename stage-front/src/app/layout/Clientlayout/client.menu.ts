// client.menu.ts
import {Component, inject, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AppMenuitem} from "../component/app.menuitem";
import {MenuItem} from "primeng/api";
import {LayoutService} from "../service/layout.service";

@Component({
    selector: 'app-client-menu',
    imports: [CommonModule, RouterModule, AppMenuitem],
    template:`<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppClientMenu {


    model: MenuItem[] = [];

    ngOnInit(): void {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/client/dashboard'] },
                ],
            },
            {
                label: 'Account',
                items: [
                    { label: 'Profile', icon: 'pi pi-user', routerLink: ['/client/profile'] },
                    { label: 'Settings', icon: 'pi pi-cog', routerLink: ['/client/settings'] },
                ],
            },
        ];
    }
}
