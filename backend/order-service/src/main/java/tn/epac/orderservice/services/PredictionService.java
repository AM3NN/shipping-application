package tn.epac.orderservice.services;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.HashMap;

import tn.epac.orderservice.dto.OrderRequestDTO;
import tn.epac.orderservice.dto.PredictionResponse;

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

        // Missing fields required by Flask model
        inputFeatures.put("shrinkwrap", orderRequestDTO.isShrinkwrap());
        inputFeatures.put("production_page", orderRequestDTO.getProductionPage());
        inputFeatures.put("perf", orderRequestDTO.isPerf());
        inputFeatures.put("three_hole_drill", orderRequestDTO.isThreeHoleDrill());
        inputFeatures.put("text_color", orderRequestDTO.getTextColor());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(inputFeatures, headers);

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                AI_PREDICTION_URL,
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        Map<String, Object> body = response.getBody();

        Double predictedPrice = null;
        String estimatedFabricationTime = null;

        if (body != null) {
            Object priceObj = body.get("predictedPrice");
            if (priceObj instanceof Number number) {
                predictedPrice = number.doubleValue();
            }
            Object timeObj = body.get("estimatedFabricationTime");
            if (timeObj instanceof String estimatedTime) {
                estimatedFabricationTime = estimatedTime;
            }
        }

        PredictionResponse predictionResponse = new PredictionResponse();
        predictionResponse.setPredictedPrice(predictedPrice);
        predictionResponse.setEstimatedFabricationTime(estimatedFabricationTime);

        return predictionResponse;
    }
}
