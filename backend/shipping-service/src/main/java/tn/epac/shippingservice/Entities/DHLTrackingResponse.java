package tn.epac.shippingservice.Entities;

import ch.qos.logback.core.status.Status;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DHLTrackingResponse {
    private List<Shipment> shipments;

    @Getter
    @Setter
    public static class Shipment {
        private String id;
        private Status status;
        private String estimatedTimeOfDelivery;
        private List<Event> events;

    }

    @Getter
    @Setter
    public static class Status {
        private String statusCode;
        private String description;
    }

    @Getter
    @Setter
    public static class Event {
        private String description;
        private String timestamp;
        private Location location;
    }

    @Getter
    @Setter
    public static class Location {
        private Address address;
    }

    @Getter
    @Setter
    public static class Address {
        private String addressLocality;
        private String postalCode;
        private String countryCode;
    }
}
