package tn.epac.shippingservice.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;
import tn.epac.shippingservice.client.FedExClient;
import tn.epac.shippingservice.client.OrderClient;
import tn.epac.shippingservice.model.Shipment;
import tn.epac.shippingservice.repository.ShipmentRepository;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;

@Service
public class ShipmentService {
    private static final Logger log = LoggerFactory.getLogger(ShipmentService.class);
    private final ShipmentRepository shipmentRepository;
    private final FedExClient fedExClient;
    private final OrderClient orderClient;

    public ShipmentService(ShipmentRepository shipmentRepository, FedExClient fedExClient, OrderClient orderClient) {
        this.shipmentRepository = shipmentRepository;
        this.fedExClient = fedExClient;
        this.orderClient = orderClient;
    }

    public Mono<Shipment> getShipmentStatus(String orderId) {
        if (orderId == null || orderId.trim().isEmpty()) {
            log.warn("Invalid orderId provided: {}", orderId);
            return Mono.error(new IllegalArgumentException("Order ID must not be null or empty"));
        }
        return shipmentRepository.findByOrderId(orderId)
                .flatMap(this::updateFromFedEx)
                .switchIfEmpty(Mono.defer(() -> {
                    log.info("No shipment found for orderId {}, creating pending from order", orderId);
                    return orderClient.getOrderById(orderId)
                            .switchIfEmpty(Mono.error(new IllegalArgumentException("Order not found for ID: " + orderId)))
                            .map(order -> {
                                Shipment shipment = new Shipment();
                                shipment.setOrderId(orderId);
                                shipment.setTrackingNumber("NOT_ASSIGNED");
                                shipment.setCarrier("FedEx");
                                shipment.setStatus("PENDING");
                                shipment.setDeliveryLocation(order.getDeliveryLocation());
                                shipment.setEstimatedDeliveryDate(order.getExpectedDate());
                                shipment.setCreatedAt(LocalDateTime.now());
                                return shipment;
                            });
                }))
                .onErrorResume(IllegalArgumentException.class, ex -> {
                    log.error("Invalid input for orderId {}: {}", orderId, ex.getMessage() != null ? ex.getMessage() : "Unknown error");
                    return Mono.error(ex);
                })
                .onErrorResume(ex -> {
                    log.error("Error retrieving shipment status for orderId {}: {}", orderId, ex.getMessage() != null ? ex.getMessage() : "Unknown error");
                    return Mono.error(new RuntimeException("Failed to retrieve shipment status", ex));
                });
    }

    public Mono<Shipment> createShipment(String orderId, String trackingNumber, String carrier) {
        if (orderId == null || orderId.trim().isEmpty() ||
                trackingNumber == null || trackingNumber.trim().isEmpty() ||
                carrier == null || carrier.trim().isEmpty()) {
            log.warn("Invalid input for createShipment: orderId={}, trackingNumber={}, carrier={}",
                    orderId, trackingNumber, carrier);
            return Mono.error(new IllegalArgumentException("Order ID, tracking number, and carrier must not be null or empty"));
        }
        return orderClient.getOrderById(orderId)
                .switchIfEmpty(Mono.error(new IllegalArgumentException("Order not found for ID: " + orderId)))
                .flatMap(order -> {
                    Shipment shipment = new Shipment();
                    shipment.setOrderId(orderId);
                    shipment.setTrackingNumber(trackingNumber);
                    shipment.setCarrier(carrier);
                    shipment.setStatus("CREATED");
                    shipment.setDeliveryLocation(order.getDeliveryLocation());
                    shipment.setEstimatedDeliveryDate(order.getExpectedDate());
                    shipment.setCreatedAt(LocalDateTime.now());
                    log.info("Creating shipment for orderId {}, trackingNumber {}, carrier {}", orderId, trackingNumber, carrier);
                    return shipmentRepository.save(shipment);
                })
                .doOnSuccess(s -> log.info("Shipment saved successfully for orderId {}", orderId))
                .doOnError(ex -> log.error("Error saving shipment for orderId {}: {}", orderId, ex.getMessage() != null ? ex.getMessage() : "Unknown error"));
    }

    private Mono<Shipment> updateFromFedEx(Shipment shipment) {
        return fedExClient.getTrackingStatus(shipment.getTrackingNumber())
                .retryWhen(Retry.backoff(3, Duration.ofSeconds(1))
                        .filter(ex -> ex instanceof RuntimeException)
                        .doBeforeRetry(retrySignal -> log.warn("Retrying FedEx API call for trackingNumber {}, attempt {}",
                                shipment.getTrackingNumber(), retrySignal.totalRetries() + 1)))
                .flatMap(fedExResponse -> {
                    if (fedExResponse.output() == null || fedExResponse.output().length == 0) {
                        log.warn("No tracking data available from FedEx for trackingNumber {}", shipment.getTrackingNumber());
                        return Mono.just(shipment); // Return unchanged shipment
                    }
                    var event = fedExResponse.output()[0];
                    shipment.setStatus(event.status());
                    if ("DELIVERED".equals(event.status()) && shipment.getActualDeliveryDate() == null) {
                        shipment.setActualDeliveryDate(LocalDateTime.now());
                    }
                    try {
                        shipment.setEstimatedDeliveryDate(
                                event.estimatedDeliveryDate() != null ?
                                        LocalDate.parse(event.estimatedDeliveryDate()) : null
                        );
                    } catch (DateTimeParseException ex) {
                        log.warn("Invalid date format from FedEx: {}", event.estimatedDeliveryDate());
                        shipment.setEstimatedDeliveryDate(null);
                    }
                    log.info("Updating shipment status for trackingNumber {} to {}", shipment.getTrackingNumber(), shipment.getStatus());
                    return shipmentRepository.save(shipment);
                })
                .onErrorResume(ex -> {
                    log.error("Error updating shipment {} from FedEx: {}", shipment.getTrackingNumber(), ex.getMessage() != null ? ex.getMessage() : "Unknown error");
                    return Mono.just(shipment);
                });
    }
}