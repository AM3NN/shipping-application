package tn.epac.userservice.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProfileUpdateDTOTest {

    @Test
    void testAllGettersAndSetters() {
        ProfileUpdateDTO dto = new ProfileUpdateDTO();

        dto.setFirstName("John");
        dto.setLastName("Doe");
        dto.setEmail("john.doe@example.com");
        dto.setPassword("secret");

        assertEquals("John", dto.getFirstName());
        assertEquals("Doe", dto.getLastName());
        assertEquals("john.doe@example.com", dto.getEmail());
        assertEquals("secret", dto.getPassword());
    }

    @Test
    void testEqualsAndHashCode() {
        ProfileUpdateDTO dto1 = new ProfileUpdateDTO();
        dto1.setEmail("test@example.com");

        ProfileUpdateDTO dto2 = new ProfileUpdateDTO();
        dto2.setEmail("test@example.com");

        ProfileUpdateDTO dto3 = new ProfileUpdateDTO();
        dto3.setEmail("other@example.com");

        assertEquals(dto1, dto2);
        assertNotEquals(dto1, dto3);

        assertEquals(dto1.hashCode(), dto2.hashCode());
        assertNotEquals(dto1.hashCode(), dto3.hashCode());
    }

    @Test
    void testToString() {
        ProfileUpdateDTO dto = new ProfileUpdateDTO();
        dto.setFirstName("Alice");
        dto.setLastName("Smith");
        dto.setEmail("alice@example.com");
        dto.setPassword("password");

        String str = dto.toString();
        assertTrue(str.contains("Alice"));
        assertTrue(str.contains("Smith"));
        assertTrue(str.contains("alice@example.com"));
        assertTrue(str.contains("password"));
    }
}
