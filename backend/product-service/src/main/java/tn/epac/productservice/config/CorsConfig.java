package tn.epac.productservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                // Ajoute ici toutes les origines autorisées (frontend, gateway, etc.)
//                .allowedOrigins("http://localhost:4200", "http://localhost:8888")
//                .allowedMethods("*")  // Autorise toutes les méthodes HTTP (GET, POST, etc.)
//                .allowedHeaders("*")  // Autorise tous les headers
//                .allowCredentials(true)  // Permet l’envoi des cookies ou header Authorization
//                .maxAge(3600); // Cache la config CORS pendant 1 heure (optionnel mais conseillé)
//    }
}
