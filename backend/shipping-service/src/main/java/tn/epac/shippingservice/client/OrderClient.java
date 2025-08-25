package tn.epac.shippingservice.client;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import tn.epac.shippingservice.dto.OrderDto;

@Service
public class OrderClient {

    private final WebClient webClient;
    private final KeycloakTokenProvider tokenProvider;

    public OrderClient(WebClient.Builder builder, KeycloakTokenProvider tokenProvider) {
        this.webClient = builder.baseUrl("http://localhost:8081").build();
        this.tokenProvider = tokenProvider;
    }

    public Mono<OrderDto> getOrderById(String orderId) {
        return tokenProvider.getAccessToken()
                .flatMap(token ->
                        webClient.get()
                                .uri("/orders/{id}", orderId)
                                .headers(headers -> headers.setBearerAuth(token))
                                .retrieve()
                                .bodyToMono(OrderDto.class)
                );
    }
}
