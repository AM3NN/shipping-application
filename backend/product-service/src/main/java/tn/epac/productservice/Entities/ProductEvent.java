package tn.epac.productservice.Entities;

import tn.epac.productservice.DTO.ProductDTO;

import java.io.Serializable;

public class ProductEvent implements Serializable {

    private String eventType; // Exemple : "CREATED", "UPDATED", "DELETED"
    private ProductDTO product;

    public ProductEvent() {
    }

    public ProductEvent(String eventType, ProductDTO product) {
        this.eventType = eventType;
        this.product = product;
    }

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

    @Override
    public String toString() {
        return "ProductEvent{" +
                "eventType='" + eventType + '\'' +
                ", product=" + product +
                '}';
    }
}
