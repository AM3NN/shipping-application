package tn.epac.shippingservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import tn.epac.shippingservice.model.Shipment;
import tn.epac.shippingservice.service.ShipmentService;

import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/shipping")
public class ShipmentController {
    private static final Logger log = LoggerFactory.getLogger(ShipmentController.class);
    private final ShipmentService shipmentService;

    public ShipmentController(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }

    @GetMapping("/status/{orderId}")
    public Mono<ResponseEntity<ShipmentResponse>> getShipmentStatus(@PathVariable String orderId) {
        final String trimmedOrderId = orderId != null ? orderId.trim() : null;

        if (trimmedOrderId == null || trimmedOrderId.isEmpty()) {
            log.warn("Invalid orderId provided: '{}'", orderId);
            return Mono.just(ResponseEntity.badRequest().body(
                    new ShipmentResponse(null, null, null, "INVALID_INPUT", null, null)
            ));
        }

        return shipmentService.getShipmentStatus(trimmedOrderId)
                .map(this::mapToResponse)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build())
                .onErrorResume(ex -> {
                    log.error("Error retrieving shipment status for orderId {}: {}", trimmedOrderId, ex.getMessage());
                    return Mono.just(ResponseEntity.status(500).body(
                            new ShipmentResponse(trimmedOrderId, null, null, "ERROR", null, null)
                    ));
                });
    }

    @PostMapping("/create")
    public Mono<ResponseEntity<String>> createShipment(
            @RequestParam String orderId,
            @RequestParam String trackingNumber,
            @RequestParam String carrier) {

        final String trimmedOrderId = orderId != null ? orderId.trim() : null;
        final String trimmedTrackingNumber = trackingNumber != null ? trackingNumber.trim() : null;
        final String trimmedCarrier = carrier != null ? carrier.trim() : null;

        if (trimmedOrderId == null || trimmedOrderId.isEmpty() ||
                trimmedTrackingNumber == null || trimmedTrackingNumber.isEmpty() ||
                trimmedCarrier == null || trimmedCarrier.isEmpty()) {
            log.warn("Invalid input for createShipment: orderId='{}', trackingNumber='{}', carrier='{}'",
                    trimmedOrderId, trimmedTrackingNumber, trimmedCarrier);
            return Mono.just(ResponseEntity.badRequest().body(
                    "Order ID, tracking number, and carrier must not be null or empty"
            ));
        }

        return shipmentService.createShipment(trimmedOrderId, trimmedTrackingNumber, trimmedCarrier)
                .map(shipment -> ResponseEntity.ok(
                        "Shipment created for order: " + trimmedOrderId +
                                " with carrier: " + shipment.getCarrier() +
                                " and tracking number: " + shipment.getTrackingNumber()
                ))
                .onErrorResume(IllegalArgumentException.class, ex ->
                        Mono.just(ResponseEntity.badRequest().body(ex.getMessage())))
                .onErrorResume(ex -> {
                    log.error("Error creating shipment for orderId {}: {}", trimmedOrderId, ex.getMessage());
                    return Mono.just(ResponseEntity.status(500).body("Failed to create shipment: " + ex.getMessage()));
                });
    }

    private ShipmentResponse mapToResponse(Shipment shipment) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_LOCAL_DATE;
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        return new ShipmentResponse(
                shipment.getOrderId(),
                shipment.getTrackingNumber(),
                shipment.getCarrier(),
                shipment.getStatus(),
                shipment.getEstimatedDeliveryDate() != null ? shipment.getEstimatedDeliveryDate().format(dateFormatter) : null,
                shipment.getActualDeliveryDate() != null ? shipment.getActualDeliveryDate().format(dateTimeFormatter) : null
        );
    }
}

record ShipmentResponse(
        String orderId,
        String trackingNumber,
        String carrier,
        String status,
        String estimatedDeliveryDate,
        String actualDeliveryDate
) {}
