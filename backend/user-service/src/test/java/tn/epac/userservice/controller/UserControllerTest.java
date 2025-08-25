package tn.epac.userservice.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import tn.epac.userservice.dto.ProfileUpdateDTO;
import tn.epac.userservice.service.KeycloakUserService;

import javax.ws.rs.NotFoundException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private KeycloakUserService keycloakUserService;

    @Mock
    private Jwt jwt;

    @InjectMocks
    private UserController userController;

    private ProfileUpdateDTO profileUpdateDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        profileUpdateDTO = new ProfileUpdateDTO();
        profileUpdateDTO.setFirstName("John");
        profileUpdateDTO.setLastName("Doe");
        profileUpdateDTO.setEmail("john.doe@example.com");
    }

    @Test
    void updateProfile_shouldReturn200_whenSuccess() {
        when(jwt.getSubject()).thenReturn("user123");

        ResponseEntity<String> response = userController.updateProfile(jwt, profileUpdateDTO);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Profile updated successfully", response.getBody());
        verify(keycloakUserService, times(1)).updateUserProfile("user123", profileUpdateDTO);
    }

    @Test
    void updateProfile_shouldReturn401_whenJwtIsNull() {
        ResponseEntity<String> response = userController.updateProfile(null, profileUpdateDTO);

        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Unauthorized: JWT is missing", response.getBody());
        verifyNoInteractions(keycloakUserService);
    }


    @Test
    void updateProfile_shouldReturn400_whenServiceThrowsException() {
        when(jwt.getSubject()).thenReturn("user123");
        doThrow(new RuntimeException("Some error")).when(keycloakUserService).updateUserProfile(eq("user123"), any());

        ResponseEntity<String> response = userController.updateProfile(jwt, profileUpdateDTO);

        assertEquals(400, response.getStatusCodeValue());
        assertTrue(response.getBody().contains("Failed to update profile"));
        verify(keycloakUserService, times(1)).updateUserProfile("user123", profileUpdateDTO);
    }
}
