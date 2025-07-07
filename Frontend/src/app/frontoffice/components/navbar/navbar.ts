import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true, // ✅ Important for standalone component
  imports: [CommonModule, RouterModule, MenubarModule], // ✅ You had this empty
  templateUrl: './navbar.html', // ✅ OK
  styleUrls: ['./navbar.css']   // ❌ was 'styleUrl' → corrected to 'styleUrls'
})
export class NavbarComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: '🏠 Home', routerLink: '/' },
      { label: '➕ New Order', routerLink: '/order-form', styleClass: 'new-order-btn' }, // Add this button
      { label: '📦 Orders', routerLink: '/orders' },
      { label: '📊 Dashboard', routerLink: '/dashboard' },
      { label: '⚙️ Settings', routerLink: '/settings' }
    ];
  }
}
