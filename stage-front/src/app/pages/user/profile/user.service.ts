import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { UserEntity, Role } from './user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://localhost:8888/user-service/api/users';

    constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

    /** Générer les headers avec token JWT */
    private getHeaders(): Observable<HttpHeaders> {
        return from(this.keycloakService.getToken()).pipe(
            switchMap((token) => {
                if (!token) return throwError(() => new Error('Token manquant'));
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



    /** Récupérer le profil d’un utilisateur */
    getUserProfile(userId: string): Observable<UserEntity> {
        return this.getHeaders().pipe(
            switchMap((headers) => this.http.get<UserEntity>(`${this.apiUrl}/${userId}/profile`, { headers }))
        );
    }

    /** Mettre à jour le profil d’un utilisateur */
    updateUserProfile(userId: string, data: Partial<UserEntity>): Observable<any> {
        return this.getHeaders().pipe(
            switchMap((headers) => this.http.put(`${this.apiUrl}/${userId}/profile`, data, { headers }))
        );
    }

    /** Upload de la photo de profil */
    uploadProfilePhoto(userId: string, file: File): Observable<any> {
        return this.getHeaders().pipe(
            switchMap((headers) => {
                const formData = new FormData();
                formData.append('file', file);

                // Supprimer Content-Type si présent
                const cleanHeaders = headers.delete('Content-Type');

                return this.http.post(
                    `${this.apiUrl}/${userId}/profile-photo`,
                    formData,
                    { headers: cleanHeaders }
                );
            })
        );
    }


    /** Récupérer tous les rôles */
    getAllRoles(): Observable<Role[]> {
        return this.getHeaders().pipe(
            switchMap((headers) => this.http.get<Role[]>(`${this.apiUrl}/roles/all`, { headers }))
        );
    }


    /** 🔹 Récupérer les utilisateurs connectés en temps réel */
    getActiveUsers(): Observable<UserEntity[]> {
        return this.getHeaders().pipe(
            switchMap((headers) =>
                this.http.get<UserEntity[]>(`${this.apiUrl}/sessions`, { headers })
            ),
            catchError((err) => {
                console.error('Erreur récupération utilisateurs actifs:', err);
                return throwError(() => err);
            })
        );
    }
    getUserEvents(userId: string): Observable<any> {
        return this.getHeaders().pipe(
            switchMap(headers => this.http.get(`${this.apiUrl}/${userId}/events`, { headers }))
        );
    }

    getAllClients(): Observable<any[]> {
        return this.getHeaders().pipe(
            switchMap(headers => this.http.get<any[]>(`${this.apiUrl}/clients`, { headers })),
            catchError(err => {
                console.error('Erreur récupération des clients:', err);
                return throwError(() => err);
            })
        );
    }


    getAllUsers(): Observable<UserEntity[]> {
        return this.getHeaders().pipe(
            switchMap((headers) => this.http.get<UserEntity[]>(`${this.apiUrl}/all`, { headers }))
        );
    }
    /** Créer un nouvel utilisateur */
    createUser(user: { username: string; email: string; password: string; roles?: string[] }): Observable<string> {
        return this.getHeaders().pipe(
            switchMap((headers) =>
                this.http.post(`${this.apiUrl}/create`, user, {
                    headers,
                    responseType: 'text', // car ton backend renvoie ResponseEntity<String>
                })
            )
        );
    }





}
