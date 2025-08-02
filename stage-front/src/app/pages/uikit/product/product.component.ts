import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Table, TableModule} from 'primeng/table';
import {InputNumber} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {RadioButton} from "primeng/radiobutton";
import {Dialog} from "primeng/dialog";
import {InputText} from "primeng/inputtext";
import {CommonModule, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {Textarea} from "primeng/textarea";
import {ConfirmDialog} from "primeng/confirmdialog";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";

import {Tag} from "primeng/tag";
import {Toolbar} from "primeng/toolbar";
import {Product, ProducttService} from "./productt.service";
import {FileUpload} from "primeng/fileupload";
import { WarehouseService} from "../warehouse/warehouse.service";
import {InventoryService} from "./inventory.service";
import {Inventory, InventoryWithWarehouseDTO} from "./inventory.model";
import {Country} from "../../service/customer.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrl: './product.component.css',
    standalone: true,
    imports: [
        InputNumber,
        FormsModule,
        Button,
        DropdownModule,
        Dialog,
        InputText,
        NgIf,
        Textarea,
        ConfirmDialog,
        CurrencyPipe,
        IconField,
        InputIcon,
        TableModule,
        Tag,
        Toolbar,
        FileUpload,
        CommonModule

        /* tes modules ici */],
    providers: [MessageService, ProducttService, ConfirmationService,InventoryService,WarehouseService]
})
export class ProductComponent implements OnInit {
    categories = [
        { label: 'Book', value: 'BOOK' },
        { label: 'Magazine', value: 'MAGAZINE' },
        { label: 'Journal', value: 'JOURNAL' },
        { label: 'Comic', value: 'COMIC' },
        { label: 'Ebook', value: 'EBOOK' },
        { label: 'Catalog', value: 'CATALOG' },
        { label: 'Brochure', value: 'BROCHURE' },
        { label: 'Manual', value: 'MANUAL' },
        { label: 'Textbook', value: 'TEXTBOOK' },
        { label: 'Newspaper', value: 'NEWSPAPER' },
        { label: 'Report', value: 'REPORT' },
        { label: 'Flyer', value: 'FLYER' },
        { label: 'Poster', value: 'POSTER' },
        { label: 'Dictionary', value: 'DICTIONARY' },
        { label: 'Encyclopedia', value: 'ENCYCLOPEDIA' }
    ];
    countries :Country[] = [
        { name: 'United States', code: 'us' },
        { name: 'France', code: 'fr' },
        { name: 'Germany', code: 'de' },
        { name: 'Tunisia', code: 'tn' }
    ];

    inventoryStatuses = [
        { label: 'In Stock', value: 'INSTOCK' },
        { label: 'Low Stock', value: 'LOWSTOCK' },
        { label: 'Out of Stock', value: 'OUTOFSTOCK' }
    ];
    imageError: boolean = false;
    previewImage: string | ArrayBuffer | null | undefined = null;
    productDialog = false;
    products = signal<Product[]>([]);
    selectedImageFile?: File;
    product!: Product;
    selectedProducts: Product[] = [];
    submitted = false;
    statuses!: any[];
    imageUrl: string | null = null;
    selectedProductInventories: InventoryWithWarehouseDTO[] = [];
    warehouses: { id: string, name: string }[] = [];
    addInventoryDialogVisible = false;
    viewInventoriesDialogVisible = false;

    selectedProduct: Product | null = null;

    newInventory: { reservedQuantity: number; availableQuantity: number; warehouseId: string } = {
        reservedQuantity: 0,
        availableQuantity: 0,
        warehouseId: ''// si nécessaire
    };
    @ViewChild('dt') dt!: Table;

    constructor(
        private productService: ProducttService,
        private warehouseService: WarehouseService,
        private inventoryService: InventoryService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.loadDemoData();
        this.loadWarehouses();
    }

    loadWarehouses() {
        this.warehouseService.getAll().subscribe({
            next: (data) => this.warehouses = data,
            error: (err) => console.error('Erreur lors du chargement des entrepôts :', err)
        });
    }

