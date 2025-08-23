package tn.epac.billingservice.Config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public GroupedOpenApi shippingApi() {
        return GroupedOpenApi.builder()
                .group("billing-service")
                .pathsToMatch("/api/billings/**")
                .build();
    }

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .addServersItem(new Server()
                        .url("/billing-service") // Ce chemin correspond au prefix utilisé dans le gateway
                        .description("Gateway URL"))
                .info(new Info()
                        .title("billing Service API")
                        .version("v1"))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth")) // 👈 Applique bearerAuth
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .name("Authorization")
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")));
    }
}
