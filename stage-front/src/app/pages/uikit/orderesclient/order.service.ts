import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, from, throwError, tap} from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import {Order, OrderWithDetailsRequest} from './order.model';
import { KeycloakService } from 'keycloak-angular';
import {InventoryWithWarehouseDTO} from "../product/inventory.model";

@Injectable({ providedIn: 'root' })
export class OrderService {
    private baseUrl = 'http://localhost:8888/order-service/api/orders';

    constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

    getAllOrders(): Observable<Order[]> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.get<Order[]>(this.baseUrl, {
                    headers,
                    withCredentials: true
                })
            ),
            catchError(err => {
                console.error('Erreur récupération commandes :', err);
                return throwError(() => new Error('Impossible de récupérer les commandes.'));
            })
        );
    }
    getMyOrders(): Observable<Order[]> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.get<Order[]>(`${this.baseUrl}/MyOrders`, {
                    headers,
                    withCredentials: true
                })
            ),
            catchError(err => {
                console.error('Erreur récupération commandes :', err);
                return throwError(() => new Error('Impossible de récupérer les commandes.'));
            })
        );
    }



    createOrder(payload: OrderWithDetailsRequest): Observable<Order> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                from(this.keycloakService.loadUserProfile()).pipe(
                    switchMap(profile => {
                        payload.order.clientId = profile.id ?? '';
                        payload.order.clientEmail = profile.email ?? '';

                        return this.http.post<Order>(`${this.baseUrl}`, payload, {
                            headers,
                            withCredentials: true
                        }).pipe(
                            tap(response => console.log('Réponse backend:', response))
                        );
                    })
                )
            ),
            catchError(err => {
                console.error('Erreur création commande :', err);
                return throwError(() => new Error('Impossible de créer la commande.'));
            })
        );
    }


    updateOrder(order: Order): Observable<Order> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.put<Order>(`${this.baseUrl}/${order.id}`, order, {
                    headers,
                    withCredentials: true
                })
            ),
            catchError(err => {
                console.error('Erreur mise à jour commande :', err);
                return throwError(() => new Error('Impossible de mettre à jour la commande.'));
            })
        );
    }

    deleteOrder(id: string | undefined): Observable<void> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.delete<void>(`${this.baseUrl}/${id}`, {
                    headers,
                    withCredentials: true
                })
            ),
            catchError(err => {
                console.error('Erreur suppression commande :', err);
                return throwError(() => new Error('Impossible de supprimer la commande.'));
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
}
