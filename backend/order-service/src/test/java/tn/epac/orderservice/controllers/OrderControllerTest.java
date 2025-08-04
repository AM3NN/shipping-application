package tn.epac.orderservice.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import tn.epac.orderservice.dto.OrderRequestDTO;
import tn.epac.orderservice.dto.OrderResponseDTO;
import tn.epac.orderservice.services.OrderService;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OrderController.class)
@Import(OrderControllerTest.TestConfig.class)
 class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private OrderService orderService;

    @TestConfiguration
    static class TestConfig {
        @Bean
        public OrderService orderService() {
            return Mockito.mock(OrderService.class);
        }
    }

    @Test
    void createOrder() throws Exception {
        OrderRequestDTO requestDTO = new OrderRequestDTO();

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setId(123);  // changed from String to int
        responseDTO.setStatus("NEW");

        when(orderService.createOrder(any(OrderRequestDTO.class))).thenReturn(responseDTO);

        mockMvc.perform(post("/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(123))
                .andExpect(jsonPath("$.status").value("NEW"));
    }

    @Test
    void getAllOrders() throws Exception {
        OrderResponseDTO order1 = new OrderResponseDTO();
        order1.setId(1);

        OrderResponseDTO order2 = new OrderResponseDTO();
        order2.setId(2);

        when(orderService.getAllOrders()).thenReturn(Arrays.asList(order1, order2));

        mockMvc.perform(get("/orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].id").value(2));
    }


    @Test
    void getOrderById() throws Exception {
        int orderId = 123;

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setId(orderId);
        responseDTO.setStatus("PROCESSING");

        when(orderService.getOrderById(orderId)).thenReturn(responseDTO);

        mockMvc.perform(get("/orders/{id}", orderId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(orderId))
                .andExpect(jsonPath("$.status").value("PROCESSING"));
    }

    @Test
    void updateOrder() throws Exception {
        int orderId = 123;
        OrderRequestDTO requestDTO = new OrderRequestDTO();

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setId(orderId);
        responseDTO.setStatus("UPDATED");

        when(orderService.updateOrder(eq(orderId), any(OrderRequestDTO.class))).thenReturn(responseDTO);

        mockMvc.perform(put("/orders/{id}", orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(orderId))
                .andExpect(jsonPath("$.status").value("UPDATED"));
    }

    @Test
    void deleteOrder() throws Exception {
        int orderId = 123;
        doNothing().when(orderService).deleteOrder(orderId);

        mockMvc.perform(delete("/orders/{id}", orderId))
                .andExpect(status().isOk());
    }
}
