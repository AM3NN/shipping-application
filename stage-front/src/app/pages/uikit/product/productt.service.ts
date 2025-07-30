import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

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
    imageUrl?:string;
}


@Injectable()
export class ProducttService {
    private apiUrl = 'http://localhost:8888/product-service/api/products';

    constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

    getProducts(): Observable<Product[]> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.get<Product[]>(this.apiUrl, {
                    headers: headers,
                    withCredentials: true  // IMPORTANT pour envoyer credentials
                })
            ),
            catchError(err => {
                console.error('Erreur lors de la récupération des produits:', err);
                return throwError(() => new Error('Impossible de récupérer les produits.'));
            })
        );
    }

    addProduct(product: Product, imageFile?: File): Observable<Product> {
        const formData = new FormData();
        const productBlob = new Blob([JSON.stringify(product)], { type: 'application/json' });
        formData.append('product', productBlob);
        console.log('Image file:', imageFile);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.post<Product>(this.apiUrl, formData, {
                    headers: headers.delete('Content-Type'), // Angular gère multipart automatiquement
                    withCredentials: true
                })
            ),
            catchError(err => {
                console.error('Erreur lors de l’ajout du produit:', err);
                return throwError(() => new Error('Impossible d’ajouter le produit.'));
            })
        );
    }


    private getHeaders(): Observable<HttpHeaders> {
        return from(Promise.resolve(this.keycloakService.isLoggedIn())).pipe(
            switchMap(isLoggedIn => {
                if (!isLoggedIn) {
                    return throwError(() => new Error('Utilisateur non authentifié'));
                }
                return from(this.keycloakService.getToken()).pipe(
                    switchMap(token => {
                        if (!token) {
                            return throwError(() => new Error('Token manquant'));
                        }
                        return new Observable<HttpHeaders>(observer => {
                            observer.next(new HttpHeaders().set('Authorization', `Bearer ${token}`));
                            observer.complete();
                        });
                    })
                );
            }),
            catchError(err => {
                console.error('Erreur récupération token:', err);
                return throwError(() => err);
            })
        );
    }
    deleteProduct(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.delete<void>(url, {
                    headers: headers,
                    withCredentials: true
                })
            ),
            catchError(err => {
                console.error('Erreur lors de la suppression du produit:', err);
                return throwError(() => new Error('Impossible de supprimer le produit.'));
            })
        );
    }

}
