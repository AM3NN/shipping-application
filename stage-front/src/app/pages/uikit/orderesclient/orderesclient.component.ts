import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Menubar} from "primeng/menubar";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Button} from "primeng/button";
import {CurrencyPipe, DecimalPipe, NgForOf} from "@angular/common";
import {Dialog} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {Order, OrderDetail, OrderWithDetailsRequest} from "./order.model";
import {OrderService} from "./order.service";
import {Product, ProducttService} from "../product/productt.service";
import {Calendar} from "primeng/calendar";
import {MultiSelect} from "primeng/multiselect";
import {InputNumber} from "primeng/inputnumber";


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
        CurrencyPipe,
        InputNumber,

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
    protected customproducts: OrderDetail[]=[];
    constructor(private orderService: OrderService,private productService: ProducttService) {}
    typeOptions = [
        { label: 'Purchase', value: 'purchase' },
        { label: 'Sale', value: 'sale' },
        { label: 'Return', value: 'return' }
    ];
    binaryOptions = [
        { label: 'false', value: false },
        { label: 'true', value: true }
    ];

    bindingTypeOptions = [
        { label: 'CARD', value: 'CARD' },
        { label: 'CARD-TAB', value: 'CARD-TAB' },
        { label: 'CASEBIND', value: 'CASEBIND' },
        { label: 'CASEBIND-ES', value: 'CASEBIND-ES' },
        { label: 'CASEBIND-ES-INS', value: 'CASEBIND-ES-INS' },
        { label: 'COILHARD', value: 'COILHARD' },
        { label: 'COILHARD-TAB', value: 'COILHARD-TAB' },
        { label: 'COILSOFT', value: 'COILSOFT' },
        { label: 'COILSOFT-INS', value: 'COILSOFT-INS' },
        { label: 'DIVIDER-SHEET', value: 'DIVIDER-SHEET' },
        { label: 'LOOSELEAF', value: 'LOOSELEAF' },
        { label: 'LOOSELEAF-NC', value: 'LOOSELEAF-NC' },
        { label: 'PERFECT', value: 'PERFECT' },
        { label: 'PERFECT-NC', value: 'PERFECT-NC' },
        { label: 'SS', value: 'SS' },
        { label: 'SS-NC', value: 'SS-NC' }
    ];

    partStatusOptions = [
        { label: 'ACCEPTED', value: 'ACCEPTED' },
        { label: 'CANCELED', value: 'CANCELED' },
        { label: 'CLOSED', value: 'CLOSED' },
        { label: 'COMPLETE', value: 'COMPLETE' },
        { label: 'NEW', value: 'NEW' },
        { label: 'ONPROD', value: 'ONPROD' },
        { label: 'READY', value: 'READY' }
    ];

    coverFinishTypeOptions = [
        { label: 'LAYFLAT-GLOSS', value: 'LAYFLAT-GLOSS' },
        { label: 'LAYFLAT-MATTE', value: 'LAYFLAT-MATTE' }
    ];

    priorityLevelOptions = [
        { label: 'HIGH', value: 'HIGH' },
        { label: 'HIGH2', value: 'HIGH2' },
        { label: 'HIGH3', value: 'HIGH3' },
        { label: 'NORMAL', value: 'NORMAL' }
    ];

    textColorOptions = [
        { label: '1/0', value: '1/0' },
        { label: '1/1', value: '1/1' },
        { label: '1/c', value: '1/c' },
        { label: '4/4', value: '4/4' },
        { label: '4/c', value: '4/c' }
    ];

    sirenOptions = [
        { label: 'CAI', value: 'CAI' },
        { label: 'CLC', value: 'CLC' },
        { label: 'CLM', value: 'CLM' },
        { label: 'Epac', value: 'Epac' },
        { label: 'NGL', value: 'NGL' },
        { label: 'SAV', value: 'SAV' },
        { label: 'TLG', value: 'TLG' }
    ];

    textPaperTypeOptions = [
        { label: '10pt_C2S', value: '10pt_C2S' },
        { label: '12pt_C2S', value: '12pt_C2S' },
        { label: '80_GlossCover', value: '80_GlossCover' },
        { label: '80_GlossText', value: '80_GlossText' },
        { label: 'Birch_W40_TB', value: 'Birch_W40_TB' },
        { label: 'FSC_MC_CVG_SilkHO_1.061', value: 'FSC_MC_CVG_SilkHO_1.061' },
        { label: 'FSC_MC_CVG_SilkHO_1.0_70', value: 'FSC_MC_CVG_SilkHO_1.0_70' },
        { label: 'FSC_MC_DOM_VJT_1.21_75', value: 'FSC_MC_DOM_VJT_1.21_75' },
        { label: 'Letsgo matte 115GSM', value: 'Letsgo matte 115GSM' },
        { label: 'Letsgo matte 90GSM', value: 'Letsgo matte 90GSM' },
        { label: 'PAP1SW_70', value: 'PAP1SW_70' },
        { label: 'PAP1_75', value: 'PAP1_75' },
        { label: 'SFI_CVG_UCR_1.8_66', value: 'SFI_CVG_UCR_1.8_66' }
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
            products: [],
            customproductsids :[],
        };
        this.isEdit = false;
        this.orderDialog = true;
    }

    addCustomProduct() {
        this.customproducts.push({
            bindingType: '',
            partStatus: '',
            securityLabel: false,
            shrinkwrap: false,
            threeHoleDrill: false,
            perf: false,
            productionPage: 0,
            thickness: 0,
            height: 0,
            width: 0,
            weight: 0,
            textPaperType: '',
            coverFinishType: '',
            textColor: '',
            siren: '',
            quantity: 1
        });
    }

    removeCustomProduct(index: number) {
        this.customproducts.splice(index, 1);
    }




    hideDialog() {
        this.orderDialog = false;
    }

    saveOrder() {
        this.calculateTotals();

        if (this.isEdit) {
            this.orderService.updateOrder(this.order).subscribe({
                next: (order) => {
                    console.log('Commande mise à jour avec succès', order);
                    this.getOrders();
                    this.orderDialog = false;
                },
                error: (err) => console.error('Erreur lors de la mise à jour de la commande', err)
            });
        } else {
            const payload: OrderWithDetailsRequest = {
                order: this.order,
                customproducts: this.customproducts
            };

            this.orderService.createOrder(payload).subscribe({
                next: (order) => {
                    console.log('Commande créée avec succès', order);
                    this.getOrders();
                    this.orderDialog = false;
                    this.order = {} as Order;
                    this.customproducts = [];
                    this.selectedProducts = [];
                },
                error: (err) => console.error('Erreur lors de la création de la commande', err)
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


    saveCustomOrder() {

    }
}
