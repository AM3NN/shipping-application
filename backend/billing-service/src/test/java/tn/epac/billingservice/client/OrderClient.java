package tn.epac.billingservice.client;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import tn.epac.billingservice.dto.OrderDto;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderClientTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private OrderClient orderClient;

    private OrderDto testOrder;
    private String authToken;

    @BeforeEach
    void setUp() {
        // Initialize OrderClient with mocked orderServiceUrl
        orderClient = new OrderClient(restTemplate, "http://localhost:8081");

        // Set up test OrderDto
        testOrder = new OrderDto();
        testOrder.setId(123);
        testOrder.setUserId("123e4567-e89b-12d3-a456-426614174000");
        testOrder.setStatus("Pending");
        testOrder.setTotalAmount(new BigDecimal("199.99"));
        testOrder.setQuantity(2);
        testOrder.setCreatedDate(LocalDate.now().minusDays(3));
        testOrder.setExpectedDate(LocalDate.now().plusDays(7));
        testOrder.setDeliveryLocation("Customer B");
        testOrder.setPredictedPrice(180.00);
        testOrder.setShippingMethod("Air");

        // Set up test auth token
        authToken = "test-token";
    }

    @Test
    void testGetOrderById_Success() {
        // Arrange
        when(restTemplate.exchange(
                eq("http://localhost:8081/orders/{id}"),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(OrderDto.class),
                eq("123")
        )).thenReturn(new ResponseEntity<>(testOrder, HttpStatus.OK));

        // Act
        OrderDto result = orderClient.getOrderById("123", authToken);

        // Assert
        assertNotNull(result);
        assertEquals(123, result.getId());
        assertEquals("123e4567-e89b-12d3-a456-426614174000", result.getUserId());
        assertEquals("Pending", result.getStatus());
        assertEquals(new BigDecimal("199.99"), result.getTotalAmount());
        assertEquals(2, result.getQuantity());
        assertEquals("Customer B", result.getDeliveryLocation());
        assertEquals(180.00, result.getPredictedPrice(), 0.01);
        assertEquals("Air", result.getShippingMethod());
    }

    @Test
    void testGetOrderById_NotFound() {
        // Arrange
        when(restTemplate.exchange(
                eq("http://localhost:8081/orders/{id}"),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(OrderDto.class),
                eq("123")
        )).thenThrow(new HttpClientErrorException(HttpStatus.NOT_FOUND));

        // Act
        OrderDto result = orderClient.getOrderById("123", authToken);

        // Assert
        assertNull(result);
    }

    @Test
    void testGetOrderById_ServerError() {
        // Arrange
        when(restTemplate.exchange(
                eq("http://localhost:8081/orders/{id}"),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(OrderDto.class),
                eq("123")
        )).thenThrow(new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Server Error"));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            orderClient.getOrderById("123", authToken);
        });
        assertTrue(exception.getMessage().contains("Failed to fetch order"));
        assertTrue(exception.getCause() instanceof HttpClientErrorException);
    }

    @Test
    void testGetOrderById_UnexpectedError() {
        // Arrange
        when(restTemplate.exchange(
                eq("http://localhost:8081/orders/{id}"),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(OrderDto.class),
                eq("123")
        )).thenThrow(new RuntimeException("Unexpected error"));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            orderClient.getOrderById("123", authToken);
        });
        assertTrue(exception.getMessage().contains("Unexpected error fetching order"));
        assertTrue(exception.getCause() instanceof RuntimeException);
    }
}