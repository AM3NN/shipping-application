package tn.epac.ordervalidatorservice.config;

import org.junit.jupiter.api.Test;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.lang.reflect.Field;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class WebConfigTest {

    @Test
    void corsFilter() throws NoSuchFieldException, IllegalAccessException {
        WebConfig webConfig = new WebConfig();
        CorsFilter corsFilter = webConfig.corsFilter();
        assertNotNull(corsFilter);

        Field configSourceField = CorsFilter.class.getDeclaredField("configSource");
        configSourceField.setAccessible(true);
        UrlBasedCorsConfigurationSource source = (UrlBasedCorsConfigurationSource) configSourceField.get(corsFilter);
        CorsConfiguration config = source.getCorsConfigurations().get("/**");
        assertNotNull(config);
        assertTrue(config.getAllowCredentials());
        assertEquals(Arrays.asList("http://localhost:3000"), config.getAllowedOrigins());
        assertEquals(Arrays.asList("*"), config.getAllowedHeaders());
        assertEquals(Arrays.asList("GET", "POST", "OPTIONS"), config.getAllowedMethods());
    }
}