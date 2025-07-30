// src/keycloak-init.ts
import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8080',
                realm: 'test',
                clientId: 'angularid'
            },
            initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: false
            }
        });
}
