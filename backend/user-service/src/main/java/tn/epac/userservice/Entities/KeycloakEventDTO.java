package tn.epac.userservice.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KeycloakEventDTO {
    private String type;        // login, logout, LOGIN_ERROR...
    private String userId;
    private String username;
    private String ipAddress;
    private long timestamp;
    private String clientId;
    private String error;
}