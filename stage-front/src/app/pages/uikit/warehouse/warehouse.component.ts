
import { WarehouseService } from './warehouse.service';
import { Component, OnInit} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {InputNumber} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {Dialog} from "primeng/dialog";
import {InputText} from "primeng/inputtext";
import { NgIf} from "@angular/common";
import {ConfirmDialog} from "primeng/confirmdialog";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {Toolbar} from "primeng/toolbar";
import {ProducttService} from "../product/productt.service";
import {Listbox} from "primeng/listbox";
import {InventoryService} from "../product/inventory.service";

export interface Warehouse {
    id: string;
    name: string;
    location: string;
    country: string;
    capacity: number;
    inventories: Inventory[]; // ✅ Type correct
}
// inventory.model.ts
export interface Inventory {
    id: string;
    reservedQuantity: number;
    availableQuantity: number;
    warehouseId: string;
    productId: string;
}
interface Country {
    code: string;
    name: string;
}

@Component({
    selector: 'app-warehouse',
    templateUrl: './warehouse.component.html',
    styleUrls: ['./warehouse.component.scss'],
    imports: [
        InputNumber,
        FormsModule,
        Button,
        DropdownModule,
        Dialog,
        InputText,
        NgIf,
        ConfirmDialog,
        IconField,
        InputIcon,
        TableModule,
        Toolbar,
        Listbox,
    ],
    providers: [MessageService, ProducttService, ConfirmationService,InventoryService]
})
export class WarehouseComponent implements OnInit {
    warehouses: Warehouse[] = [];
    warehouseDialog = false;
    warehouse: Warehouse = this.createEmptyWarehouse();
    selectedWarehouses: Warehouse[] = [];
    selectedWarehouse: any;
    submitted = false;
    loading = false;
    unassignedInventories: any[] = [];
    selectedInventories: any[] = [];
    inventoryDialogVisible: boolean = false;
    countries :Country[] = [
        { name: 'United States', code: 'us' },
        { name: 'France', code: 'fr' },
        { name: 'Germany', code: 'de' },
        { name: 'Tunisia', code: 'tn' }
    ];

    constructor(
        private warehouseService: WarehouseService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private inventoryService: InventoryService,
    ) {}

    ngOnInit() {
        this.loadWarehouses();
    }

    loadWarehouses() {
        this.loading = true;
        this.warehouseService.getAll().subscribe({
            next: data => {
                this.warehouses = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les entrepôts'
                });
            }
        });
    }

    createEmptyWarehouse(): Warehouse {
        return {
            id:'',
            name: '',
            location: '',
            country: '',
            capacity: 0,
            inventories: []
        };
    }

    openNew() {
        this.warehouse = this.createEmptyWarehouse();
        this.submitted = false;
        this.warehouseDialog = true;
    }

    hideDialog() {
        this.warehouseDialog = false;
        this.submitted = false;
    }

    saveWarehouse() {
        this.submitted = true;
        if (!this.warehouse.name || !this.warehouse.location || this.warehouse.capacity == null) return;

        // convert country from object to code string


        if (this.warehouse.id) {
            // Update
            this.warehouseService.update(this.warehouse.id, this.warehouse).subscribe({
                next: updated => {
                    const index = this.warehouses.findIndex(w => w.id === updated.id);
                    if (index >= 0) this.warehouses[index] = updated;
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Entrepôt mis à jour' });
                    this.warehouseDialog = false;
                }
            });
        } else {
            // Create
            this.warehouseService.create(this.warehouse).subscribe({
                next: created => {
                    this.warehouses.push(created);
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Entrepôt créé' });
                    this.warehouseDialog = false;
                }
            });
        }
    }

    editWarehouse(warehouse: Warehouse) {
        this.warehouse = { ...warehouse };
        this.warehouseDialog = true;
    }

    deleteWarehouse(warehouse: Warehouse) {
        this.confirmationService.confirm({
            message: `Supprimer "${warehouse.name}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.warehouseService.delete(warehouse.id!).subscribe({
                    next: () => {
                        this.warehouses = this.warehouses.filter(w => w.id !== warehouse.id);
                        this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Entrepôt supprimé' });
                    }
                });
            }
        });
    }

    deleteSelectedWarehouses() {
        this.confirmationService.confirm({
            message: 'Supprimer les entrepôts sélectionnés ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                const deleteCalls = this.selectedWarehouses.map(w =>
                    this.warehouseService.delete(w.id!).toPromise()
                );
                await Promise.all(deleteCalls);
                this.warehouses = this.warehouses.filter(w => !this.selectedWarehouses.includes(w));
                this.selectedWarehouses = [];
                this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Entrepôts supprimés' });
            }
        });
    }

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: any) {
        table.clear();
    }

    exportCSV() {
        const csv = this.warehouses.map(w =>
            `${w.name},${w.location},${w.country},${w.capacity}`
        ).join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.href = url;
        link.setAttribute('download', 'warehouses.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    getCountryCode(countryName: string): string | undefined {
        const country = this.countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
        return country ? country.code : undefined;
    }

    viewInventories(warehouse: any) {

    }

    addInventories(warehouse: Warehouse) {
        this.selectedWarehouse = warehouse;
        this.loadUnassignedInventories(); // appel service
        this.inventoryDialogVisible = true;
    }
    private loadUnassignedInventories() {
        this.inventoryService.getUnassignedInventories().subscribe({
            next: (inventories) => {
                this.unassignedInventories = inventories;
                this.selectedInventories = [];
            },
            error: (err) => {
                console.error('Erreur lors du chargement des inventaires non assignés', err);
            }
        });
    }

    assignSelectedInventoriesToWarehouse() {
        if (!this.selectedWarehouse || !this.selectedInventories?.length) {
            return;
        }

        const inventoryIds = this.selectedInventories.map(inv => inv.inventory.id);

        this.warehouseService.assignInventoriesToWarehouse(this.selectedWarehouse.id, inventoryIds)
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inventories assigned successfully' });
                    this.inventoryDialogVisible = false;
                    this.selectedInventories = [];
                    this.loadWarehouses(); // Optionnel : recharger la liste après modification
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message || 'Assignment failed' });
                }
            });
    }

}
