package tn.epac.orderservice.Entities;

import tn.epac.orderservice.DTO.ProductDTO;

public class ProductEvent {
    private String eventType;  // ex: "CREATED", "UPDATED", "DELETED"
    private ProductDTO product;

    public ProductEvent() {
    }

    public ProductEvent(String eventType, ProductDTO product) {
        this.eventType = eventType;
        this.product = product;
    }

    // Getters et setters
    public String getEventType() {
        return eventType;
    }
    public void setEventType(String eventType) {
        this.eventType = eventType;
    }
    public ProductDTO getProduct() {
        return product;
    }
    public void setProduct(ProductDTO product) {
        this.product = product;
    }
}
