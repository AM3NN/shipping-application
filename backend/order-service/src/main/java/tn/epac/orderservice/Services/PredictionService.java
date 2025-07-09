package tn.epac.orderservice.Services;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class PredictionService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String AI_PREDICTION_URL = "http://localhost:5000/predict";

    public Map<String, Object> getPrediction(Map<String, Object> inputFeatures) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(inputFeatures, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(AI_PREDICTION_URL, request, Map.class);
        return response.getBody();
    }
}
