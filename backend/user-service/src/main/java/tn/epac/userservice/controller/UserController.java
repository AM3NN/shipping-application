package tn.epac.userservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import tn.epac.userservice.dto.ProfileUpdateDTO;
import tn.epac.userservice.service.KeycloakUserService;

import javax.ws.rs.NotFoundException;

@RestController
@RequestMapping("/users")
@Tag(name = "User Management", description = "APIs for managing user profiles in Keycloak")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private KeycloakUserService keycloakUserService;

    @Operation(summary = "Update user profile", description = "Updates the authenticated user's profile in Keycloak, including first name, last name, email, and delivery location.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Profile updated successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing JWT"),
            @ApiResponse(responseCode = "404", description = "User not found in Keycloak"),
            @ApiResponse(responseCode = "400", description = "Invalid profile data")
    })
    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated() and #jwt.subject == authentication.principal.subject")
    public ResponseEntity<String> updateProfile(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody ProfileUpdateDTO profile) {

        logger.debug("Received request to update profile: {}", profile);

        if (jwt == null) {
            logger.error("JWT is null! Cannot authenticate user.");
            return ResponseEntity.status(401).body("Unauthorized: JWT is missing");
        }

        logger.debug("Authenticated JWT subject: {}", jwt.getSubject());

        try {
            String userId = jwt.getSubject();
            logger.debug("Updating profile for Keycloak userId: {}", userId);

            keycloakUserService.updateUserProfile(userId, profile);

            logger.info("Successfully updated profile for userId: {}", userId);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (NotFoundException e) {
            logger.error("User not found in Keycloak: {}", e.getMessage());
            return ResponseEntity.status(404).body("User not found in Keycloak");
        } catch (Exception e) {
            logger.error("Failed to update profile", e);
            return ResponseEntity.badRequest().body("Failed to update profile: " + e.getMessage());
        }
    }
}
