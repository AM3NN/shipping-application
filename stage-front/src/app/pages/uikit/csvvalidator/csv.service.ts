import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
export interface CsvProduct {
    [key: string]: any; // chaque champ peut être indexé par string
}

export interface CsvLine {
    line: number;
    product: CsvProduct;
    errors?: Record<string, any>;
}

@Injectable({
    providedIn: 'root',
})
export class CsvService {
    private apiUrl = 'http://localhost:8888/order-service/api/orders/csv/products';

    constructor(
        private http: HttpClient,
        private keycloakService: KeycloakService
    ) {}

    // Méthode pour générer les headers avec token JWT
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

    // Méthode pour récupérer les produits valides et invalides
    getScrappedProducts(): Observable<{
        validScrappedProducts: any[];
        invalidScrappedProducts: any[];
    }> {
        return this.getHeaders().pipe(
            switchMap((headers) =>
                this.http.get<{
                    validScrappedProducts: any[];
                    invalidScrappedProducts: any[];
                }>(this.apiUrl, { headers })
            ),
            catchError((err) => {
                console.error('Erreur récupération des produits CSV:', err);
                return throwError(() => err);
            })
        );
    }


    updateCsvLine(lineIndex: number, newValues: CsvProduct): Observable<any> {
        return this.getHeaders().pipe(
            switchMap((headers) =>
                this.http.put(
                    `${this.apiUrl}/update/${lineIndex}`,
                    newValues,
                    { headers }
                )
            ),
            catchError((err) => {
                console.error('Erreur modification CSV:', err);
                return throwError(() => err);
            })
        );
    }
}