    loadDemoData() {
        this.productService.getProducts().subscribe({
            next: (data) => {
                this.products.set(data);
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les produits',
                });
            }
        });

        this.statuses = [
            { label: 'INSTOCK', value: 'INSTOCK' },
            { label: 'LOWSTOCK', value: 'LOWSTOCK' },
            { label: 'OUTOFSTOCK', value: 'OUTOFSTOCK' }
        ];
    }

    openNew() {
        this.product = {
            name: '',
            reference: '',
            description: '',
            quantity: 0,
            price: 0,
            category: undefined,
            inventoryStatus: undefined,
            inventoryIds: []
        };
        this.submitted = false;
        this.productDialog = true;
    }

    saveProductt() {
        this.submitted = true;

        // Vérifie que le nom du produit n'est pas vide
        if (this.product.name?.trim()) {

            // Vérifie si c'est un nouveau produit
            if (!this.product.id) {

                // Vérifie que le fichier image est bien sélectionné
                if (!this.selectedImageFile) {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Image requise',
                        detail: 'Veuillez sélectionner une image avant d\'enregistrer le produit.'
                    });
                    return;
                }

                // Envoi au backend avec image
                this.productService.addProduct(this.product, this.selectedImageFile).subscribe({
                    next: (savedProduct) => {
                        // Met à jour la liste des produits dans le signal
                        this.products.set([...this.products(), savedProduct]);

                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Produit créé avec succès'
                        });

                        // Réinitialise le formulaire et les champs liés
                        this.productDialog = false;
                        this.product = {} as Product;
                        this.selectedImageFile = undefined;
                        this.previewImage = null;
                        this.imageError = false;
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Échec de la création du produit'
                        });
                        console.error('Erreur lors de la création du produit :', err);
                    }
                });

            } else {
                // 💡 Code pour mise à jour future du produit (update)
            }
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Champ requis',
                detail: 'Le nom du produit est obligatoire.'
            });
        }
    }



    findIndexById(id: string): number {
        return this.products().findIndex(p => p.id === id);
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: `Voulez-vous supprimer ${product.name} ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (product.id) {
                    this.productService.deleteProduct(product.id).subscribe({
                        next: () => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: `${product.name} supprimé avec succès`
                            });
                            // recharge la liste ou supprime localement
                            this.loadDemoData(); // à adapter selon votre logique
                        },
                        error: err => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erreur',
                                detail: `Échec de la suppression de ${product.name}`
                            });
                            console.error(err);
                        }
                    });
                }
            }
        });
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les produits sélectionnés ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const deleteObservables = this.selectedProducts
                    ?.filter((p: Product) => p.id)
                    .map((p: Product) => this.productService.deleteProduct(p.id!));

                Promise.all(deleteObservables.map(obs => obs.toPromise()))
                    .then(() => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Suppression réussie',
                            detail: 'Produits supprimés avec succès',
                        });

                        // Accéder à la valeur réelle du signal avec ()
                        const updatedProducts = this.products().filter((p: Product) =>
                            !this.selectedProducts?.some((sp: Product) => sp.id === p.id)
                        );

                        // Mettre à jour le signal avec .set()
                        this.products.set(updatedProducts);

                        this.selectedProducts = [];
                    })
                    .catch(err => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Erreur lors de la suppression de certains produits',
                        });
                        console.error(err);
                    });
            }
        });
    }


    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK': return 'success';
            case 'LOWSTOCK': return 'warn';
            case 'OUTOFSTOCK': return 'danger';
            default: return 'info';
        }
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }


    onUpload(event: any) {
        const file = event.files?.[0]; // ✅ Récupère l’image

        if (file) {
            if (file.size > 1000000) {
                this.imageError = true;
                this.previewImage = null;
                this.selectedImageFile = undefined;
                return;
            }

            this.imageError = false;
            this.selectedImageFile = file;
            this.imageUrl = URL.createObjectURL(file); // aperçu visuel

            const reader = new FileReader();
            reader.onload = (e) => (this.previewImage = e.target?.result);
            reader.readAsDataURL(file);
        }

        // Nettoie la file d'attente d'upload PrimeNG
        event.options?.clear?.();
    }
    openAddInventoryDialog(product: any) {
        this.selectedProduct = product;
        this.newInventory = {
            reservedQuantity: 0,
            availableQuantity: 0,
            warehouseId: ''
        };
        this.addInventoryDialogVisible = true;
    }


    saveNewInventory() {
        if (!this.selectedProduct || !this.selectedProduct.id) {
            console.error("Produit non sélectionné ou ID manquant.");
            return;
        }

        if (!this.newInventory.warehouseId) {
            console.error("Entrepôt non sélectionné.");
            return;
        }

        this.inventoryService.createAndAssignInventoryToProduct(
            this.newInventory,
            this.selectedProduct.id!,
            this.newInventory.warehouseId  // ← c’est bien un string
        ).subscribe({
            next: res => {
                this.addInventoryDialogVisible = false;
                this.loadDemoData();
            },
            error: err => console.error(err)
        });
    }

    openViewInventoriesDialog(product: Product): void {
        if (!product?.id) {
            console.error('Produit sans ID');
            return;
        }

        this.inventoryService.getInventoriesByProductId(product.id).subscribe({
            next: (inventories) => {
                this.selectedProductInventories = inventories;
                this.viewInventoriesDialogVisible = true;
            },
            error: (err) => {
                console.error('Erreur chargement inventaires :', err);
                this.selectedProductInventories = [];
                this.viewInventoriesDialogVisible = true; // Affiche modal vide quand même
            }
        });
    }
    calculateTotalAvailable(warehouseName: string | undefined): number {
        if (!warehouseName) return 0;
        return this.selectedProductInventories
            .filter(inv => inv.warehouse?.name === warehouseName)
            .reduce((sum, inv) => sum + (inv.inventory.availableQuantity ?? 0), 0);
    }

    calculateTotalReserved(warehouseName: string | undefined): number {
        if (!warehouseName) return 0;
        return this.selectedProductInventories
            .filter(inv => inv.warehouse?.name === warehouseName)
            .reduce((sum, inv) => sum + (inv.inventory.reservedQuantity ?? 0), 0);
    }


    getCountryCode(countryName: string): string | undefined {
        const country = this.countries.find(c => c.name && c.name.toLowerCase() === countryName.toLowerCase());
        return country ? country.code : undefined;
    }

}
