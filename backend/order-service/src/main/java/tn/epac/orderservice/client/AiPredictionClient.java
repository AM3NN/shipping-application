package tn.epac.orderservice.client;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tn.epac.orderservice.dto.PredictionInput;
import tn.epac.orderservice.dto.PredictionResponse;

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