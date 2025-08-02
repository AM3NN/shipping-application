import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {Inventory} from "./warehouse.component";
import {InventoryWithProductDTO} from "../product/inventory.model";

export interface Warehouse {
    id: string;
    name: string;
    location: string;
    country: string;
    capacity: number;
    inventories: Inventory[];
}


@Injectable({
    providedIn: 'root'
})
export class WarehouseService {
    private apiUrl = 'http://localhost:8888/product-service/api/warehouses';

    constructor(
        private http: HttpClient,
        private keycloakService: KeycloakService
    ) {}

    private getHeaders(): Observable<HttpHeaders> {
        return from(this.keycloakService.getToken()).pipe(
            switchMap(token => {
                if (!token) {
                    return throwError(() => new Error('Token manquant'));
                }
                const headers = new HttpHeaders({
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                });
                return new Observable<HttpHeaders>(observer => {
                    observer.next(headers);
                    observer.complete();
                });
            }),
            catchError(err => {
                console.error('Erreur lors de la récupération du token:', err);
                return throwError(() => new Error('Erreur d’authentification'));
            })
        );
    }

    getAll(): Observable<Warehouse[]> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.get<Warehouse[]>(this.apiUrl, { headers })
            ),
            catchError(err => {
                console.error('Erreur lors de la récupération des entrepôts:', err);
                return throwError(() => new Error('Échec du chargement des entrepôts.'));
            })
        );
    }

    getById(id: string): Observable<Warehouse> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.get<Warehouse>(`${this.apiUrl}/${id}`, { headers })
            ),
            catchError(err => {
                console.error('Erreur lors de la récupération de l’entrepôt:', err);
                return throwError(() => new Error('Entrepôt non trouvé.'));
            })
        );
    }

    create(warehouse: Warehouse): Observable<Warehouse> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.post<Warehouse>(this.apiUrl, warehouse, { headers })
            ),
            catchError(err => {
                console.error('Erreur lors de la création de l’entrepôt:', err);
                return throwError(() => new Error('Échec de la création.'));
            })
        );
    }

    update(id: string, warehouse: Warehouse): Observable<Warehouse> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.put<Warehouse>(`${this.apiUrl}/${id}`, warehouse, { headers })
            ),
            catchError(err => {
                console.error('Erreur lors de la mise à jour de l’entrepôt:', err);
                return throwError(() => new Error('Échec de la mise à jour.'));
            })
        );
    }

    delete(id: string): Observable<void> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.delete<void>(`${this.apiUrl}/${id}`, { headers })
            ),
            catchError(err => {
                console.error('Erreur lors de la suppression de l’entrepôt:', err);
                return throwError(() => new Error('Échec de la suppression.'));
            })
        );
    }
    assignInventoriesToWarehouse(warehouseId: string, inventoryIds: string[]): Observable<any> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.post(
                    `${this.apiUrl}/${warehouseId}/assign-inventories`,
                    inventoryIds,
                    { headers }
                )
            ),
            catchError(err => {
                console.error('Erreur lors de l’assignation des inventaires:', err);
                return throwError(() => new Error('Échec de l’assignation.'));
            })
        );
    }




}
