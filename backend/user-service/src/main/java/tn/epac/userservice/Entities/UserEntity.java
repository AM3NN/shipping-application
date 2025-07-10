package tn.epac.userservice.Entities;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDate;
import java.util.Set;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserEntity {

    @Id
    String id; // ID from Keycloak

    String username;
    String email;
    boolean enabled;
    LocalDate birthdate;
    String position;
    String education;
    String languages;
    String phoneNumber;

    @DBRef // Optional: if you want to reference documents from the "roles" collection
    Set<Role> roles;

    byte[] profilePhoto;

    String profilePhotoPath;

}