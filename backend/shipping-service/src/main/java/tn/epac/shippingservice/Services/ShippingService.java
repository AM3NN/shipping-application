package tn.epac.shippingservice.Services;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.epac.shippingservice.Entities.Shipping;
import tn.epac.shippingservice.Repository.ShippingRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShippingService implements IShippingService {

    private final ShippingRepository shippingRepository;

    @Override
    public Shipping createShipping(Shipping shipping) {
        return shippingRepository.save(shipping);
    }

    @Override
    public List<Shipping> getAllShippings() {
        return shippingRepository.findAll();
    }

    @Override
    public Optional<Shipping> getShippingById(String id) {
        return shippingRepository.findById(id);
    }

    @Override
    public Shipping updateShipping(String id, Shipping updatedShipping) {
        return shippingRepository.findById(id).map(existing -> {
            updatedShipping.setId(id); // pour s'assurer qu'on met à jour l'existant
            return shippingRepository.save(updatedShipping);
        }).orElseThrow(() -> new RuntimeException("Shipping not found with id: " + id));
    }

    @Override
    public void deleteShipping(String id) {
        shippingRepository.deleteById(id);
    }

    @Override
    public Shipping getShipmentStatus(String orderId) {
        return shippingRepository
                .findTopByOrderIdOrderByDeliveryDateDesc(orderId)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
    }


    @Override
    public List<Shipping> getShipmentHistory(String orderId) {
        return shippingRepository.findByOrderIdOrderByDeliveryDateDesc(orderId);
    }
}
