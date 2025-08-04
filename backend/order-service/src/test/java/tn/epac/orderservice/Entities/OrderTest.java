package tn.epac.orderservice.Entities;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class OrderTest {

    @Test
    void testGettersAndSetters() {
        Order order = new Order();

        order.setId("123");
        order.setStatus("Pending");
        order.setShippingMethod("Air");
        order.setShippingLocation("Warehouse A");
        order.setDeliveryLocation("Customer B");
        order.setCreatedDate(LocalDate.of(2025, 8, 4));
        order.setExpectedDate(LocalDate.of(2025, 8, 10));
        order.setClosedDate(LocalDate.of(2025, 8, 12));
        order.setQuantity(15);
        order.setReference("Ref123");
        order.setType("Express");
        order.setDirection("Outbound");
        order.setDomain("Retail");
        order.setVersion(1L);
        order.setShippingCost(new BigDecimal("50.00"));
        order.setShippingCurrency("USD");
        order.setDiscount(new BigDecimal("5.00"));
        order.setDiscountCurrency("USD");
        order.setNetAmount(new BigDecimal("200.00"));
        order.setNetCurrency("USD");
        order.setTax(new BigDecimal("20.00"));
        order.setTaxCurrency("USD");
        order.setTotalAmount(new BigDecimal("265.00"));
        order.setTotalCurrency("USD");
        order.setPredictedPrice(123.45);
        order.setEstimatedFabricationTime("3 days");

        assertEquals("123", order.getId());
        assertEquals("Pending", order.getStatus());
        assertEquals("Air", order.getShippingMethod());
        assertEquals("Warehouse A", order.getShippingLocation());
        assertEquals("Customer B", order.getDeliveryLocation());
        assertEquals(LocalDate.of(2025, 8, 4), order.getCreatedDate());
        assertEquals(LocalDate.of(2025, 8, 10), order.getExpectedDate());
        assertEquals(LocalDate.of(2025, 8, 12), order.getClosedDate());
        assertEquals(15, order.getQuantity());
        assertEquals("Ref123", order.getReference());
        assertEquals("Express", order.getType());
        assertEquals("Outbound", order.getDirection());
        assertEquals("Retail", order.getDomain());
        assertEquals(1, order.getVersion());
        assertEquals(new BigDecimal("50.00"), order.getShippingCost());
        assertEquals("USD", order.getShippingCurrency());
        assertEquals(new BigDecimal("5.00"), order.getDiscount());
        assertEquals("USD", order.getDiscountCurrency());
        assertEquals(new BigDecimal("200.00"), order.getNetAmount());
        assertEquals("USD", order.getNetCurrency());
        assertEquals(new BigDecimal("20.00"), order.getTax());
        assertEquals("USD", order.getTaxCurrency());
        assertEquals(new BigDecimal("265.00"), order.getTotalAmount());
        assertEquals("USD", order.getTotalCurrency());
        assertEquals(123.45, order.getPredictedPrice());
        assertEquals("3 days", order.getEstimatedFabricationTime());
    }

    @Test
    void testEqualsAndHashCode() {
        Order order1 = new Order();
        order1.setId("order1");

        Order order2 = new Order();
        order2.setId("order1");

        Order order3 = new Order();
        order3.setId("order3");

        // Assuming equals/hashCode are based on 'id'
        assertEquals(order1, order2);
        assertEquals(order1.hashCode(), order2.hashCode());

        assertNotEquals(order1, order3);
        assertNotEquals(order1.hashCode(), order3.hashCode());

        assertNotEquals(order1, null);
        assertNotEquals(order1, new Object());
    }

    @Test
    void testToString() {
        Order order = new Order();
        order.setId("id123");
        order.setStatus("Completed");

        String result = order.toString();

        assertTrue(result.contains("id123"));
        assertTrue(result.contains("Completed"));
    }
}
