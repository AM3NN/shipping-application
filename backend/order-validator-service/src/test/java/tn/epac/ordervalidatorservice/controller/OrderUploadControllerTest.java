package tn.epac.ordervalidatorservice.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tn.epac.ordervalidatorservice.model.InvalidOrder;
import tn.epac.ordervalidatorservice.model.ValidOrder;
import tn.epac.ordervalidatorservice.repository.InvalidOrderRepository;
import tn.epac.ordervalidatorservice.repository.ValidOrderRepository;
import tn.epac.ordervalidatorservice.service.OrderValidationService;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OrderUploadControllerTest {

    @Mock
    private OrderValidationService validationService;

    @Mock
    private ValidOrderRepository validRepo;

    @Mock
    private InvalidOrderRepository invalidRepo;

    @InjectMocks
    private OrderUploadController controller;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void scrapeOrders_successWithAuthToken() throws IOException {
        String authHeader = "Bearer test-token";
        doNothing().when(validationService).scrapeAndProcessOrders("test-token");
        ResponseEntity<String> response = controller.scrapeOrders(authHeader);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Orders scraped and processed successfully.", response.getBody());
        verify(validationService, times(1)).scrapeAndProcessOrders("test-token");
    }

    @Test
    void scrapeOrders_successWithoutAuthToken() throws IOException {
        doNothing().when(validationService).scrapeAndProcessOrders(null);
        ResponseEntity<String> response = controller.scrapeOrders(null);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Orders scraped and processed successfully.", response.getBody());
        verify(validationService, times(1)).scrapeAndProcessOrders(null);
    }

    @Test
    void scrapeOrders_ioException() throws IOException {
        String authHeader = "Bearer test-token";
        doThrow(new IOException("Network error")).when(validationService).scrapeAndProcessOrders("test-token");
        ResponseEntity<String> response = controller.scrapeOrders(authHeader);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Error scraping orders: Network error", response.getBody());
        verify(validationService, times(1)).scrapeAndProcessOrders("test-token");
    }

    @Test
    void scrapeOrders_illegalArgumentException() throws IOException {
        String authHeader = "Bearer test-token";
        doThrow(new IllegalArgumentException("Invalid token")).when(validationService).scrapeAndProcessOrders("test-token");
        ResponseEntity<String> response = controller.scrapeOrders(authHeader);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid request: Invalid token", response.getBody());
        verify(validationService, times(1)).scrapeAndProcessOrders("test-token");
    }

    @Test
    void getValidOrders() {
        ValidOrder order1 = new ValidOrder();
        ValidOrder order2 = new ValidOrder();
        List<ValidOrder> orders = Arrays.asList(order1, order2);
        when(validRepo.findAll()).thenReturn(orders);
        ResponseEntity<List<ValidOrder>> response = controller.getValidOrders();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(orders, response.getBody());
        assertEquals(2, response.getBody().size());
        verify(validRepo, times(1)).findAll();
    }

    @Test
    void getInvalidOrders() {
        InvalidOrder order1 = new InvalidOrder();
        InvalidOrder order2 = new InvalidOrder();
        List<InvalidOrder> orders = Arrays.asList(order1, order2);
        when(invalidRepo.findAll()).thenReturn(orders);
        ResponseEntity<List<InvalidOrder>> response = controller.getInvalidOrders();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(orders, response.getBody());
        assertEquals(2, response.getBody().size());
        verify(invalidRepo, times(1)).findAll();
    }
}