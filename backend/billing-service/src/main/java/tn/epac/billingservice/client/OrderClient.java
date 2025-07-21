package tn.epac.billingservice.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import tn.epac.billingservice.dto.OrderDto;

@Service
public class OrderClient {

    private final WebClient webClient;

    public OrderClient(
            WebClient.Builder builder,
            @Value("${order.service.url}") String orderServiceUrl) {

        this.webClient = builder.baseUrl(orderServiceUrl).build();
    }

    public Mono<OrderDto> getOrderById(String orderId) {
        return webClient.get()
                .uri("/orders/{id}", orderId)
                .retrieve()
                .bodyToMono(OrderDto.class);}
}
