package tn.epac.ordervalidatorservice.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import tn.epac.ordervalidatorservice.model.InvalidOrder;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
class InvalidOrderRepositoryTest {

    @Autowired
    private InvalidOrderRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @BeforeEach
    void setUp() {
        // Clean the database before each test
        repository.deleteAll();
    }

    @Test
    void save() {
        InvalidOrder order = new InvalidOrder();
        order.setOrderId("123");
        order.setOriginalRow("row data");
        order.setErrors(Arrays.asList("Error1", "Error2"));
        order.setRejectedAt(LocalDateTime.of(2025, 8, 25, 10, 0));

        InvalidOrder savedOrder = repository.save(order);

        assertNotNull(savedOrder);
        assertEquals("123", savedOrder.getOrderId());
        assertEquals("row data", savedOrder.getOriginalRow());
        assertEquals(Arrays.asList("Error1", "Error2"), savedOrder.getErrors());
        assertEquals(LocalDateTime.of(2025, 8, 25, 10, 0), savedOrder.getRejectedAt());
    }

    @Test
    void findById() {
        InvalidOrder order = new InvalidOrder();
        order.setOrderId("123");
        order.setOriginalRow("row data");
        order.setErrors(Arrays.asList("Error1"));
        order.setRejectedAt(LocalDateTime.of(2025, 8, 25, 10, 0));
        repository.save(order);

        Optional<InvalidOrder> foundOrder = repository.findById("123");
        assertTrue(foundOrder.isPresent());
        assertEquals("123", foundOrder.get().getOrderId());
        assertEquals("row data", foundOrder.get().getOriginalRow());
        assertEquals(Arrays.asList("Error1"), foundOrder.get().getErrors());
        assertEquals(LocalDateTime.of(2025, 8, 25, 10, 0), foundOrder.get().getRejectedAt());

        Optional<InvalidOrder> notFoundOrder = repository.findById("999");
        assertFalse(notFoundOrder.isPresent());
    }

    @Test
    void findAll() {
        InvalidOrder order1 = new InvalidOrder();
        order1.setOrderId("123");
        order1.setOriginalRow("row data 1");
        order1.setErrors(Arrays.asList("Error1"));
        order1.setRejectedAt(LocalDateTime.of(2025, 8, 25, 10, 0));

        InvalidOrder order2 = new InvalidOrder();
        order2.setOrderId("456");
        order2.setOriginalRow("row data 2");
        order2.setErrors(Arrays.asList("Error2"));
        order2.setRejectedAt(LocalDateTime.of(2025, 8, 25, 11, 0));

        repository.saveAll(Arrays.asList(order1, order2));

        List<InvalidOrder> orders = repository.findAll();

        assertEquals(2, orders.size());
        assertTrue(orders.stream().anyMatch(o -> o.getOrderId().equals("123")));
        assertTrue(orders.stream().anyMatch(o -> o.getOrderId().equals("456")));
    }

    @Test
    void deleteById() {
        InvalidOrder order = new InvalidOrder();
        order.setOrderId("123");
        order.setOriginalRow("row data");
        order.setErrors(Arrays.asList("Error1"));
        order.setRejectedAt(LocalDateTime.of(2025, 8, 25, 10, 0));
        repository.save(order);

        repository.deleteById("123");

        Optional<InvalidOrder> deletedOrder = repository.findById("123");
        assertFalse(deletedOrder.isPresent());
    }
}