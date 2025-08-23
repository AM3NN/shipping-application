package tn.epac.orderservice.DTO;

import lombok.Data;

import java.util.List;

@Data
public class ProductDetailsDTO {
    private String title;
    private String overview;
    private List<String> features;
}