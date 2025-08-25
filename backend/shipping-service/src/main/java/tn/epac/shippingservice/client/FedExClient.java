package tn.epac.shippingservice.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class FedExClient {

    private final WebClient webClient;
    private final String apiToken;
    public FedExClient(WebClient.Builder webClientBuilder,
                       @Value("${fedex.api.token}") String apiToken,
                       @Value("${fedex.api.url:https://apis-sandbox.fedex.com/track/v1/trackingnumbers}") String baseUrl) {
        this.webClient = webClientBuilder
                .baseUrl(baseUrl)
                .defaultHeader("Content-Type", "application/json")
                .build();
        this.apiToken = apiToken;
    }

    public Mono<FedExTrackingResponse> getTrackingStatus(String trackingNumber) {
        if ("test".equalsIgnoreCase(trackingNumber)) {
            trackingNumber = "449044304137821"; // Example sandbox tracking number
        }

        FedExTrackingRequest request = new FedExTrackingRequest(trackingNumber);

        return webClient.post()
                .header("Authorization", "Bearer " + apiToken)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(FedExTrackingResponse.class);
    }
    private record FedExTrackingRequest(String trackingNumber) {}
    public record FedExTrackingResponse(Output[] output) {
        public record Output(
                String trackingNumber,
                String status,
                String estimatedDeliveryDate
        ) {}
    }
}
