package tn.epac.orderservice.entities;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@JsonTest
class OrderTest {

    @Autowired
    private ObjectMapper objectMapper;

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
                () -> assertEquals(new BigDecimal("5.00"), order.getDiscount(), "Discount should match"),
                () -> assertEquals(new BigDecimal("200.00"), order.getNetAmount(), "Net amount should match"),
                () -> assertEquals(new BigDecimal("20.00"), order.getTax(), "Tax should match"),
                () -> assertEquals(new BigDecimal("265.00"), order.getTotalAmount(), "Total amount should match"),
                () -> assertEquals(123.45, order.getPredictedPrice(), "Predicted price should match"),
                () -> assertEquals("3 days", order.getEstimatedFabricationTime(), "Estimated fabrication time should match"),
                () -> assertAll("currency fields",
                        () -> assertEquals("USD", order.getShippingCurrency(), "Shipping currency should match"),
                        () -> assertEquals("USD", order.getDiscountCurrency(), "Discount currency should match"),
                        () -> assertEquals("USD", order.getNetCurrency(), "Net currency should match"),
                        () -> assertEquals("USD", order.getTaxCurrency(), "Tax currency should match"),
                        () -> assertEquals("USD", order.getTotalCurrency(), "Total currency should match")
                )
        );
    }

    @Test
    void testAllArgsConstructor() {
        Order order = new Order(
                123, "Pending", "Air", "Warehouse A", "Customer B",
                LocalDate.of(2025, 8, 4), LocalDate.of(2025, 8, 10), LocalDate.of(2025, 8, 12), 15,
                "Ref123", "Express", "Outbound", "Retail", 1L,
                new BigDecimal("50.00"), "USD", new BigDecimal("5.00"), "USD",
                new BigDecimal("200.00"), "USD", new BigDecimal("20.00"), "USD",
                new BigDecimal("265.00"), "USD", 123.45, "3 days"
        );
        assertAll("all-args constructor",
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
                () -> assertEquals("USD", order.getTotalCurrency(), "Total currency should match"),
                () -> assertEquals(123.45, order.getPredictedPrice(), "Predicted price should match"),
                () -> assertEquals("3 days", order.getEstimatedFabricationTime(), "Estimated fabrication time should match")
        );
    }

    @Test
    void testNoArgsConstructor() {
        Order order = new Order();
        assertAll("no-args constructor",
                () -> assertEquals(0, order.getId(), "ID should be 0"),
                () -> assertNull(order.getStatus(), "Status should be null"),
                () -> assertNull(order.getShippingMethod(), "Shipping method should be null"),
                () -> assertNull(order.getShippingLocation(), "Shipping location should be null"),
                () -> assertNull(order.getDeliveryLocation(), "Delivery location should be null"),
                () -> assertNull(order.getCreatedDate(), "Created date should be null"),
                () -> assertNull(order.getExpectedDate(), "Expected date should be null"),
                () -> assertNull(order.getClosedDate(), "Closed date should be null"),
                () -> assertNull(order.getQuantity(), "Quantity should be null"),
                () -> assertNull(order.getReference(), "Reference should be null"),
                () -> assertNull(order.getType(), "Type should be null"),
                () -> assertNull(order.getDirection(), "Direction should be null"),
                () -> assertNull(order.getDomain(), "Domain should be null"),
                () -> assertNull(order.getVersion(), "Version should be null"),
                () -> assertNull(order.getShippingCost(), "Shipping cost should be null"),
                () -> assertNull(order.getShippingCurrency(), "Shipping currency should be null"),
                () -> assertNull(order.getDiscount(), "Discount should be null"),
                () -> assertNull(order.getDiscountCurrency(), "Discount currency should be null"),
                () -> assertNull(order.getNetAmount(), "Net amount should be null"),
                () -> assertNull(order.getNetCurrency(), "Net currency should be null"),
                () -> assertNull(order.getTax(), "Tax should be null"),
                () -> assertNull(order.getTaxCurrency(), "Tax currency should be null"),
                () -> assertNull(order.getTotalAmount(), "Total amount should be null"),
                () -> assertNull(order.getTotalCurrency(), "Total currency should be null"),
                () -> assertEquals(0.0, order.getPredictedPrice(), "Predicted price should be 0.0"),
                () -> assertNull(order.getEstimatedFabricationTime(), "Estimated fabrication time should be null")
        );
    }

    @Test
    void testEqualsAndHashCodeAllFields() {
        Order order1 = getOrder();
        Order order2 = getOrder();
        Order order3 = getOrder();
        order3.setStatus("Different");
        order3.setTotalAmount(new BigDecimal("300.00"));

        assertEquals(order1, order2, "Orders with identical fields should be equal");
        assertEquals(order1.hashCode(), order2.hashCode(), "Hash codes should match for equal orders");

        assertNotEquals(order1, order3, "Orders with different fields should not be equal");
        assertNotEquals(order1.hashCode(), order3.hashCode(), "Hash codes should differ for different orders");

        assertNotEquals(null, order1, "Order should not equal null");
        assertNotEquals(new Object(), order1, "Order should not equal a different type");
    }

    @Test
    void testToStringFull() {
        Order order = getOrder();
        String result = order.toString();

        assertAll("toString full",
                () -> assertTrue(result.contains("id=123"), "toString should contain ID"),
                () -> assertTrue(result.contains("status='Pending'"), "toString should contain status"),
                () -> assertTrue(result.contains("shippingMethod='Air'"), "toString should contain shipping method"),
                () -> assertTrue(result.contains("shippingLocation='Warehouse A'"), "toString should contain shipping location"),
                () -> assertTrue(result.contains("deliveryLocation='Customer B'"), "toString should contain delivery location"),
                () -> assertTrue(result.contains("createdDate=2025-08-04"), "toString should contain created date"),
                () -> assertTrue(result.contains("expectedDate=2025-08-10"), "toString should contain expected date"),
                () -> assertTrue(result.contains("closedDate=2025-08-12"), "toString should contain closed date"),
                () -> assertTrue(result.contains("quantity=15"), "toString should contain quantity"),
                () -> assertTrue(result.contains("reference='Ref123'"), "toString should contain reference"),
                () -> assertTrue(result.contains("type='Express'"), "toString should contain type"),
                () -> assertTrue(result.contains("direction='Outbound'"), "toString should contain direction"),
                () -> assertTrue(result.contains("domain='Retail'"), "toString should contain domain"),
                () -> assertTrue(result.contains("version=1"), "toString should contain version"),
                () -> assertTrue(result.contains("shippingCost=50.00"), "toString should contain shipping cost"),
                () -> assertTrue(result.contains("shippingCurrency='USD'"), "toString should contain shipping currency"),
                () -> assertTrue(result.contains("discount=5.00"), "toString should contain discount"),
                () -> assertTrue(result.contains("discountCurrency='USD'"), "toString should contain discount currency"),
                () -> assertTrue(result.contains("netAmount=200.00"), "toString should contain net amount"),
                () -> assertTrue(result.contains("netCurrency='USD'"), "toString should contain net currency"),
                () -> assertTrue(result.contains("tax=20.00"), "toString should contain tax"),
                () -> assertTrue(result.contains("taxCurrency='USD'"), "toString should contain tax currency"),
                () -> assertTrue(result.contains("totalAmount=265.00"), "toString should contain total amount"),
                () -> assertTrue(result.contains("totalCurrency='USD'"), "toString should contain total currency"),
                () -> assertTrue(result.contains("predictedPrice=123.45"), "toString should contain predicted price"),
                () -> assertTrue(result.contains("estimatedFabricationTime='3 days'"), "toString should contain estimated fabrication time")
        );
    }

    @Test
    void testEdgeCases() {
        Order order = new Order();
        order.setQuantity(0);
        order.setShippingCost(new BigDecimal("0.00"));
        order.setPredictedPrice(-1.0);
        order.setVersion(0L);
        order.setTotalAmount(new BigDecimal("999999999.99"));

        assertAll("edge cases",
                () -> assertEquals(0, order.getQuantity(), "Quantity can be zero"),
                () -> assertEquals(new BigDecimal("0.00"), order.getShippingCost(), "Shipping cost can be zero"),
                () -> assertEquals(-1.0, order.getPredictedPrice(), "Predicted price can be negative"),
                () -> assertEquals(0L, order.getVersion(), "Version can be zero"),
                () -> assertEquals(new BigDecimal("999999999.99"), order.getTotalAmount(), "Large total amount should be handled")
        );
    }

    @Test
    void testNullInputs() {
        Order order = new Order();
        order.setStatus(null);
        order.setCreatedDate(null);
        order.setTotalAmount(null);
        order.setShippingCurrency(null);
        order.setQuantity(null);
        order.setVersion(null);

        assertAll("null inputs",
                () -> assertNull(order.getStatus(), "Status can be null"),
                () -> assertNull(order.getCreatedDate(), "Created date can be null"),
                () -> assertNull(order.getTotalAmount(), "Total amount can be null"),
                () -> assertNull(order.getShippingCurrency(), "Shipping currency can be null"),
                () -> assertNull(order.getQuantity(), "Quantity can be null"),
                () -> assertNull(order.getVersion(), "Version can be null")
        );
    }

    @Test
    void testJsonSerialization() throws Exception {
        Order order = getOrder();
        String json = objectMapper.writeValueAsString(order);
        Order deserialized = objectMapper.readValue(json, Order.class);

        assertAll("json serialization",
                () -> assertEquals(order.getId(), deserialized.getId(), "ID should match after deserialization"),
                () -> assertEquals(order.getStatus(), deserialized.getStatus(), "Status should match after deserialization"),
                () -> assertEquals(order.getTotalAmount(), deserialized.getTotalAmount(), "Total amount should match after deserialization"),
                () -> assertEquals(order.getPredictedPrice(), deserialized.getPredictedPrice(), "Predicted price should match after deserialization"),
                () -> assertEquals(order.getEstimatedFabricationTime(), deserialized.getEstimatedFabricationTime(), "Estimated fabrication time should match after deserialization")
        );
    }

    @Test
    void testJsonSerializationWithNulls() throws Exception {
        Order order = new Order();
        order.setId(123);
        order.setStatus("Pending");
        // Other fields remain null
        String json = objectMapper.writeValueAsString(order);
        Order deserialized = objectMapper.readValue(json, Order.class);

        assertAll("json serialization with nulls",
                () -> assertEquals(123, deserialized.getId(), "ID should match after deserialization"),
                () -> assertEquals("Pending", deserialized.getStatus(), "Status should match after deserialization"),
                () -> assertNull(deserialized.getTotalAmount(), "Total amount should be null after deserialization"),
                () -> assertEquals(0.0, deserialized.getPredictedPrice(), "Predicted price should be 0.0 after deserialization"),
                () -> assertNull(deserialized.getEstimatedFabricationTime(), "Estimated fabrication time should be null after deserialization")
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
}