package tn.epac.billingservice.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tn.epac.billingservice.dto.OrderDto;

@Service
public class OrderClient {

    private final RestTemplate restTemplate;
    private final String orderServiceUrl;

    public OrderClient(
            RestTemplate restTemplate,
            @Value("${order.service.url}") String orderServiceUrl) {
        this.restTemplate = restTemplate;
        this.orderServiceUrl = orderServiceUrl;
    }

    public OrderDto getOrderById(String orderId, String authToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + authToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        return restTemplate.exchange(
                orderServiceUrl + "/orders/{id}",
                HttpMethod.GET,
                entity,
                OrderDto.class,
                orderId
        ).getBody();
    }
}