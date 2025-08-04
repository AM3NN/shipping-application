package tn.epac.orderservice.Controllers;

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
import tn.epac.orderservice.DTO.OrderRequestDTO;
import tn.epac.orderservice.DTO.OrderResponseDTO;
import tn.epac.orderservice.Services.OrderService;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OrderController.class)
@Import(OrderControllerTest.TestConfig.class)
public class OrderControllerTest {

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
        responseDTO.setId("order123");
        responseDTO.setStatus("NEW");  // use status instead of description

        when(orderService.createOrder(any(OrderRequestDTO.class))).thenReturn(responseDTO);

        mockMvc.perform(post("/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("order123"))
                .andExpect(jsonPath("$.status").value("NEW"));  // check status
    }

    @Test
    void getAllOrders() throws Exception {
        OrderResponseDTO order1 = new OrderResponseDTO();
        order1.setId("order1");

        OrderResponseDTO order2 = new OrderResponseDTO();
        order2.setId("order2");

        when(orderService.getAllOrders()).thenReturn(Arrays.asList(order1, order2));

        mockMvc.perform(get("/orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value("order1"))
                .andExpect(jsonPath("$[1].id").value("order2"));
    }

    @Test
    void getOrderById() throws Exception {
        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setId("order123");
        responseDTO.setStatus("PROCESSING");  // changed from description

        when(orderService.getOrderById(eq("order123"))).thenReturn(responseDTO);

        mockMvc.perform(get("/orders/order123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("order123"))
                .andExpect(jsonPath("$.status").value("PROCESSING"));  // check status
    }

    @Test
    void updateOrder() throws Exception {
        OrderRequestDTO requestDTO = new OrderRequestDTO();

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setId("order123");
        responseDTO.setStatus("UPDATED");  // changed from description

        when(orderService.updateOrder(eq("order123"), any(OrderRequestDTO.class))).thenReturn(responseDTO);

        mockMvc.perform(put("/orders/order123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("order123"))
                .andExpect(jsonPath("$.status").value("UPDATED"));  // check status
    }

    @Test
    void deleteOrder() throws Exception {
        doNothing().when(orderService).deleteOrder("order123");

        mockMvc.perform(delete("/orders/order123"))
                .andExpect(status().isOk());
    }
}
