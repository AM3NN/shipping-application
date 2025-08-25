package tn.epac.userservice.config;

import org.junit.jupiter.api.Test;
import org.keycloak.admin.client.Keycloak;

import static org.junit.jupiter.api.Assertions.*;

class KeycloakConfigTest {

    @Test
    void keycloakBeanCreation() {
        KeycloakConfig config = new KeycloakConfig();
        Keycloak keycloak = config.keycloak();

        assertNotNull(keycloak, "Keycloak bean should not be null");
    }
}
