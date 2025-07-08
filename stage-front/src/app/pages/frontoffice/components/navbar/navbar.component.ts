
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import {ButtonDirective} from "primeng/button";
import {KeycloakService} from "keycloak-angular";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule, MenubarModule, ButtonDirective],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    items: MenuItem[] = [];
    constructor(private router: Router,private keycloakService: KeycloakService) {
        // Handle fragment navigation for smooth scrolling
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const fragment = this.router.url.split('#')[1];
                if (fragment) {
                    setTimeout(() => {
                        const element = document.getElementById(fragment);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100); // Delay to ensure DOM is rendered
                }
            }
        });
    }

    async login() {
        if (!(await this.keycloakService.isLoggedIn())) {
            await this.keycloakService.login({
                redirectUri: window.location.origin + '/uikit/dash',
            });

        } else {
            console.log('User is already logged in');
            this.router.navigate(['/uikit/dash']);
        }
    }
    ngOnInit() {
    }
}
