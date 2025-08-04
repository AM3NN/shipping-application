package tn.epac.orderservice.dto;

import lombok.Data;


@Data
public class PredictionResponse {
    private Double predictedPrice;  
    private String estimatedFabricationTime;
}
