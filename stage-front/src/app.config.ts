import { ApplicationConfig, importProvidersFrom, SecurityContext, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from '../keycloak-init';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

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
            provide: APP_INITIALIZER, // ✅ ici c'est la constante, pas une string
            useFactory: initializeKeycloak,
            deps: [KeycloakService],
            multi: true,
        },
        MarkdownService,
        {
            provide: SecurityContext,
            useValue: SecurityContext.HTML
        },
    ]
};
