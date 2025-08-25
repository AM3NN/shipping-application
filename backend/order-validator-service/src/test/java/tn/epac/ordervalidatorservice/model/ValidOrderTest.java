package tn.epac.ordervalidatorservice.model;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class ValidOrderTest {

    @Test
    void getOrderId() {
        ValidOrder order = new ValidOrder();
        order.setOrderId("123");
        assertEquals("123", order.getOrderId());
    }

    @Test
    void getOrderNum() {
        ValidOrder order = new ValidOrder();
        order.setOrderNum("ORD-001");
        assertEquals("ORD-001", order.getOrderNum());
    }

    @Test
    void getExpectedDate() {
        ValidOrder order = new ValidOrder();
        LocalDate date = LocalDate.of(2025, 8, 25);
        order.setExpectedDate(date);
        assertEquals(date, order.getExpectedDate());
    }

    @Test
    void getReceptionDate() {
        ValidOrder order = new ValidOrder();
        LocalDateTime dateTime = LocalDateTime.of(2025, 8, 25, 10, 10);
        order.setReceptionDate(dateTime);
        assertEquals(dateTime, order.getReceptionDate());
    }

    @Test
    void getDeliveryDate() {
        ValidOrder order = new ValidOrder();
        LocalDateTime dateTime = LocalDateTime.of(2025, 8, 26, 10, 10);
        order.setDeliveryDate(dateTime);
        assertEquals(dateTime, order.getDeliveryDate());
    }

    @Test
    void getQuantity() {
        ValidOrder order = new ValidOrder();
        order.setQuantity(100);
        assertEquals(100, order.getQuantity());
    }

    @Test
    void getQtyMin() {
        ValidOrder order = new ValidOrder();
        order.setQtyMin(50);
        assertEquals(50, order.getQtyMin());
    }

    @Test
    void getQtyMax() {
        ValidOrder order = new ValidOrder();
        order.setQtyMax(200);
        assertEquals(200, order.getQtyMax());
    }

    @Test
    void getQtyProduced() {
        ValidOrder order = new ValidOrder();
        order.setQtyProduced(80);
        assertEquals(80, order.getQtyProduced());
    }

    @Test
    void getQtyDelivered() {
        ValidOrder order = new ValidOrder();
        order.setQtyDelivered(75);
        assertEquals(75, order.getQtyDelivered());
    }

    @Test
    void getPriorityLevel() {
        ValidOrder order = new ValidOrder();
        order.setPriorityLevel("High");
        assertEquals("High", order.getPriorityLevel());
    }

    @Test
    void getOrderStatus() {
        ValidOrder order = new ValidOrder();
        order.setOrderStatus("Confirmed");
        assertEquals("Confirmed", order.getOrderStatus());
    }

    @Test
    void getPartId() {
        ValidOrder order = new ValidOrder();
        order.setPartId("PART-001");
        assertEquals("PART-001", order.getPartId());
    }

    @Test
    void getIsbn13() {
        ValidOrder order = new ValidOrder();
        order.setIsbn13("9781234567890");
        assertEquals("9781234567890", order.getIsbn13());
    }

    @Test
    void getTitle() {
        ValidOrder order = new ValidOrder();
        order.setTitle("Book Title");
        assertEquals("Book Title", order.getTitle());
    }

    @Test
    void getBindingType() {
        ValidOrder order = new ValidOrder();
        order.setBindingType("Hardcover");
        assertEquals("Hardcover", order.getBindingType());
    }

    @Test
    void getPartStatus() {
        ValidOrder order = new ValidOrder();
        order.setPartStatus("In Production");
        assertEquals("In Production", order.getPartStatus());
    }

    @Test
    void getSecurityLabel() {
        ValidOrder order = new ValidOrder();
        order.setSecurityLabel("Secure");
        assertEquals("Secure", order.getSecurityLabel());
    }

    @Test
    void getShrinkwrap() {
        ValidOrder order = new ValidOrder();
        order.setShrinkwrap(1);
        assertEquals(1, order.getShrinkwrap());
    }

    @Test
    void getThreeHoleDrill() {
        ValidOrder order = new ValidOrder();
        order.setThreeHoleDrill(0);
        assertEquals(0, order.getThreeHoleDrill());
    }

    @Test
    void getPerf() {
        ValidOrder order = new ValidOrder();
        order.setPerf(2);
        assertEquals(2, order.getPerf());
    }

    @Test
    void getProductionPage() {
        ValidOrder order = new ValidOrder();
        order.setProductionPage(300);
        assertEquals(300, order.getProductionPage());
    }

    @Test
    void getThickness() {
        ValidOrder order = new ValidOrder();
        order.setThickness(1.5);
        assertEquals(1.5, order.getThickness());
    }

    @Test
    void getHeight() {
        ValidOrder order = new ValidOrder();
        order.setHeight(9.0);
        assertEquals(9.0, order.getHeight());
    }

    @Test
    void getWidth() {
        ValidOrder order = new ValidOrder();
        order.setWidth(6.0);
        assertEquals(6.0, order.getWidth());
    }

    @Test
    void getWeight() {
        ValidOrder order = new ValidOrder();
        order.setWeight(2.0);
        assertEquals(2.0, order.getWeight());
    }

    @Test
    void getTextPaperType() {
        ValidOrder order = new ValidOrder();
        order.setTextPaperType("Glossy");
        assertEquals("Glossy", order.getTextPaperType());
    }

    @Test
    void getCoverFinishType() {
        ValidOrder order = new ValidOrder();
        order.setCoverFinishType("Matte");
        assertEquals("Matte", order.getCoverFinishType());
    }

    @Test
    void getTextColor() {
        ValidOrder order = new ValidOrder();
        order.setTextColor("Black");
        assertEquals("Black", order.getTextColor());
    }

    @Test
    void getSiren() {
        ValidOrder order = new ValidOrder();
        order.setSiren("SIREN123");
        assertEquals("SIREN123", order.getSiren());
    }

    @Test
    void getUnitPrice() {
        ValidOrder order = new ValidOrder();
        order.setUnitPrice(new BigDecimal("29.99"));
        assertEquals(new BigDecimal("29.99"), order.getUnitPrice());
    }

    @Test
    void setOrderId() {
        ValidOrder order = new ValidOrder();
        order.setOrderId("456");
        assertEquals("456", order.getOrderId());
    }

    @Test
    void setOrderNum() {
        ValidOrder order = new ValidOrder();
        order.setOrderNum("ORD-002");
        assertEquals("ORD-002", order.getOrderNum());
    }

    @Test
    void setExpectedDate() {
        ValidOrder order = new ValidOrder();
        LocalDate date = LocalDate.of(2025, 8, 26);
        order.setExpectedDate(date);
        assertEquals(date, order.getExpectedDate());
    }

    @Test
    void setReceptionDate() {
        ValidOrder order = new ValidOrder();
        LocalDateTime dateTime = LocalDateTime.of(2025, 8, 25, 12, 0);
        order.setReceptionDate(dateTime);
        assertEquals(dateTime, order.getReceptionDate());
    }

    @Test
    void setDeliveryDate() {
        ValidOrder order = new ValidOrder();
        LocalDateTime dateTime = LocalDateTime.of(2025, 8, 27, 12, 0);
        order.setDeliveryDate(dateTime);
        assertEquals(dateTime, order.getDeliveryDate());
    }

    @Test
    void setQuantity() {
        ValidOrder order = new ValidOrder();
        order.setQuantity(200);
        assertEquals(200, order.getQuantity());
    }

    @Test
    void setQtyMin() {
        ValidOrder order = new ValidOrder();
        order.setQtyMin(100);
        assertEquals(100, order.getQtyMin());
    }

    @Test
    void setQtyMax() {
        ValidOrder order = new ValidOrder();
        order.setQtyMax(300);
        assertEquals(300, order.getQtyMax());
    }

    @Test
    void setQtyProduced() {
        ValidOrder order = new ValidOrder();
        order.setQtyProduced(150);
        assertEquals(150, order.getQtyProduced());
    }

    @Test
    void setQtyDelivered() {
        ValidOrder order = new ValidOrder();
        order.setQtyDelivered(120);
        assertEquals(120, order.getQtyDelivered());
    }

    @Test
    void setPriorityLevel() {
        ValidOrder order = new ValidOrder();
        order.setPriorityLevel("Low");
        assertEquals("Low", order.getPriorityLevel());
    }

    @Test
    void setOrderStatus() {
        ValidOrder order = new ValidOrder();
        order.setOrderStatus("Pending");
        assertEquals("Pending", order.getOrderStatus());
    }

    @Test
    void setPartId() {
        ValidOrder order = new ValidOrder();
        order.setPartId("PART-002");
        assertEquals("PART-002", order.getPartId());
    }

    @Test
    void setIsbn13() {
        ValidOrder order = new ValidOrder();
        order.setIsbn13("9780987654321");
        assertEquals("9780987654321", order.getIsbn13());
    }

    @Test
    void setTitle() {
        ValidOrder order = new ValidOrder();
        order.setTitle("Another Book");
        assertEquals("Another Book", order.getTitle());
    }

    @Test
    void setBindingType() {
        ValidOrder order = new ValidOrder();
        order.setBindingType("Paperback");
        assertEquals("Paperback", order.getBindingType());
    }

    @Test
    void setPartStatus() {
        ValidOrder order = new ValidOrder();
        order.setPartStatus("Completed");
        assertEquals("Completed", order.getPartStatus());
    }

    @Test
    void setSecurityLabel() {
        ValidOrder order = new ValidOrder();
        order.setSecurityLabel("Non-Secure");
        assertEquals("Non-Secure", order.getSecurityLabel());
    }

    @Test
    void setShrinkwrap() {
        ValidOrder order = new ValidOrder();
        order.setShrinkwrap(0);
        assertEquals(0, order.getShrinkwrap());
    }

    @Test
    void setThreeHoleDrill() {
        ValidOrder order = new ValidOrder();
        order.setThreeHoleDrill(1);
        assertEquals(1, order.getThreeHoleDrill());
    }

    @Test
    void setPerf() {
        ValidOrder order = new ValidOrder();
        order.setPerf(3);
        assertEquals(3, order.getPerf());
    }

    @Test
    void setProductionPage() {
        ValidOrder order = new ValidOrder();
        order.setProductionPage(400);
        assertEquals(400, order.getProductionPage());
    }

    @Test
    void setThickness() {
        ValidOrder order = new ValidOrder();
        order.setThickness(2.0);
        assertEquals(2.0, order.getThickness());
    }

    @Test
    void setHeight() {
        ValidOrder order = new ValidOrder();
        order.setHeight(10.0);
        assertEquals(10.0, order.getHeight());
    }

    @Test
    void setWidth() {
        ValidOrder order = new ValidOrder();
        order.setWidth(7.0);
        assertEquals(7.0, order.getWidth());
    }

    @Test
    void setWeight() {
        ValidOrder order = new ValidOrder();
        order.setWeight(3.0);
        assertEquals(3.0, order.getWeight());
    }

    @Test
    void setTextPaperType() {
        ValidOrder order = new ValidOrder();
        order.setTextPaperType("Matte");
        assertEquals("Matte", order.getTextPaperType());
    }

    @Test
    void setCoverFinishType() {
        ValidOrder order = new ValidOrder();
        order.setCoverFinishType("Glossy");
        assertEquals("Glossy", order.getCoverFinishType());
    }

    @Test
    void setTextColor() {
        ValidOrder order = new ValidOrder();
        order.setTextColor("Blue");
        assertEquals("Blue", order.getTextColor());
    }

    @Test
    void setSiren() {
        ValidOrder order = new ValidOrder();
        order.setSiren("SIREN456");
        assertEquals("SIREN456", order.getSiren());
    }

    @Test
    void setUnitPrice() {
        ValidOrder order = new ValidOrder();
        order.setUnitPrice(new BigDecimal("49.99"));
        assertEquals(new BigDecimal("49.99"), order.getUnitPrice());
    }

    @Test
    void testEquals() {
        ValidOrder order1 = new ValidOrder();
        order1.setOrderId("123");
        order1.setOrderNum("ORD-001");
        order1.setExpectedDate(LocalDate.of(2025, 8, 25));
        order1.setQuantity(100);
        order1.setThickness(1.5);
        order1.setUnitPrice(new BigDecimal("29.99"));

        ValidOrder order2 = new ValidOrder();
        order2.setOrderId("123");
        order2.setOrderNum("ORD-001");
        order2.setExpectedDate(LocalDate.of(2025, 8, 25));
        order2.setQuantity(100);
        order2.setThickness(1.5);
        order2.setUnitPrice(new BigDecimal("29.99"));

        assertEquals(order1, order2);
        assertEquals(order1, order1);

        ValidOrder order3 = new ValidOrder();
        order3.setOrderId("456");
        assertNotEquals(order3, order1);
        assertNotNull(order1);
        assertNotEquals(new Object(), order1);
    }

    @Test
    void canEqual() {
        ValidOrder order1 = new ValidOrder();
        ValidOrder order2 = new ValidOrder();
        assertTrue(order1.canEqual(order2));
        assertTrue(order2.canEqual(order1));
        assertFalse(order1.canEqual(new Object()));
    }

    @Test
    void testHashCode() {
        ValidOrder order1 = new ValidOrder();
        order1.setOrderId("123");
        order1.setOrderNum("ORD-001");
        order1.setExpectedDate(LocalDate.of(2025, 8, 25));
        order1.setQuantity(100);
        order1.setThickness(1.5);
        order1.setUnitPrice(new BigDecimal("29.99"));

        ValidOrder order2 = new ValidOrder();
        order2.setOrderId("123");
        order2.setOrderNum("ORD-001");
        order2.setExpectedDate(LocalDate.of(2025, 8, 25));
        order2.setQuantity(100);
        order2.setThickness(1.5);
        order2.setUnitPrice(new BigDecimal("29.99"));

        assertEquals(order1.hashCode(), order2.hashCode());
    }

    @Test
    void testToString() {
        ValidOrder order = new ValidOrder();
        order.setOrderId("123");
        order.setOrderNum("ORD-001");
        order.setExpectedDate(LocalDate.of(2025, 8, 25));
        order.setQuantity(100);
        order.setThickness(1.5);
        order.setUnitPrice(new BigDecimal("29.99"));

        String toString = order.toString();
        assertTrue(toString.contains("orderId=123"));
        assertTrue(toString.contains("orderNum=ORD-001"));
        assertTrue(toString.contains("expectedDate=2025-08-25"));
        assertTrue(toString.contains("quantity=100"));
        assertTrue(toString.contains("thickness=1.5"));
        assertTrue(toString.contains("unitPrice=29.99"));
    }
}