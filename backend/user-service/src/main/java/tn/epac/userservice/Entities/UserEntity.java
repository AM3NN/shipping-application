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
    String companyname;
    String email;
    boolean enabled;
    LocalDate birthdate;
    String position;
    String phoneNumber;
    Double latitude;    // Latitude de l'adresse de livraison
    Double longitude;   // Longitude de l'adresse de livraison
   String street;
    // Optionnel : pour une zone précise
    String city;
    String postalCode;
    String country;
    @DBRef // Optional: if you want to reference documents from the "roles" collection
    Set<Role> roles;

    byte[] profilePhoto;

    String profilePhotoPath;

}