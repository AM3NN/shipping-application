package tn.epac.billingservice.feign;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.OAuth2AuthorizeRequest;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;

@Configuration
public class UserFeignConfig {

    @Bean
    public RequestInterceptor userFeignRequestInterceptor(OAuth2AuthorizedClientManager authorizedClientManager) {
        return requestTemplate -> {
            var authorizeRequest = OAuth2AuthorizeRequest
                    .withClientRegistrationId("user-service")
                    .principal("billing-service")
                    .build();

            var authorizedClient = authorizedClientManager.authorize(authorizeRequest);

            if (authorizedClient == null || authorizedClient.getAccessToken() == null) {
                throw new IllegalStateException("Impossible d'obtenir un token pour user-service.");
            }

            String token = authorizedClient.getAccessToken().getTokenValue();
            requestTemplate.header("Authorization", "Bearer " + token);
        };
    }
}
