package tn.epac.orderservice.services;

import tn.epac.orderservice.dto.OrderRequestDTO;
import tn.epac.orderservice.dto.PredictionResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.*;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class PredictionServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private PredictionService predictionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void predict_shouldReturnPredictionResponse() {
        // Arrange
        OrderRequestDTO dto = new OrderRequestDTO();
        dto.setQuantity(100);
        dto.setThickness(1.5);
        dto.setHeight(20.0);
        dto.setWidth(15.0);
        dto.setWeight(0.5);
        dto.setTextPaperType("Glossy");
        dto.setCoverFinishType("Matte");
        dto.setBindingType("Stapled");

        Map<String, Object> mockedResponseBody = new HashMap<>();
        mockedResponseBody.put("predictedPrice", 49.99);
        mockedResponseBody.put("estimatedFabricationTime", "3 days");

        ResponseEntity<Map<String, Object>> mockedResponse =
                new ResponseEntity<>(mockedResponseBody, HttpStatus.OK);

        when(restTemplate.exchange(
                eq("http://localhost:5000/predict"),
                eq(HttpMethod.POST),
                any(HttpEntity.class),
                any(ParameterizedTypeReference.class)
        )).thenReturn(mockedResponse);

        // Act
        PredictionResponse result = predictionService.predict(dto);

        // Assert
        assertNotNull(result);
        assertEquals(2.47, result.getPredictedPrice());
        assertEquals("17 days", result.getEstimatedFabricationTime());
    }
}
