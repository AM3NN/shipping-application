import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { catchError, switchMap } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';
import { Textarea } from 'primeng/textarea';
import { ButtonDirective } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-test',
    imports: [FormsModule, ButtonDirective, Textarea, NgIf],
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
    standalone: true
})
export class TestComponent {
    userQuery: string = '';
    agentResponse: string = '';
    loading = false;
    private apiUrl = 'http://localhost:8082/api/products/askAgent';

    constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

    askAgent(): void {
        this.loading = true;
        this.agentResponse = ''; // reset

        this.getHeaders()
            .pipe(
                switchMap(headers => {
                    return this.http.get(this.apiUrl, {
                        headers,
                        params: { query: this.userQuery },
                        responseType: 'text',
                        // withCredentials: false (ou pas selon ton besoin)
                    });
                }),
                catchError(err => {
                    this.agentResponse = 'Erreur de communication avec l’agent: ' + (err.message || err.statusText || 'Erreur inconnue');
                    this.loading = false;
                    return throwError(() => err);
                })
            )
            .subscribe(response => {
                this.loading = false;

                // Transformer la réponse SSE en paragraphe simple
                // Exemple de réponse:
                // data:Hello
                // data:!
                // data: How
                // data: can
                // data: I
                // data: assist
                // data: you
                // data: today
                // data:?

                const lines = response.split('\n');
                const texts = lines
                    .filter(line => line.startsWith('data:'))
                    .map(line => line.replace(/^data:\s*/, '').trim());

                this.agentResponse = texts.join(' ');
            });
    }

    private getHeaders(): Observable<HttpHeaders> {
        return from(Promise.resolve(this.keycloakService.isLoggedIn())).pipe(
            switchMap((isLoggedIn) => {
                if (!isLoggedIn) {
                    return throwError(() => new Error('Utilisateur non authentifié'));
                }
                return from(this.keycloakService.getToken()).pipe(
                    switchMap((token) => {
                        if (!token) {
                            return throwError(() => new Error('Token manquant'));
                        }
                        console.log('JWT Token:', token); // Debug (attention en prod)
                        return new Observable<HttpHeaders>((observer) => {
                            observer.next(new HttpHeaders().set('Authorization', `Bearer ${token}`));
                            observer.complete();
                        });
                    })
                );
            }),
            catchError((err) => {
                console.error('Erreur d’authentification:', err);
                return throwError(() => new Error('Erreur Keycloak'));
            })
        );
    }
}
