import { Component, SecurityContext } from '@angular/core';
import {HttpClient, HttpDownloadProgressEvent, HttpEventType, HttpHeaders} from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { catchError, switchMap } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';
import { Textarea } from 'primeng/textarea';
import { ButtonDirective } from 'primeng/button';
import { MarkdownComponent } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import {MarkdownStandaloneModule} from "../../../markdown-standaloneã/markdown-standalone.module";

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonDirective,
        Textarea,
        NgIf,
        MarkdownComponent,
        MarkdownStandaloneModule
    ],
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent {
    userQuery: string = '';
    agentResponse: string = '';
    loading = false;
    private apiUrl = 'http://localhost:8081/api/orders/askAgent';

    constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

    askAgent(): void {
        this.loading = true;
        this.agentResponse = '';

        this.getHeaders()
            .pipe(
                switchMap((headers) =>
                    this.http.get(this.apiUrl, {
                        headers,
                        params: { query: this.userQuery },
                        responseType: 'text',
                        observe: 'events',
                        reportProgress: true,
                    })
                ),
                catchError((err) => {
                    this.agentResponse = 'Erreur de communication avec l’agent: ' + (err.message || err.statusText || 'Erreur inconnue');
                    this.loading = false;
                    return throwError(() => err);
                })
            )
            .subscribe({
                next: (evt) => {
                    if (evt.type === HttpEventType.DownloadProgress) {
                        const partial = (evt as HttpDownloadProgressEvent).partialText || '';
                        this.agentResponse = partial;
                    }
                },
                error: () => {
                    this.loading = false;
                },
                complete: () => {
                    this.loading = false;
                },
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
                        console.log('JWT Token:', token);
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
