package tn.epac.orderservice.entities;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class OrderTest {

    @Test
    void testGettersAndSetters() {
        Order order = getOrder();
        assertAll("order properties",
                () -> assertEquals(123, order.getId(), "ID should match"),
                () -> assertEquals("Pending", order.getStatus(), "Status should match"),
                () -> assertEquals("Air", order.getShippingMethod(), "Shipping method should match"),
                () -> assertEquals("Warehouse A", order.getShippingLocation(), "Shipping location should match"),
                () -> assertEquals("Customer B", order.getDeliveryLocation(), "Delivery location should match"),
                () -> assertEquals(LocalDate.of(2025, 8, 4), order.getCreatedDate(), "Created date should match"),
                () -> assertEquals(LocalDate.of(2025, 8, 10), order.getExpectedDate(), "Expected date should match"),
                () -> assertEquals(LocalDate.of(2025, 8, 12), order.getClosedDate(), "Closed date should match"),
                () -> assertEquals(15, order.getQuantity(), "Quantity should match"),
                () -> assertEquals("Ref123", order.getReference(), "Reference should match"),
                () -> assertEquals("Express", order.getType(), "Type should match"),
                () -> assertEquals("Outbound", order.getDirection(), "Direction should match"),
                () -> assertEquals("Retail", order.getDomain(), "Domain should match"),
                () -> assertEquals(1L, order.getVersion(), "Version should match"),
                () -> assertEquals(new BigDecimal("50.00"), order.getShippingCost(), "Shipping cost should match"),
                () -> assertEquals("USD", order.getShippingCurrency(), "Shipping currency should match"),
                () -> assertEquals(new BigDecimal("5.00"), order.getDiscount(), "Discount should match"),
                () -> assertEquals("USD", order.getDiscountCurrency(), "Discount currency should match"),
                () -> assertEquals(new BigDecimal("200.00"), order.getNetAmount(), "Net amount should match"),
                () -> assertEquals("USD", order.getNetCurrency(), "Net currency should match"),
                () -> assertEquals(new BigDecimal("20.00"), order.getTax(), "Tax should match"),
                () -> assertEquals("USD", order.getTaxCurrency(), "Tax currency should match"),
                () -> assertEquals(new BigDecimal("265.00"), order.getTotalAmount(), "Total amount should match"),
                () -> assertEquals(123.45, order.getPredictedPrice(), "Predicted price should match")
        );
    }

    private static Order getOrder() {
        Order order = new Order();
        order.setId(123);
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
        return order;
    }

    @Test
    void testEqualsAndHashCode() {
        Order order1 = new Order();
        order1.setId(1);

        Order order2 = new Order();
        order2.setId(1);

        Order order3 = new Order();
        order3.setId(3);

        // Assuming equals/hashCode are based on 'id'
        assertEquals(order1, order2, "Orders with same ID should be equal");
        assertEquals(order1.hashCode(), order2.hashCode(), "Hash codes should match for equal orders");

        assertNotEquals(order1, order3, "Orders with different IDs should not be equal");
        assertNotEquals(order1.hashCode(), order3.hashCode(), "Hash codes should differ for different orders");

        assertNotEquals(null, order1, "Order should not equal null");
        assertNotEquals(new Object(), order1, "Order should not equal a different type");
    }

    @Test
    void testToString() {
        Order order = new Order();
        order.setId(123);
        order.setStatus("Completed");

        String result = order.toString();

        assertTrue(result.contains("id=123"), "toString should contain ID");
        assertTrue(result.contains("Completed"), "toString should contain status");
    }
}