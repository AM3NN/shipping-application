package tn.epac.orderservice.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import tn.epac.orderservice.entities.Order;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataMongoTest
class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;
    @Test
    void testSaveAndFindById() {
        // Arrange
        Order order = new Order();
        order.setId(1);
        order.setStatus("PROCESSING");
        order.setShippingMethod("STANDARD");
        order.setShippingLocation("Warehouse A");
        order.setDeliveryLocation("Customer B");
        order.setCreatedDate(LocalDate.now());
        order.setQuantity(10);
        order.setReference("REF123");
        order.setType("SALE");
        order.setDirection("OUTBOUND");
        order.setDomain("RETAIL");
        order.setVersion(1L);
        order.setShippingCost(new BigDecimal("15.00"));
        order.setShippingCurrency("USD");
        order.setTotalAmount(new BigDecimal("100.00"));
        order.setTotalCurrency("USD");
        order.setPredictedPrice(95.50);
        order.setEstimatedFabricationTime("2 days");
        // Act
        Order savedOrder = orderRepository.save(order);
        Optional<Order> foundOrder = orderRepository.findById(1);
        // Assert
        assertNotNull(savedOrder);
        assertTrue(foundOrder.isPresent());
        assertEquals(1, foundOrder.get().getId());
        assertEquals("PROCESSING", foundOrder.get().getStatus());
        assertEquals("REF123", foundOrder.get().getReference());
        assertEquals(new BigDecimal("100.00"), foundOrder.get().getTotalAmount());
    }
    @Test
    void testUpdateOrder() {
        // Arrange
        Order order = new Order();
        order.setId(1);
        order.setStatus("PROCESSING");
        order.setTotalAmount(new BigDecimal("100.00"));
        orderRepository.save(order);

        // Act
        Optional<Order> foundOrder = orderRepository.findById(1);
        assertTrue(foundOrder.isPresent());
        Order orderToUpdate = foundOrder.get();
        orderToUpdate.setStatus("SHIPPED");
        orderToUpdate.setTotalAmount(new BigDecimal("150.00"));
        Order updatedOrder = orderRepository.save(orderToUpdate);

        // Assert
        assertNotNull(updatedOrder);
        assertEquals(1, updatedOrder.getId());
        assertEquals("SHIPPED", updatedOrder.getStatus());
        assertEquals(new BigDecimal("150.00"), updatedOrder.getTotalAmount());
    }

    @Test
    void testDeleteOrder() {
        // Arrange
        Order order = new Order();
        order.setId(1);
        order.setStatus("PROCESSING");
        orderRepository.save(order);

        // Act
        orderRepository.deleteById(1);
        Optional<Order> deletedOrder = orderRepository.findById(1);

        // Assert
        assertFalse(deletedOrder.isPresent());
    }
}