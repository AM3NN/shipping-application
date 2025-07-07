import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { Order } from '../models/order';
import { OrderService } from '../services/order';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, TableModule, BadgeModule],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css'],
  encapsulation: ViewEncapsulation.None // ✅ Required for global styles to apply to PrimeNG components
})

export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  error: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        this.error = '❌ Failed to load orders. Please try again later.';
        this.loading = false;
      }
    });
  }
  getOrderStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'APPROVED':
        return 'approved p-chip';
      case 'PENDING':
        return 'pending p-chip';
      case 'REJECTED':
        return 'rejected p-chip';
      default:
        return 'p-chip';
    }
  }




}
