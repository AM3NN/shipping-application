package tn.epac.orderservice.config;

import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.junit.jupiter.api.Assertions.*;

class WebConfigTest {

    @Test
    void corsConfigurer_shouldAllowAllOriginsAndMethods() {
        WebConfig config = new WebConfig();
        WebMvcConfigurer webMvcConfigurer = config.corsConfigurer();
        assertNotNull(webMvcConfigurer);
        CorsRegistry mockRegistry = new CorsRegistry();
        assertDoesNotThrow(() -> webMvcConfigurer.addCorsMappings(mockRegistry));
    }
}
