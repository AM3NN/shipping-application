package tn.epac.ordervalidatorservice.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import tn.epac.ordervalidatorservice.model.ValidOrder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
class ValidOrderRepositoryTest {

    @Autowired
    private ValidOrderRepository repository;

    @Test
    void save() {
        ValidOrder order = new ValidOrder();
        order.setOrderId("123");
        order.setOrderNum("ORD-001");
        order.setExpectedDate(LocalDate.of(2025, 8, 25));
        order.setReceptionDate(LocalDateTime.of(2025, 8, 25, 10, 0));
        order.setQuantity(100);
        order.setThickness(1.5);
        order.setUnitPrice(new BigDecimal("29.99"));

        ValidOrder savedOrder = repository.save(order);

        assertNotNull(savedOrder);
        assertEquals("123", savedOrder.getOrderId());
        assertEquals("ORD-001", savedOrder.getOrderNum());
        assertEquals(LocalDate.of(2025, 8, 25), savedOrder.getExpectedDate());
        assertEquals(LocalDateTime.of(2025, 8, 25, 10, 0), savedOrder.getReceptionDate());
        assertEquals(100, savedOrder.getQuantity());
        assertEquals(1.5, savedOrder.getThickness());
        assertEquals(new BigDecimal("29.99"), savedOrder.getUnitPrice());
    }

    @Test
    void findById() {
        ValidOrder order = new ValidOrder();
        order.setOrderId("123");
        order.setOrderNum("ORD-001");
        order.setExpectedDate(LocalDate.of(2025, 8, 25));
        order.setReceptionDate(LocalDateTime.of(2025, 8, 25, 10, 0));
        order.setQuantity(100);
        order.setThickness(1.5);
        order.setUnitPrice(new BigDecimal("29.99"));
        repository.save(order);

        Optional<ValidOrder> foundOrder = repository.findById("123");

        assertTrue(foundOrder.isPresent());
        assertEquals("123", foundOrder.get().getOrderId());
        assertEquals("ORD-001", foundOrder.get().getOrderNum());
        assertEquals(LocalDate.of(2025, 8, 25), foundOrder.get().getExpectedDate());
        assertEquals(LocalDateTime.of(2025, 8, 25, 10, 0), foundOrder.get().getReceptionDate());
        assertEquals(100, foundOrder.get().getQuantity());
        assertEquals(1.5, foundOrder.get().getThickness());
        assertEquals(new BigDecimal("29.99"), foundOrder.get().getUnitPrice());

        Optional<ValidOrder> notFoundOrder = repository.findById("999");
        assertFalse(notFoundOrder.isPresent());
    }

    @Test
    void findAll() {
        ValidOrder order1 = new ValidOrder();
        order1.setOrderId("123");
        order1.setOrderNum("ORD-001");
        order1.setExpectedDate(LocalDate.of(2025, 8, 25));
        order1.setQuantity(100);
        order1.setUnitPrice(new BigDecimal("29.99"));

        ValidOrder order2 = new ValidOrder();
        order2.setOrderId("456");
        order2.setOrderNum("ORD-002");
        order2.setExpectedDate(LocalDate.of(2025, 8, 26));
        order2.setQuantity(200);
        order2.setUnitPrice(new BigDecimal("49.99"));

        repository.saveAll(Arrays.asList(order1, order2));

        List<ValidOrder> orders = repository.findAll();

        assertEquals(2, orders.size());
        assertTrue(orders.stream().anyMatch(o -> o.getOrderId().equals("123")));
        assertTrue(orders.stream().anyMatch(o -> o.getOrderId().equals("456")));
    }

    @Test
    void deleteById() {
        ValidOrder order = new ValidOrder();
        order.setOrderId("123");
        order.setOrderNum("ORD-001");
        order.setExpectedDate(LocalDate.of(2025, 8, 25));
        order.setQuantity(100);
        order.setUnitPrice(new BigDecimal("29.99"));
        repository.save(order);

        repository.deleteById("123");

        Optional<ValidOrder> deletedOrder = repository.findById("123");
        assertFalse(deletedOrder.isPresent());
    }
}