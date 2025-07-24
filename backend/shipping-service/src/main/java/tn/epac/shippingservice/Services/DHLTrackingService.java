package tn.epac.shippingservice.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tn.epac.shippingservice.Entities.DHLTrackingResponse;

import java.util.List;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class DHLTrackingService {

    @Value("${dhl.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public DHLTrackingService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    public DHLTrackingResponse getTrackingInfo(String trackingNumber) {
        String url = "https://api-eu.dhl.com/track/shipments?trackingNumber=" + trackingNumber;

        HttpHeaders headers = new HttpHeaders();
        headers.set("DHL-API-Key", apiKey);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<DHLTrackingResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    DHLTrackingResponse.class
            );
            return response.getBody();
        } catch (HttpClientErrorException e) {
            System.err.println("Erreur DHL : " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            throw e;
        }
    }
}
