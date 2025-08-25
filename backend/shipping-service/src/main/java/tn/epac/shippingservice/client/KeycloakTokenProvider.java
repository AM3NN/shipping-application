package tn.epac.shippingservice.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Component
public class KeycloakTokenProvider {

    private final WebClient webClient;
    private final String tokenUrl;
    private final String clientId;
    private final String clientSecret;

    public KeycloakTokenProvider(WebClient.Builder builder,
                                 @Value("${keycloak.token.url}") String tokenUrl,
                                 @Value("${keycloak.client.id}") String clientId,
                                 @Value("${keycloak.client.secret}") String clientSecret) {
        this.webClient = builder.build();
        this.tokenUrl = tokenUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public Mono<String> getAccessToken() {
        return webClient.post()
                .uri(tokenUrl)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData("grant_type", "client_credentials")
                        .with("client_id", clientId)
                        .with("client_secret", clientSecret))
                .retrieve()
                .bodyToMono(Map.class)
                .map(map -> (String) map.get("access_token"))
                .onErrorMap(ex -> new RuntimeException("Failed to retrieve access token: " + ex.getMessage(), ex));
    }
}