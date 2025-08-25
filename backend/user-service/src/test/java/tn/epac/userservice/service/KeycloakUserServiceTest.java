package tn.epac.userservice.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import tn.epac.userservice.dto.ProfileUpdateDTO;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class KeycloakUserServiceTest {

    private Keycloak keycloak;
    private KeycloakUserService service;
    private RealmResource realmResource;
    private UsersResource usersResource;
    private UserResource userResource;

    @BeforeEach
    void setUp() {
        keycloak = mock(Keycloak.class);
        realmResource = mock(RealmResource.class);
        usersResource = mock(UsersResource.class);
        userResource = mock(UserResource.class);

        service = new KeycloakUserService();
        service.keycloak = keycloak;

        when(keycloak.realm("stage-shipping-realm")).thenReturn(realmResource);
        when(realmResource.users()).thenReturn(usersResource);
        when(usersResource.get(anyString())).thenReturn(userResource);
    }

    @Test
    void updateUserProfile_shouldUpdateBasicInfoAndPassword() {
        // Arrange
        ProfileUpdateDTO dto = new ProfileUpdateDTO();
        dto.setFirstName("John");
        dto.setLastName("Doe");
        dto.setEmail("john.doe@example.com");
        dto.setPassword("newPassword123");

        UserRepresentation user = new UserRepresentation();
        when(userResource.toRepresentation()).thenReturn(user);

        service.updateUserProfile("user123", dto);

        assertEquals("John", user.getFirstName());
        assertEquals("Doe", user.getLastName());
        assertEquals("john.doe@example.com", user.getEmail());

        verify(userResource, times(1)).update(user);
        verify(userResource, times(1)).resetPassword(any(CredentialRepresentation.class));
    }

    @Test
    void updateUserProfile_shouldUpdateWithoutPasswordIfNullOrEmpty() {
        ProfileUpdateDTO dto = new ProfileUpdateDTO();
        dto.setFirstName("Alice");
        dto.setLastName("Smith");
        dto.setEmail("alice@example.com");
        dto.setPassword("");

        UserRepresentation user = new UserRepresentation();
        when(userResource.toRepresentation()).thenReturn(user);

        service.updateUserProfile("user456", dto);

        assertEquals("Alice", user.getFirstName());
        assertEquals("Smith", user.getLastName());
        assertEquals("alice@example.com", user.getEmail());

        verify(userResource, times(1)).update(user);
        verify(userResource, never()).resetPassword(any());
    }
}
