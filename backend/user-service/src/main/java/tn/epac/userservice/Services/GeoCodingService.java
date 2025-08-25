package tn.epac.userservice.Services;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.UriUtils;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class GeoCodingService {

    private final RestTemplate restTemplate = new RestTemplate();

    public double[] geocodeAddress(String street, String city, String postalCode, String country) {
        String address = String.join(", ", street, city, postalCode, country);

        try {
            // Encodage de l'adresse pour éviter les caractères invalides
            String encodedAddress = UriUtils.encodeQueryParam(address, StandardCharsets.UTF_8);

            URI uri = UriComponentsBuilder
                    .fromHttpUrl("https://nominatim.openstreetmap.org/search")
                    .queryParam("q", encodedAddress)
                    .queryParam("format", "json")
                    .queryParam("addressdetails", 1)
                    .build(true) // encode correctement
                    .toUri();

            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.USER_AGENT, "MyAppName/1.0 (contact@example.com)");
            headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<Object[]> response = restTemplate.exchange(
                    uri, HttpMethod.GET, entity, Object[].class);

            if (response.getBody() != null && response.getBody().length > 0) {
                Map<?, ?> firstResult = (Map<?, ?>) response.getBody()[0];
                double lat = Double.parseDouble(firstResult.get("lat").toString());
                double lon = Double.parseDouble(firstResult.get("lon").toString());
                return new double[]{lat, lon};
            } else {
                System.out.println("Aucune coordonnée trouvée pour l'adresse : " + address);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new double[]{0, 0};
    }
}
