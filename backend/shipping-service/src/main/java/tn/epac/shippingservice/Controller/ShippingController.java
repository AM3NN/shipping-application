package tn.epac.shippingservice.Controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.epac.shippingservice.Entities.DHLTrackingResponse;
import tn.epac.shippingservice.Entities.Shipping;
import tn.epac.shippingservice.Repository.ShippingRepository;
import tn.epac.shippingservice.Services.DHLTrackingService;
import tn.epac.shippingservice.Services.IShippingService;

import java.util.List;
import java.util.Optional;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/shipping")
@RequiredArgsConstructor
public class ShippingController {

    private final IShippingService shippingService;
    private final ShippingRepository shippingRepository;
    private  final DHLTrackingService trackingService;

    @PostMapping
    public ResponseEntity<Shipping> createShipping(@RequestBody Shipping shipping) {
        return ResponseEntity.ok(shippingService.createShipping(shipping));
    }

    @GetMapping
    public ResponseEntity<List<Shipping>> getAllShippings() {
        return ResponseEntity.ok(shippingService.getAllShippings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shipping> getShippingById(@PathVariable String id) {
        return shippingService.getShippingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shipping> updateShipping(@PathVariable String id, @RequestBody Shipping shipping) {
        return ResponseEntity.ok(shippingService.updateShipping(id, shipping));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShipping(@PathVariable String id) {
        shippingService.deleteShipping(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/status/{orderId}")
    public ResponseEntity<Shipping> getShipmentStatus(@PathVariable String orderId) {
        Shipping shipment = shippingService.getShipmentStatus(orderId);
        return ResponseEntity.ok(shipment);
    }

    // GET /shipping/history/{orderId}
    @GetMapping("/history/{orderId}")
    public ResponseEntity<List<Shipping>> getShipmentHistory(@PathVariable String orderId) {
        List<Shipping> history = shippingService.getShipmentHistory(orderId);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/statusss/{orderId}")
    public ResponseEntity<?> getShippingStatus(@PathVariable String orderId) {
        Optional<Shipping> optional = shippingRepository.findByOrderId(orderId);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Shipping shipping = optional.get();

        DHLTrackingResponse response = trackingService.getTrackingInfo(shipping.getTrackingNumber());
        if (response.getShipments() != null && !response.getShipments().isEmpty()) {
            DHLTrackingResponse.Shipment dhlShipment = response.getShipments().get(0);
            shipping.setStatus(String.valueOf(dhlShipment.getStatus()));
            if (dhlShipment.getEstimatedTimeOfDelivery() != null) {
                shipping.setDeliveryDate(java.sql.Date.valueOf(dhlShipment.getEstimatedTimeOfDelivery()));
            }

            shippingRepository.save(shipping);
        }

        return ResponseEntity.ok(shipping);
    }
}