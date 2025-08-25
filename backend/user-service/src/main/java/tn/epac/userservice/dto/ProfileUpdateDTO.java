package tn.epac.userservice.dto;

import lombok.Data;

@Data
public class ProfileUpdateDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;

}