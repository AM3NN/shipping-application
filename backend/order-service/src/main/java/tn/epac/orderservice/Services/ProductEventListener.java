package tn.epac.orderservice.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import tn.epac.orderservice.DTO.ProductDTO;
import tn.epac.orderservice.Entities.Product;
import tn.epac.orderservice.Entities.ProductEvent;
import tn.epac.orderservice.Repository.ProductRepository;

@Service
public class ProductEventListener {

    private static final Logger logger = LoggerFactory.getLogger(ProductEventListener.class);
    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper;

    public ProductEventListener(ProductRepository productRepository, ObjectMapper objectMapper) {
        this.productRepository = productRepository;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "product-topic", groupId = "order-service-group", containerFactory = "kafkaListenerContainerFactory")
    public void listenProductEvents(ConsumerRecord<String, ProductEvent> record) {
        try {
            ProductEvent event = record.value();
            ProductDTO productDTO = event.getProduct();

            switch (event.getEventType()) {
                case "CREATED":
                case "UPDATED":
                    Product product = mapToEntity(productDTO);
                    productRepository.save(product);
                    logger.info("Processed {} event for product ID: {}", event.getEventType(), productDTO.getId());
                    break;
                case "DELETED":
                    productRepository.deleteById(productDTO.getId());
                    logger.info("Deleted product with ID: {}", productDTO.getId());
                    break;
                default:
                    logger.warn("Unhandled event type: {}", event.getEventType());
            }
        } catch (Exception e) {
            logger.error("Error processing product event for key {}: {}", record.key(), e.getMessage(), e);
            // Optionally, send to a Dead Letter Queue or implement retry logic
        }
    }

    private Product mapToEntity(ProductDTO dto) {
        return Product.builder()
                .id(dto.getId())
                .name(dto.getName())
                .reference(dto.getReference())
                .description(dto.getDescription())
                .type(dto.getType())
                .version(dto.getVersion())
                .quantity(dto.getQuantity())
                .price(dto.getPrice())
                .inventoryIds(dto.getInventoryIds())
                .category(dto.getCategory())
                .inventoryStatus(dto.getInventoryStatus())
                .imageUrl(dto.getImageUrl())
                .build();
    }
}