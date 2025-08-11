import { ApplicationConfig, importProvidersFrom, SecurityContext } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from '../keycloak-init';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { DomSanitizer } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            appRoutes,
            withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
            withEnabledBlockingInitialNavigation()
        ),
        provideHttpClient(),
        importProvidersFrom(BrowserAnimationsModule, KeycloakAngularModule, MarkdownModule.forRoot()),
        {
            provide: 'APP_INITIALIZER',
            useFactory: initializeKeycloak,
            deps: [KeycloakService],
            multi: true,
        },
        MarkdownService,
        {
            provide: SecurityContext,
            useValue: SecurityContext.HTML // Provide SecurityContext globally
        },

    ]
};
