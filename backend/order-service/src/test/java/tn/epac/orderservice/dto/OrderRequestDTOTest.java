package tn.epac.orderservice.dto;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class OrderRequestDTOTest {

    @Test
    void testGetterSetterAndLombokMethods() {
        OrderRequestDTO dto1 = new OrderRequestDTO();
        dto1.setStatus("CREATED");
        dto1.setShippingMethod("AIR");
        dto1.setShippingLocation("Factory");
        dto1.setDeliveryLocation("Client");
        dto1.setCreatedDate(LocalDate.now());
        dto1.setExpectedDate(LocalDate.now().plusDays(3));
        dto1.setClosedDate(null);
        dto1.setHeight(10.5);
        dto1.setWidth(8.2);
        dto1.setThickness(1.0);
        dto1.setWeight(0.75);
        dto1.setReference("ORD-001");
        dto1.setType("BOOK");
        dto1.setDirection("OUTGOING");
        dto1.setDomain("PUBLISHING");
        dto1.setQuantity(100);
        dto1.setTextPaperType("Glossy");
        dto1.setCoverFinishType("Matte");
        dto1.setBindingType("Spiral");

        dto1.setShippingCost(BigDecimal.valueOf(100));
        dto1.setShippingCurrency("USD");
        dto1.setDiscount(BigDecimal.valueOf(5));
        dto1.setDiscountCurrency("USD");
        dto1.setNetAmount(BigDecimal.valueOf(95));
        dto1.setNetCurrency("USD");
        dto1.setTax(BigDecimal.valueOf(10));
        dto1.setTaxCurrency("USD");
        dto1.setTotalAmount(BigDecimal.valueOf(105));
        dto1.setTotalCurrency("USD");
        dto1.setPredictedPrice(110.0);
        dto1.setEstimatedFabricationTime("5 days");

        OrderRequestDTO dto2 = new OrderRequestDTO();
        dto2.setStatus("CREATED");
        dto2.setShippingMethod("AIR");
        dto2.setShippingLocation("Factory");
        dto2.setDeliveryLocation("Client");
        dto2.setCreatedDate(dto1.getCreatedDate());
        dto2.setExpectedDate(dto1.getExpectedDate());
        dto2.setClosedDate(dto1.getClosedDate());
        dto2.setHeight(10.5);
        dto2.setWidth(8.2);
        dto2.setThickness(1.0);
        dto2.setWeight(0.75);
        dto2.setReference("ORD-001");
        dto2.setType("BOOK");
        dto2.setDirection("OUTGOING");
        dto2.setDomain("PUBLISHING");
        dto2.setQuantity(100);
        dto2.setTextPaperType("Glossy");
        dto2.setCoverFinishType("Matte");
        dto2.setBindingType("Spiral");

        dto2.setShippingCost(BigDecimal.valueOf(100));
        dto2.setShippingCurrency("USD");
        dto2.setDiscount(BigDecimal.valueOf(5));
        dto2.setDiscountCurrency("USD");
        dto2.setNetAmount(BigDecimal.valueOf(95));
        dto2.setNetCurrency("USD");
        dto2.setTax(BigDecimal.valueOf(10));
        dto2.setTaxCurrency("USD");
        dto2.setTotalAmount(BigDecimal.valueOf(105));
        dto2.setTotalCurrency("USD");
        dto2.setPredictedPrice(110.0);
        dto2.setEstimatedFabricationTime("5 days");

        // Assert getter works
        assertEquals("CREATED", dto1.getStatus());
        assertEquals("Client", dto1.getDeliveryLocation());

        // Lombok: equals and hashCode
        assertEquals(dto1, dto2);
        assertEquals(dto1.hashCode(), dto2.hashCode());

        // Lombok: toString
        assertTrue(dto1.toString().contains("CREATED"));
    }
}
