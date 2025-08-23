import {Component, Input, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CurrencyPipe, NgStyle} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {Menu} from "primeng/menu";


@Component({
    selector: 'app-orderevolution',
    imports: [
        ButtonDirective,
        TableModule,
        Menu,
        NgStyle
    ],
  templateUrl: './orderevolution.component.html',
  styleUrl: './orderevolution.component.scss'
})
export class OrderevolutionComponent implements OnInit {

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        // this.orderService.getMixedProducts(this.clientId).subscribe({
        //     next: (data) => {
        //         console.log('Produits récupérés:', data);
        //
        //         // Calcul du total pour la conversion en %
        //         const totalQuantity = data.reduce((acc, p) => acc + p.quantity, 0);
        //
        //         this.products = data.map(p => ({
        //             ...p,
        //             percentage: totalQuantity > 0 ? Math.round((p.quantity / totalQuantity) * 100) : 0
        //         }));
        //     },
        //     error: (err) => {
        //         console.error('Erreur chargement produits:', err);
        //     }
        // });
    }
}
