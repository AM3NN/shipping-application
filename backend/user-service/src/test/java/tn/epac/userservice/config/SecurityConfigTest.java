package tn.epac.userservice.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SecurityConfigTest {

    @Autowired
    private SecurityFilterChain securityFilterChain;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Test
    void securityFilterChain_shouldBeLoaded() {
        assertNotNull(securityFilterChain, "SecurityFilterChain should be loaded by Spring");
    }

    @Test
    void corsConfigurationSource_shouldBeLoaded() {
        assertNotNull(corsConfigurationSource, "CorsConfigurationSource should be loaded by Spring");
    }
}
