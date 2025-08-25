import { Component, OnInit } from '@angular/core';
import { CsvLine, CsvProduct, CsvService } from "./csv.service";
import { KeyValuePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { TableModule } from "primeng/table";
import { Toast } from "primeng/toast";
import { ProgressSpinner } from "primeng/progressspinner";
import { MessageService } from "primeng/api";
import { ButtonDirective } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { Dialog } from "primeng/dialog";
import { InputText } from "primeng/inputtext";
import {InputSwitch} from "primeng/inputswitch";

@Component({
    selector: 'app-csvvalidator',
    imports: [
        NgForOf,
        KeyValuePipe,
        NgIf,
        NgClass,
        TableModule,
        Toast,
        ProgressSpinner,
        ButtonDirective,
        FormsModule,
        Dialog,
        InputText,
        InputSwitch
    ],
    providers: [MessageService],
    templateUrl: './csvvalidator.component.html',
    styleUrl: './csvvalidator.component.scss'
})
export class CsvvalidatorComponent implements OnInit {
    validProducts: CsvProduct[] = [];
    invalidProducts: CsvLine[] = [];
    displayDialog: boolean = false;
    selectedLine: CsvLine | null = null;
    loading = true;
    errorMsg: string = '';
    booleanFields = ['securityLabel','shrinkwrap','threeHoleDrill','perf'];
    numberFields = ['productionPage','thickness','height','width','weight','quantity'];
    stringFields = ['Reference','bindingType','partStatus','textPaperType','coverFinishType','textColor','siren'];
    constructor(
        private csvService: CsvService,
        private messageService: MessageService   // ✅ injection manquante
    ) {}

    ngOnInit(): void {
        this.loadCsvProducts();
    }

    loadCsvProducts(): void {
        this.loading = true;
        this.csvService.getScrappedProducts().subscribe({
            next: (res: any) => {
                console.log(res); // vérifie la structure dans la console
                this.validProducts = res.validScrappedProducts || [];
                this.invalidProducts = res.invalidScrappedProducts || [];
                this.loading = false;
            },
            error: (err) => {
                this.errorMsg = 'Impossible de charger les produits';
                console.error(err);
                this.loading = false;
            }
        });
    }

    // Vérifie si une cellule est invalide
    isInvalid(productLine: any, field: unknown): boolean {
        const f = String(field);
        return productLine.errors && productLine.errors[f] !== undefined;
    }

    getValue(productLine: any, field: string): any {
        return productLine.product ? productLine.product[field] : productLine[field];
    }

    modifyFields(line: Record<string, any> | undefined)  {
        this.selectedLine = JSON.parse(JSON.stringify(line)); // clone pour éviter modif directe
        this.displayDialog = true;
    }

    saveModifiedFields() {
        if (!this.selectedLine) return;

        const newValues = this.selectedLine.product;

        this.csvService.updateCsvLine(this.selectedLine.line, newValues).subscribe({
            next: () => {
                this.displayDialog = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Fields updated!'
                });
                this.loadCsvProducts();
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Update failed'
                });
                console.error(err);
            }
        });
    }

    addToDatabase(product: CsvProduct, index: number) {
        this.csvService.addLineToDatabase(index, product).subscribe({
            next: (res) => {
                console.log(res);
                this.validProducts.splice(index, 1); // supprime la ligne du tableau côté frontend
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Product added to database and removed from CSV'
                });
            },
            error: (err) => {
                console.error(err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to add product to database'
                });
            }
        });
    }


}
