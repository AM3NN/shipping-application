import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, from, throwError, tap} from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import {Order, OrderDetail, OrderWithDetailsRequest} from './order.model';
import { KeycloakService } from 'keycloak-angular';


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
    getMyCustomProducts(clientId: string): Observable<OrderDetail[]> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.get<OrderDetail[]>(
                    `${this.baseUrl}/mycustomproducts/${clientId}`,
                    { headers, withCredentials: true }
                )
            ),
            catchError(err => {
                console.error('Erreur lors de la récupération des custom products:', err);
                return throwError(() => err);
            })
        );
    }

}
