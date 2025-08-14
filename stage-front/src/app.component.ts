import { Component, inject, OnInit } from '@angular/core';
import {
    Event,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
    RouterModule
} from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    private keycloakService = inject(KeycloakService);
    private router = inject(Router);
    private hasRedirected = false; // Flag to track if initial redirect has occurred

    async ngOnInit(): Promise<void> {
        try {


            // Perform initial redirect after login
            if (await this.keycloakService.isLoggedIn()) {
                await this.redirectUserByRole(this.router.url);
            }

            // Subscribe to router events
            this.router.events.subscribe((event: Event) => {
                this.checkRouteChange(event);
            });
        } catch (error) {
            console.error('Keycloak initialization failed:', error);
            this.router.navigate(['/error']);
        }
    }

    checkRouteChange(routerEvent: Event): void {
        if (routerEvent instanceof NavigationStart) {
            // Optional: Show loader
            console.log('Navigation started');
        }
        if (
            routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError
        ) {
            setTimeout(() => {
                // Optional: Hide loader
                console.log('Navigation ended, cancelled, or errored');
            }, 200);
        }
    }

    private async redirectUserByRole(currentUrl: string): Promise<void> {
        if (this.hasRedirected) return; // Skip if initial redirect has already occurred

        try {
            const isLoggedIn = await this.keycloakService.isLoggedIn();
            if (!isLoggedIn) {
                await this.keycloakService.login({
                    redirectUri: window.location.origin + currentUrl
                });
                return;
            }

            const roles = this.keycloakService.getUserRoles();
            console.log('Detected roles:', roles);

            this.hasRedirected = true; // Set flag to prevent further redirects

            // Define target routes based on roles
            if (roles.includes('ROLE_ADMIN') && currentUrl !== '/uikit/dash') {
                console.log(`Admin redirecting from ${currentUrl} to /uikit/dash`);
                await this.router.navigate(['/uikit/dash']);
            } else if (roles.includes('ROLE_CLIENT') && currentUrl !== '/client/dashboard') {
                console.log(`Client redirecting from ${currentUrl} to /client/dashboard`);
                await this.router.navigate(['/client/dashboard']);
            } else if (!roles.includes('ROLE_ADMIN') && !roles.includes('ROLE_CLIENT') && currentUrl !== '/') {
                console.log(`No valid role, redirecting from ${currentUrl} to /`);
                await this.router.navigate(['/']);
            }
        } catch (error) {
            console.error('Error during role-based redirection:', error);
            await this.router.navigate(['/error']);
        }
    }
}
