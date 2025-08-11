//package tn.epac.orderservice.Config;
//
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.cloud.vertexai.VertexAI;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.ClassPathResource;
//
//import java.io.IOException;
//
//@Configuration
//public class VertexAIConfig {
//
//    @Bean
//    public VertexAI vertexAI() throws IOException {
//        GoogleCredentials credentials = GoogleCredentials
//                .fromStream(new ClassPathResource("keys/food-9i16xt-568e80caff16.json").getInputStream());
//        return new VertexAI("food-9i16xt", "europe-west3");
//    }
//
//}
