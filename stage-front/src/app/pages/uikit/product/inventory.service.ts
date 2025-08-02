import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import {Inventory, InventoryWithProductDTO, InventoryWithWarehouseDTO} from "./inventory.model";

export enum Category {
    BOOK = 'BOOK',
    MAGAZINE = 'MAGAZINE',
}

export enum InventoryStatus {
    INSTOCK = 'INSTOCK',
    OUTOFSTOCK = 'OUTOFSTOCK',
    LOWSTOCK = 'LOWSTOCK',
}

export interface Product {
    id?: string;
    name: string;
    reference: string;
    description: string;
    type?: string;
    version?: string;
    quantity: number;
    price: number;
    inventoryIds?: string[];
    category?: Category;
    inventoryStatus?: InventoryStatus;
    imageUrl?: string;
}

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    private apiUrl = 'http://localhost:8888/product-service/api/inventories';

    constructor(
        private http: HttpClient,
        private keycloakService: KeycloakService
    ) {}

    private getHeaders(): Observable<HttpHeaders> {
        return from(this.keycloakService.getToken()).pipe(
            switchMap((token) => {
                if (!token) {
                    return throwError(() => new Error('Token manquant'));
                }
                const headers = new HttpHeaders({
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                });
                return new Observable<HttpHeaders>((observer) => {
                    observer.next(headers);
                    observer.complete();
                });
            }),
            catchError((err) => {
                console.error('Erreur récupération token:', err);
                return throwError(() => err);
            })
        );
    }

    createAndAssignInventoryToProduct(
        inventory: any,
        productId: string,
        warehouseId: string
    ): Observable<any> {
        return this.getHeaders().pipe(
            switchMap((headers) => {
                const url = `${this.apiUrl}/assign/${productId}/${warehouseId}`;
                return this.http.post(url, inventory, {
                    headers,
                    withCredentials: true, // identique à WarehouseService
                });
            }),
            catchError((error) => {
                console.error('Erreur lors de l’ajout de l’inventaire au produit :', error);
                return throwError(() => error);
            })
        );
    }
    getInventoriesByProductId(productId: string): Observable<InventoryWithWarehouseDTO[]> {
        const url = `${this.apiUrl}/product/${productId}`;
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.get<InventoryWithWarehouseDTO[]>(url, {
                    headers,
                    withCredentials: true
                })
            ),
            catchError(error => {
                console.error('Erreur lors de la récupération des inventaires du produit:', error);
                return throwError(() => new Error('Impossible de récupérer les inventaires.'));
            })
        );
    }
    getUnassignedInventories(): Observable<InventoryWithProductDTO[]> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.get<InventoryWithProductDTO[]>(`${this.apiUrl}/without-warehouse`, { headers })
            ),
            catchError(err => {
                console.error('Erreur lors de la récupération des inventaires non assignés:', err);
                return throwError(() => new Error('Échec du chargement des inventaires.'));
            })
        );
    }

}
