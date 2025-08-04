package tn.epac.orderservice.mappers;

import org.junit.jupiter.api.Test;
import tn.epac.orderservice.dto.OrderRequestDTO;
import tn.epac.orderservice.dto.OrderResponseDTO;
import tn.epac.orderservice.entities.Order;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class OrderMapperTest {

    @Test
    void toEntity() {
        OrderRequestDTO dto = new OrderRequestDTO();
        dto.setStatus("Pending");
        dto.setShippingMethod("Air");
        dto.setShippingLocation("Warehouse A");
        dto.setDeliveryLocation("Customer B");
        dto.setCreatedDate(LocalDate.of(2025, 8, 4));
        dto.setExpectedDate(LocalDate.of(2025, 8, 10));
        dto.setClosedDate(LocalDate.of(2025, 8, 15));
        dto.setReference("REF123");
        dto.setType("Standard");
        dto.setDirection("Outbound");
        dto.setDomain("Sales");
        dto.setShippingCost(new BigDecimal("15.00"));
        dto.setShippingCurrency("USD");
        dto.setDiscount(new BigDecimal("5.00"));
        dto.setDiscountCurrency("USD");
        dto.setNetAmount(new BigDecimal("100.00"));
        dto.setNetCurrency("USD");
        dto.setTax(new BigDecimal("20.00"));
        dto.setTaxCurrency("USD");
        dto.setTotalAmount(new BigDecimal("120.00"));
        dto.setTotalCurrency("USD");
        dto.setPredictedPrice(115.5);
        dto.setEstimatedFabricationTime("2 days");
        dto.setQuantity(10);

        Order order = OrderMapper.toEntity(dto);

        assertNotNull(order);
        assertEquals("Pending", order.getStatus());
        assertEquals("Air", order.getShippingMethod());
        assertEquals("Warehouse A", order.getShippingLocation());
        assertEquals("Customer B", order.getDeliveryLocation());
        assertEquals(LocalDate.of(2025, 8, 4), order.getCreatedDate());
        assertEquals(LocalDate.of(2025, 8, 10), order.getExpectedDate());
        assertEquals(LocalDate.of(2025, 8, 15), order.getClosedDate());
        assertEquals("REF123", order.getReference());
        assertEquals("Standard", order.getType());
        assertEquals("Outbound", order.getDirection());
        assertEquals("Sales", order.getDomain());
        assertEquals(new BigDecimal("15.00"), order.getShippingCost());
        assertEquals("USD", order.getShippingCurrency());
        assertEquals(new BigDecimal("5.00"), order.getDiscount());
        assertEquals("USD", order.getDiscountCurrency());
        assertEquals(new BigDecimal("100.00"), order.getNetAmount());
        assertEquals("USD", order.getNetCurrency());
        assertEquals(new BigDecimal("20.00"), order.getTax());
        assertEquals("USD", order.getTaxCurrency());
        assertEquals(new BigDecimal("120.00"), order.getTotalAmount());
        assertEquals("USD", order.getTotalCurrency());
        assertEquals(115.5, order.getPredictedPrice());
        assertEquals("2 days", order.getEstimatedFabricationTime());
        assertEquals(10, order.getQuantity());
    }
    @Test
    void constructor_shouldThrowException() throws Exception {
        Constructor<OrderMapper> constructor = OrderMapper.class.getDeclaredConstructor();
        constructor.setAccessible(true); // Make private constructor accessible

        try {
            constructor.newInstance();
            fail("Expected UnsupportedOperationException to be thrown");
        } catch (InvocationTargetException ex) {
            Throwable cause = ex.getCause();
            assertTrue(cause instanceof UnsupportedOperationException);
            assertEquals("OrderMapper is a utility class and cannot be instantiated", cause.getMessage());
        }
    }

    @Test
    void toDTO() {
        Order order = new Order();
        order.setId(123);
        order.setStatus("Completed");
        order.setDeliveryLocation("Customer B");
        order.setCreatedDate(LocalDate.of(2025, 7, 20));
        order.setTotalAmount(new BigDecimal("120.00"));
        order.setTotalCurrency("USD");
        order.setQuantity(5);
        order.setExpectedDate(LocalDate.of(2025, 7, 25));
        order.setPredictedPrice(110.0);
        order.setEstimatedFabricationTime("3 days");

        OrderResponseDTO dto = OrderMapper.toDTO(order);

        assertNotNull(dto);
        assertEquals(123, dto.getId()); // Now both sides are int
        assertEquals("Completed", dto.getStatus());
        assertEquals("Customer B", dto.getDeliveryLocation());
        assertEquals(LocalDate.of(2025, 7, 20), dto.getCreatedDate());
        assertEquals(new BigDecimal("120.00"), dto.getTotalAmount());
        assertEquals("USD", dto.getTotalCurrency());
        assertEquals(5, dto.getQuantity());
        assertEquals(LocalDate.of(2025, 7, 25), dto.getExpectedDate());
        assertEquals(110.0, dto.getPredictedPrice());
        assertEquals("3 days", dto.getEstimatedFabricationTime());
    }

}
