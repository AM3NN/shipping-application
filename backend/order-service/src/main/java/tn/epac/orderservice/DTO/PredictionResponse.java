package tn.epac.orderservice.DTO;

import lombok.Data;


@Data
public class PredictionResponse {
    private Double predictedPrice;  
    private String estimatedFabricationTime;
}
