import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user/profile/user.service';
import { catchError, forkJoin, map, of } from 'rxjs';
import {OrderService} from "../../client/my-products/order.service";
import {BillingserviceService} from "../../client/billing/billingservice.service";

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Orders</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ totalOrders }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Revenue</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">\${{ totalRevenue }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-dollar text-orange-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Customers</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ totalUsers }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-cyan-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Active Accounts</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ activeSessions }} </div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-comment text-purple-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">{{ responded }}</span>
                <span class="text-muted-color">responded</span>
            </div>
        </div>
    `
})
export class StatsWidget {
    totalOrders = 0;
    totalRevenue = 0;
    totalUsers = 0;
    activeSessions = 0;
    responded = 0;

    constructor(private userService: UserService,private orderService: OrderService,  private billingService: BillingserviceService) {}
    ngOnInit() {
        forkJoin({
            users: this.userService.getAllUsers().pipe(
                map(users => users.length),
                catchError(() => of(0))
            ),
            sessions: this.userService.getActiveUsers().pipe(
                map((data: any) => data.totalActiveSessions || 0), // <-- utiliser totalActiveSessions
                catchError(() => of(0))
            ),
            orders:this.orderService.getAllOrders().pipe(
                map(orders => orders.length),
                catchError(() => of(0))
            ),
            revenue: this.billingService.getTotalRevenue().pipe(
                catchError(() => of(0))
            )


        }).subscribe(result => {
            this.totalUsers = result.users;
            this.activeSessions = result.sessions;
            this.totalOrders = result.orders;
            this.totalRevenue = result.revenue;
        });
    }

}
