package tn.epac.orderservice.DTO;

import lombok.Data;

@Data
public class PredictionInput {
    private String partId;
    private Integer quantity;
    private Double thickness;
    private Double height;
    private Double width;
    private Double weight;
    private String textPaperType;
    private String coverFinishType;
}