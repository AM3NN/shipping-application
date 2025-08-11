import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {from, Observable, throwError} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class OrderechatbotService {
    private baseUrl = 'http://localhost:8888/order-service/api/orders/ai/generate';

    constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

    generateResponse(message: string, context: string = 'order'): Observable<{ response: string }> {
        return this.getHeaders().pipe(
            switchMap(headers =>
                this.http.post<{ response: string }>(
                    `${this.baseUrl}?context=${encodeURIComponent(context)}`,
                    { answer: message },    // corps JSON envoyé
                    { headers }             // options avec headers
                )
            )
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
