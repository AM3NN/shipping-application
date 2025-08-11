import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Menubar} from "primeng/menubar";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Button} from "primeng/button";
import {CurrencyPipe, DecimalPipe, NgForOf} from "@angular/common";
import {Dialog} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PrimeTemplate} from "primeng/api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {Order} from "./order.model";
import {OrderService} from "./order.service";
import {Product, ProducttService} from "../product/productt.service";
import {Calendar} from "primeng/calendar";
import {MultiSelect} from "primeng/multiselect";


@Component({
  selector: 'app-orderesclient',
    imports: [
        Menubar,
        IconField,
        InputIcon,
        InputText,
        Button,
        DropdownModule,
        ReactiveFormsModule,
        TableModule,
        FormsModule,
        Dialog,
        Calendar,
        MultiSelect,
        NgForOf,
        CurrencyPipe
    ],
  templateUrl: './orderesclient.component.html',
  styleUrl: './orderesclient.component.scss',
    providers: [OrderService,ProducttService],
    encapsulation: ViewEncapsulation.None
})
export class OrderesclientComponent implements OnInit {
    orders: Order[] = [];
    order: Order = {} as Order;
    orderDialog: boolean = false;
    isEdit: boolean = false;
    selectedOrder: Order | null = null;
    productOptions: Product[] = [];
    selectedProducts: string[] = []; // IDs des produits sélectionnés
    constructor(private orderService: OrderService,private productService: ProducttService) {}
    typeOptions = [
        { label: 'Purchase', value: 'purchase' },
        { label: 'Sale', value: 'sale' },
        { label: 'Return', value: 'return' }
    ];

    directionOptions = [
        { label: 'Inbound', value: 'inbound' },
        { label: 'Outbound', value: 'outbound' }
    ];


    methodOptions = [
        { label: 'FDEX', value: 'FDEX' },
        { label: 'DHL', value: 'DHL' }
    ];
    nestedMenuItems = [
        {
            label: 'My Orders',
            icon: 'pi pi-fw pi-table',
            routerLink: ['/uikit/Myorders']
        },
        {
            label: 'Track Order',
            icon: 'pi pi-fw pi-compass',
            routerLink: ['/uikit/trackorder']
        },
        {
            label: 'Support',
            icon: 'pi pi-fw pi-question-circle',
            routerLink: ['/uikit/support']
        }
    ];

    ngOnInit() {
        this.getOrders();
        this.loadProducts();
    }

    getOrders() {
        this.orderService.getMyOrders().subscribe(data => {
            this.orders = data;
        });
    }
    loadProducts(): void {
        this.productService.getProducts().subscribe({
            next: (products) => {
                console.log('Produits :', products);
                this.productOptions = products; // 🔹 remplir la liste pour le multiSelect
            },
            error: (err) => {
                console.error('Erreur lors du chargement des produits :', err);
            }
        });
    }



    openNew() {
        this.order = {
            shippingMethod: '',
            shippingLocation: '',
            deliveryLocation: '',
            createdDate: new Date(),
            expectedDate: new Date(),
            closedDate: null,
            reference: '',
            type: '',
            direction: '',
            shippingCost: 0,
            shippingCurrency: 'USD',
            discount: 0,
            discountCurrency: 'USD',
            netAmount: 0,
            netCurrency: 'USD',
            tax: 0,
            taxCurrency: 'USD',
            totalAmount: 0,
            totalCurrency: 'USD',
            clientId: '',
            products: []
        };
        this.isEdit = false;
        this.orderDialog = true;
    }



    hideDialog() {
        this.orderDialog = false;
    }

    saveOrder() {
        // Calculer les totaux avant envoi
        this.calculateTotals();

        if (this.isEdit) {
            // Ici il faudrait appeler updateOrder si tu as une méthode pour ça
            this.orderService.updateOrder(this.order).subscribe({
                next: (order) => {
                    console.log('Commande mise à jour avec succès', order);
                    this.getOrders();
                    this.orderDialog = false;
                },
                error: (err) => {
                    console.error('Erreur lors de la mise à jour de la commande', err);
                }
            });
        } else {
            this.orderService.creategenOrder(this.order).subscribe({
                next: (order) => {
                    console.log('Commande créée avec succès', order);
                    this.getOrders();
                    this.orderDialog = false;
                },
                error: (err) => {
                    console.error('Erreur lors de la création de la commande', err);
                }
            });
        }
    }


    editOrder(order: Order) {
        this.order = { ...order };
        this.isEdit = true;
        this.orderDialog = true;
    }

    deleteOrder(order: Order) {
        if (confirm(`Are you sure you want to delete order ${order.reference}?`)) {
            this.orderService.deleteOrder(order.id).subscribe(() => {
                this.getOrders();
            });
        }
    }

    deleteSelectedOrders() {
        if (this.selectedOrder) {
            this.deleteOrder(this.selectedOrder);
        }
    }

    exportCSV() {
        console.log("Export CSV clicked");
        // logiquement, tu pourrais appeler un service pour exporter
    }

    getProductName(productId: string): string {
        const prod = this.productOptions.find(p => p.id === productId);
        return prod ? prod.name : '';
    }
    onProductsChange() {
        this.order.products = this.selectedProducts.map(prodId => {
            // Chercher si le produit existe déjà dans order.products
            const existing = this.order.products.find(p => p.product.id === prodId);
            if (existing) {
                return existing;
            } else {
                // Récupérer le produit complet dans productOptions
                const product = this.productOptions.find(p => p.id === prodId);
                return {
                    product: product!,
                    quantity: 1
                };
            }
        });

        this.calculateTotals();
    }

    calculateNetAmount(): number {
        const productsTotal = this.order.products.reduce((sum, p) => sum + p.quantity * p.product.price, 0);
        const discount = this.order.discount || 0;
        return productsTotal - discount;
    }
    calculateTax(netAmount: number): number {
        const taxRate = 0.2; // adapte selon ta logique
        return netAmount * taxRate;
    }
    calculateTotalAmount(netAmount: number, tax: number): number {
        const shippingCost = this.order.shippingCost || 0;
        return netAmount + tax + shippingCost;
    }
    calculateTotals() {
        const productsTotal = this.order.products.reduce(
            (sum, p) => sum + p.quantity * p.product.price,
            0
        );
        const discount = this.order.discount || 0;
        this.order.netAmount = productsTotal - discount;

        const taxRate = 0.2; // adapte selon ton besoin
        this.order.tax = this.order.netAmount * taxRate;

        const shippingCost = this.order.shippingCost || 0;
        this.order.totalAmount = this.order.netAmount + this.order.tax + shippingCost;
    }



}
