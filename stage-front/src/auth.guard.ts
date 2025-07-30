// src/app/auth.guard.ts
import {inject, Injectable} from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
    constructor(protected override readonly router: Router, protected readonly keycloak: KeycloakService) {
        super(router, keycloak);
    }

    async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (!this.authenticated) {
            // Redirect to Keycloak login if not authenticated
            await this.keycloak.login({
                redirectUri: window.location.origin + state.url
            });
            return false;
        }
        return true;
    }
}

// Export as a CanActivateFn for standalone usage
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthGuard).isAccessAllowed(route, state);
};
