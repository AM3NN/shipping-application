package tn.epac.orderservice.dto;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class OrderResponseDTOTest {

    @Test
    void testGettersAndSetters() {
        OrderResponseDTO dto = getOrderResponseDTO();

        assertAll("Test getters and setters",
                () -> assertEquals(101, dto.getId()),
                () -> assertEquals("Shipped", dto.getStatus()),
                () -> assertEquals("Location A", dto.getDeliveryLocation()),
                () -> assertEquals(LocalDate.of(2025, 8, 4), dto.getCreatedDate()),
                () -> assertEquals(LocalDate.of(2025, 8, 10), dto.getExpectedDate()),
                () -> assertEquals(10, dto.getQuantity()),
                () -> assertEquals(new BigDecimal("150.00"), dto.getTotalAmount()),
                () -> assertEquals("USD", dto.getTotalCurrency()),
                () -> assertEquals(120.50, dto.getPredictedPrice()),
                () -> assertEquals("5 days", dto.getEstimatedFabricationTime()),
                () -> assertEquals(10.5, dto.getHeight()),
                () -> assertEquals(20.5, dto.getWidth()),
                () -> assertEquals(1.5, dto.getThickness()),
                () -> assertEquals(2.0, dto.getWeight()),
                () -> assertEquals("REF123", dto.getReference()),
                () -> assertEquals("Glossy", dto.getTextPaperType()),
                () -> assertEquals("Matte", dto.getCoverFinishType()),
                () -> assertEquals("Spiral", dto.getBindingType())
        );
    }

    private static OrderResponseDTO getOrderResponseDTO() {
        OrderResponseDTO dto = new OrderResponseDTO();

        dto.setId(101);
        dto.setStatus("Shipped");
        dto.setDeliveryLocation("Location A");
        dto.setCreatedDate(LocalDate.of(2025, 8, 4));
        dto.setExpectedDate(LocalDate.of(2025, 8, 10));
        dto.setQuantity(10);
        dto.setTotalAmount(new BigDecimal("150.00"));
        dto.setTotalCurrency("USD");
        dto.setPredictedPrice(120.50);
        dto.setEstimatedFabricationTime("5 days");
        dto.setHeight(10.5);
        dto.setWidth(20.5);
        dto.setThickness(1.5);
        dto.setWeight(2.0);
        dto.setReference("REF123");
        dto.setTextPaperType("Glossy");
        dto.setCoverFinishType("Matte");
        dto.setBindingType("Spiral");
        return dto;
    }
}
