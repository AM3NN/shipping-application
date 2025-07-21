package tn.epac.orderservice.Services;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.HashMap;

import tn.epac.orderservice.DTO.OrderRequestDTO;
import tn.epac.orderservice.DTO.PredictionResponse;

@Service
public class PredictionService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String AI_PREDICTION_URL = "http://localhost:5000/predict";

    public PredictionResponse predict(OrderRequestDTO orderRequestDTO) {
        Map<String, Object> inputFeatures = new HashMap<>();
        inputFeatures.put("quantity", orderRequestDTO.getQuantity());
        inputFeatures.put("thickness", orderRequestDTO.getThickness());
        inputFeatures.put("height", orderRequestDTO.getHeight());
        inputFeatures.put("width", orderRequestDTO.getWidth());
        inputFeatures.put("weight", orderRequestDTO.getWeight());
        inputFeatures.put("text_paper_type", orderRequestDTO.getTextPaperType());
        inputFeatures.put("cover_finish_type", orderRequestDTO.getCoverFinishType());
        inputFeatures.put("binding_type", orderRequestDTO.getBindingType());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(inputFeatures, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(AI_PREDICTION_URL, request, Map.class);
        Map<String, Object> body = response.getBody();

        Double predictedPrice = (Double) body.get("predictedPrice");
        String estimatedFabricationTime = (String) body.get("estimatedFabricationTime");

        PredictionResponse predictionResponse = new PredictionResponse();
        predictionResponse.setPredictedPrice(predictedPrice);
        predictionResponse.setEstimatedFabricationTime(estimatedFabricationTime);

        return predictionResponse;
    }
}
