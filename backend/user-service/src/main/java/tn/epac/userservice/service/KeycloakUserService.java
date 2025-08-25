package tn.epac.userservice.service;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.epac.userservice.dto.ProfileUpdateDTO;

@Service
public class KeycloakUserService {

    @Autowired
    protected Keycloak keycloak;

    public void updateUserProfile(String userId, ProfileUpdateDTO profile) {
        // Update basic profile
        UserRepresentation user = keycloak.realm("stage-shipping-realm")
                .users()
                .get(userId)
                .toRepresentation();

        user.setFirstName(profile.getFirstName());
        user.setLastName(profile.getLastName());
        user.setEmail(profile.getEmail());
        keycloak.realm("stage-shipping-realm").users().get(userId).update(user);

        if (profile.getPassword() != null && !profile.getPassword().isEmpty()) {
            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue(profile.getPassword());
            credential.setTemporary(false);

            keycloak.realm("stage-shipping-realm")
                    .users()
                    .get(userId)
                    .resetPassword(credential);
        }
    }
}
