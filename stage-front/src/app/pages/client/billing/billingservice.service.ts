import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {from, Observable, throwError} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {Product} from "../products/productt.service";
import {Invoice} from "./invoice.model";
import {loadStripe} from "@stripe/stripe-js";


@Injectable({
  providedIn: 'root'
})
export class BillingserviceService {
    private apiUrl = 'http://localhost:8888/billing-service/api/billings';

    stripeError: string | null = null;
    constructor(private http: HttpClient, private keycloakService: KeycloakService) {}
    private stripePromise = loadStripe('pk_test_51RxSNnRveyiEnQT7vnZKRvSTi2FQTzPsggIP2SM0EY9bzTbVOHzEIFLbqqNa9ZydgBwXThOGRJxA2dIo2zPEVy6000XVfIDljN'); // clé publique Stripe

    getInvoices(clientId: string | undefined): Observable<Invoice[]> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.get<Invoice[]>(`${this.apiUrl}/myinvoices/${clientId}`, {  // Utilisation de path variable
                    headers,
                    withCredentials: true
                })
            ),
            catchError(err => {
                console.error('Erreur lors de la récupération des factures:', err);
                return throwError(() => new Error('Impossible de récupérer les factures.'));
            })
        );}


    payInvoice(invoiceId: string, paymentIntentId: string): Observable<Invoice> {
        const url = `${this.apiUrl}/invoices/${invoiceId}/pay`;
        const body = { paymentIntentId };

        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.put<Invoice>(url, body, {
                    headers,
                    withCredentials: true
                })
            ),
            catchError(err => {
                console.error('Erreur lors du paiement de la facture:', err);
                return throwError(() => new Error('Impossible de mettre à jour la facture.'));
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

    generateInvoice(orderId: string): Observable<any> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.post(`${this.apiUrl}/generate/${orderId}`, {}, {
                    headers: headers,
                    withCredentials: true // pour inclure cookies/session si nécessaire
                }).pipe(
                    catchError(err => {
                        console.error('Erreur lors de la génération de la facture:', err);
                        return throwError(() => new Error('Impossible de générer la facture'));
                    })
                )
            )
        );
    }
    downloadInvoice(invoiceId: string) {
        this.getHeaders().pipe(
            switchMap(headers =>
                this.http.get(`${this.apiUrl}/download/${invoiceId}`, {
                    headers,
                    responseType: 'blob',  // IMPORTANT pour un PDF
                    withCredentials: true
                })
            )
        ).subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `invoice_${invoiceId}.pdf`;
                a.click();
                window.URL.revokeObjectURL(url);
            },
            error: (err) => console.error('Erreur téléchargement PDF', err)
        });
    }
    createPaymentIntent(invoiceId: string): Observable<{ clientSecret: string }> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.post<{ clientSecret: string }>(
                    `${this.apiUrl}/create-payment-intent/${invoiceId}`,
                    {},
                    { headers, withCredentials: true }
                )
            )
        );
    }








}
