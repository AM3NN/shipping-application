package tn.epac.billingservice.DTO;

import java.util.List;

public class UserProfileDto {
    private String username;
    private String birthdate;
    private String position;
    private String education;
    private List<String> languages;
    private String phoneNumber; // facultatif, dépend du JWT
    private String email;

    // getters et setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getBirthdate() { return birthdate; }
    public void setBirthdate(String birthdate) { this.birthdate = birthdate; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public List<String> getLanguages() { return languages; }
    public void setLanguages(List<String> languages) { this.languages = languages; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}