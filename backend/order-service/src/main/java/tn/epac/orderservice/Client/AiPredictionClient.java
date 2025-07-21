package tn.epac.orderservice.Client;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import tn.epac.orderservice.DTO.PredictionInput;
import tn.epac.orderservice.DTO.PredictionResponse;

@Service
public class AiPredictionClient {

    private final WebClient webClient;

    public AiPredictionClient(WebClient.Builder builder) {
        this.webClient = builder
                .baseUrl("http://ai-prediction-service:8084")
                .build();
    }

    public PredictionResponse predict(PredictionInput input) {
        return webClient.post()
                .uri("/predict")
                .bodyValue(input)
                .retrieve()
                .bodyToMono(PredictionResponse.class)
                .block();
    }
}