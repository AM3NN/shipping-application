package tn.epac.ordervalidatorservice.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class InvalidOrderTest {

    @Test
    void getOrderId() {
        InvalidOrder order = new InvalidOrder();
        order.setOrderId("123");
        assertEquals("123", order.getOrderId());
    }

    @Test
    void getOriginalRow() {
        InvalidOrder order = new InvalidOrder();
        order.setOriginalRow("row data");
        assertEquals("row data", order.getOriginalRow());
    }

    @Test
    void getErrors() {
        InvalidOrder order = new InvalidOrder();
        List<String> errors = Arrays.asList("Error1", "Error2");
        order.setErrors(errors);
        assertEquals(errors, order.getErrors());
    }

    @Test
    void getRejectedAt() {
        InvalidOrder order = new InvalidOrder();
        LocalDateTime now = LocalDateTime.now();
        order.setRejectedAt(now);
        assertEquals(now, order.getRejectedAt());
    }

    @Test
    void setOrderId() {
        InvalidOrder order = new InvalidOrder();
        order.setOrderId("456");
        assertEquals("456", order.getOrderId());
    }

    @Test
    void setOriginalRow() {
        InvalidOrder order = new InvalidOrder();
        order.setOriginalRow("new row data");
        assertEquals("new row data", order.getOriginalRow());
    }

    @Test
    void setErrors() {
        InvalidOrder order = new InvalidOrder();
        List<String> errors = Arrays.asList("Error3", "Error4");
        order.setErrors(errors);
        assertEquals(errors, order.getErrors());
    }

    @Test
    void setRejectedAt() {
        InvalidOrder order = new InvalidOrder();
        LocalDateTime now = LocalDateTime.now();
        order.setRejectedAt(now);
        assertEquals(now, order.getRejectedAt());
    }

    @Test
    void testEquals() {
        InvalidOrder order1 = new InvalidOrder();
        order1.setOrderId("123");
        order1.setOriginalRow("row data");
        order1.setErrors(Arrays.asList("Error1"));
        order1.setRejectedAt(LocalDateTime.now());

        InvalidOrder order2 = new InvalidOrder();
        order2.setOrderId("123");
        order2.setOriginalRow("row data");
        order2.setErrors(Arrays.asList("Error1"));
        order2.setRejectedAt(order1.getRejectedAt());

        assertEquals(order1, order2);
        assertEquals(order1, order1);

        InvalidOrder order3 = new InvalidOrder();
        order3.setOrderId("456");
        assertNotEquals(order1, order3);
        assertNotEquals(order1, null);
        assertNotEquals(order1, new Object());
    }

    @Test
    void canEqual() {
        InvalidOrder order1 = new InvalidOrder();
        InvalidOrder order2 = new InvalidOrder();
        assertTrue(order1.canEqual(order2));
        assertTrue(order2.canEqual(order1));
        assertFalse(order1.canEqual(new Object()));
    }

    @Test
    void testHashCode() {
        InvalidOrder order1 = new InvalidOrder();
        order1.setOrderId("123");
        order1.setOriginalRow("row data");
        order1.setErrors(Arrays.asList("Error1"));
        order1.setRejectedAt(LocalDateTime.now());

        InvalidOrder order2 = new InvalidOrder();
        order2.setOrderId("123");
        order2.setOriginalRow("row data");
        order2.setErrors(Arrays.asList("Error1"));
        order2.setRejectedAt(order1.getRejectedAt());

        assertEquals(order1.hashCode(), order2.hashCode());
    }

    @Test
    void testToString() {
        InvalidOrder order = new InvalidOrder();
        order.setOrderId("123");
        order.setOriginalRow("row data");
        order.setErrors(Arrays.asList("Error1"));
        order.setRejectedAt(LocalDateTime.now());

        String toString = order.toString();
        assertTrue(toString.contains("orderId=123"));
        assertTrue(toString.contains("originalRow=row data"));
        assertTrue(toString.contains("errors=[Error1]"));
        assertTrue(toString.contains("rejectedAt="));
    }
}