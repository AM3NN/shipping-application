package tn.epac.productservice.Services;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import tn.epac.productservice.DTO.ProductDTO;
import tn.epac.productservice.Entities.ProductEvent;

@Service
public class ProductEventPublisher {
    private final KafkaTemplate<String, ProductEvent> kafkaTemplate;
    private final String topic = "product-topic";

    public ProductEventPublisher(KafkaTemplate<String, ProductEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishProductCreated(ProductDTO product) {
        ProductEvent event = new ProductEvent("CREATED", product);
        kafkaTemplate.send(topic, product.getId(), event);
    }

    public void publishProductUpdated(ProductDTO product) {
        ProductEvent event = new ProductEvent("UPDATED", product);
        kafkaTemplate.send(topic, product.getId(), event);
    }

    public void publishProductDeleted(String productId) {
        ProductEvent event = new ProductEvent("DELETED", new ProductDTO(productId));
        kafkaTemplate.send(topic, productId, event);
    }
}
