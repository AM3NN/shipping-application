package tn.epac.orderservice.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import tn.epac.orderservice.dto.OrderRequestDTO;
import tn.epac.orderservice.dto.PredictionResponse;
import tn.epac.orderservice.entities.Order;
import tn.epac.orderservice.repository.OrderRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class OrderServiceImplTest {

    private OrderServiceImpl orderService;
    private OrderRepository orderRepository;
    private SequenceGeneratorService sequenceGeneratorService;
    private PredictionService predictionService;

    @BeforeEach
    void setUp() {
        orderRepository = Mockito.mock(OrderRepository.class);
        sequenceGeneratorService = Mockito.mock(SequenceGeneratorService.class);
        predictionService = Mockito.mock(PredictionService.class);
        orderService = new OrderServiceImpl(predictionService, orderRepository, sequenceGeneratorService);
    }

    @Test
    void testCreateOrder() {
        OrderRequestDTO request = new OrderRequestDTO();
        request.setStatus("NEW");
        request.setCreatedDate(LocalDate.of(2025, 1, 1));
        request.setTotalAmount(BigDecimal.valueOf(250.00));
        request.setTotalCurrency("USD");

        // Mock sequence generation to return 1
        when(sequenceGeneratorService.getNextSequence("orders_sequence")).thenReturn(1);

        // Mock prediction response
        PredictionResponse predictionResponse = new PredictionResponse();
        predictionResponse.setPredictedPrice(200.0);
        predictionResponse.setEstimatedFabricationTime("5 days");
        when(predictionService.predict(any(OrderRequestDTO.class))).thenReturn(predictionResponse);

        Order savedOrder = new Order();
        savedOrder.setId(1);  // int id
        savedOrder.setStatus(request.getStatus());
        savedOrder.setCreatedDate(request.getCreatedDate());
        savedOrder.setTotalAmount(request.getTotalAmount());
        savedOrder.setTotalCurrency(request.getTotalCurrency());

        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        var result = orderService.createOrder(request);

        assertNotNull(result);
        assertEquals("NEW", result.getStatus());
        assertEquals(BigDecimal.valueOf(250.00), result.getTotalAmount());
        assertEquals(1, result.getId()); // verify int id set
    }

    @Test
    void testGetAllOrders() {
        Order order1 = new Order();
        order1.setId(1);
        order1.setStatus("NEW");

        Order order2 = new Order();
        order2.setId(2);
        order2.setStatus("SHIPPED");

        when(orderRepository.findAll()).thenReturn(List.of(order1, order2));

        var result = orderService.getAllOrders();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("NEW", result.getFirst().getStatus());
        assertEquals(1, result.getFirst().getId());
    }

    @Test
    void testGetOrderById() {
        int orderId = 123;
        Order order = new Order();
        order.setId(orderId);
        order.setStatus("DELIVERED");

        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));

        var result = orderService.getOrderById(orderId);

        assertNotNull(result);
        assertEquals(orderId, result.getId());
        assertEquals("DELIVERED", result.getStatus());
    }

    @Test
    void testUpdateOrder() {
        int orderId = 456;
        Order existingOrder = new Order();
        existingOrder.setId(orderId);
        existingOrder.setStatus("PENDING");

        OrderRequestDTO updateDto = new OrderRequestDTO();
        updateDto.setStatus("CONFIRMED");
        updateDto.setTotalAmount(BigDecimal.valueOf(300));
        updateDto.setTotalCurrency("EUR");
        updateDto.setCreatedDate(LocalDate.of(2025, 8, 1));

        Order updatedOrder = new Order();
        updatedOrder.setId(orderId);
        updatedOrder.setStatus("CONFIRMED");
        updatedOrder.setTotalAmount(updateDto.getTotalAmount());
        updatedOrder.setTotalCurrency(updateDto.getTotalCurrency());
        updatedOrder.setCreatedDate(updateDto.getCreatedDate());

        when(orderRepository.findById(orderId)).thenReturn(Optional.of(existingOrder));
        when(orderRepository.save(any(Order.class))).thenReturn(updatedOrder);

        var result = orderService.updateOrder(orderId, updateDto);

        assertNotNull(result);
        assertEquals("CONFIRMED", result.getStatus());
        assertEquals(BigDecimal.valueOf(300), result.getTotalAmount());
    }

    @Test
    void testDeleteOrder() {
        int orderId = 1;

        when(orderRepository.existsById(orderId)).thenReturn(true);

        // No exception expected
        orderService.deleteOrder(orderId);

        verify(orderRepository, times(1)).deleteById(orderId);
    }

    @Test
    void testDeleteOrderNotFound() {
        int orderId = 999;

        when(orderRepository.existsById(orderId)).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            orderService.deleteOrder(orderId);
        });

        assertEquals("Order not found with id: " + orderId, exception.getMessage());
    }
}
