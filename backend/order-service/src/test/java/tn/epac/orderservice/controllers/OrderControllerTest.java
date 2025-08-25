package tn.epac.orderservice.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import tn.epac.orderservice.dto.OrderRequestDTO;
import tn.epac.orderservice.dto.OrderResponseDTO;
import tn.epac.orderservice.exceptions.OrderNotFoundException;
import tn.epac.orderservice.services.OrderService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = OrderController.class)
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private OrderService orderService;

    @Configuration
    @EnableWebSecurity
    static class TestConfig implements WebMvcConfigurer {
        @Bean
        public ObjectMapper objectMapper() {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            return mapper;
        }

        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("/static/**")
                    .addResourceLocations("classpath:/static/")
                    .setCachePeriod(0);
            registry.setOrder(org.springframework.core.Ordered.LOWEST_PRECEDENCE);
        }

        @Bean
        public org.springframework.security.web.SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .securityMatcher("/**")
                    .authorizeHttpRequests(auth -> auth
                            .anyRequest().permitAll()
                    )
                    .csrf(csrf -> csrf.disable())
                    .httpBasic(httpBasic -> httpBasic.disable())
                    .formLogin(formLogin -> formLogin.disable());
            return http.build();
        }
    }

    @Test
    void createOrder() throws Exception {
        OrderRequestDTO requestDTO = new OrderRequestDTO();
        requestDTO.setUserId("testuser");
        requestDTO.setStatus("NEW");
        requestDTO.setTotalAmount(BigDecimal.valueOf(250.00));
        requestDTO.setTotalCurrency("USD");
        requestDTO.setCreatedDate(LocalDate.now());
        requestDTO.setPredictedPrice(200.0);
        requestDTO.setEstimatedFabricationTime("5 days");
        requestDTO.setQuantity(10);
        requestDTO.setProductionPage(100);
        requestDTO.setTextPaperType("OFFSET");
        requestDTO.setBindingType("CASEBIND");
        requestDTO.setTextColor("4/4");
        requestDTO.setDeliveryLocation("123 Main St");
        requestDTO.setShippingMethod("FEDEX");

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setId(123);
        responseDTO.setUserId("testuser");
        responseDTO.setStatus("NEW");
        responseDTO.setTotalAmount(BigDecimal.valueOf(250.00));
        responseDTO.setTotalCurrency("USD");
        responseDTO.setPredictedPrice(200.0);
        responseDTO.setEstimatedFabricationTime("5 days");

        when(orderService.createOrder(any(OrderRequestDTO.class))).thenReturn(responseDTO);

        mockMvc.perform(post("/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO))
                        .with(jwt().jwt(jwt -> jwt.claim("sub", "testuser"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(123))
                .andExpect(jsonPath("$.userId").value("testuser"))
                .andExpect(jsonPath("$.status").value("NEW"))
                .andExpect(jsonPath("$.totalAmount").value(250.00))
                .andExpect(jsonPath("$.predictedPrice").value(200.0));
    }

    @Test
    void createOrderInvalidInput() throws Exception {
        OrderRequestDTO requestDTO = new OrderRequestDTO();
        requestDTO.setUserId("testuser");

        mockMvc.perform(post("/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO))
                        .with(jwt().jwt(jwt -> jwt.claim("sub", "testuser"))))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getAllOrders() throws Exception {
        OrderResponseDTO order1 = new OrderResponseDTO();
        order1.setId(1);
        order1.setUserId("testuser");
        order1.setStatus("NEW");

        OrderResponseDTO order2 = new OrderResponseDTO();
        order2.setId(2);
        order2.setUserId("testuser");
        order2.setStatus("SHIPPED");

        when(orderService.getAllOrders()).thenReturn(Arrays.asList(order1, order2));

        mockMvc.perform(get("/orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].id").value(2));
    }

    @Test
    void getMyOrders() throws Exception {
        OrderResponseDTO order1 = new OrderResponseDTO();
        order1.setId(1);
        order1.setUserId("testuser");
        order1.setStatus("NEW");

        when(orderService.getOrdersByUserId("testuser")).thenReturn(Collections.singletonList(order1));

        mockMvc.perform(get("/orders/my-orders")
                        .with(jwt().jwt(jwt -> jwt.claim("sub", "testuser"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].userId").value("testuser"));
    }

    @Test
    void getOrderById() throws Exception {
        int orderId = 123;
        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setId(orderId);
        responseDTO.setUserId("testuser");
        responseDTO.setStatus("PROCESSING");

        when(orderService.getOrderById(orderId)).thenReturn(responseDTO);

        mockMvc.perform(get("/orders/{id}", orderId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(orderId))
                .andExpect(jsonPath("$.userId").value("testuser"))
                .andExpect(jsonPath("$.status").value("PROCESSING"));
    }

    @Test
    void updateOrder() throws Exception {
        int orderId = 123;
        OrderRequestDTO requestDTO = new OrderRequestDTO();
        requestDTO.setUserId("testuser");
        requestDTO.setStatus("UPDATED");
        requestDTO.setTotalAmount(BigDecimal.valueOf(300.00));
        requestDTO.setTotalCurrency("EUR");
        requestDTO.setCreatedDate(LocalDate.now());
        requestDTO.setPredictedPrice(250.0);
        requestDTO.setEstimatedFabricationTime("6 days");
        requestDTO.setQuantity(15);
        requestDTO.setProductionPage(150);
        requestDTO.setTextPaperType("GLOSSY");
        requestDTO.setBindingType("SPIRAL");
        requestDTO.setTextColor("1/1");
        requestDTO.setDeliveryLocation("456 Oak St");
        requestDTO.setShippingMethod("DHL");

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setId(orderId);
        responseDTO.setUserId("testuser");
        responseDTO.setStatus("UPDATED");
        responseDTO.setTotalAmount(BigDecimal.valueOf(300.00));
        responseDTO.setTotalCurrency("EUR");
        responseDTO.setPredictedPrice(250.0);
        responseDTO.setEstimatedFabricationTime("6 days");

        when(orderService.updateOrder(eq(orderId), any(OrderRequestDTO.class))).thenReturn(responseDTO);

        mockMvc.perform(put("/orders/{id}", orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO))
                        .with(jwt().jwt(jwt -> jwt.claim("sub", "testuser"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(orderId))
                .andExpect(jsonPath("$.userId").value("testuser"))
                .andExpect(jsonPath("$.status").value("UPDATED"))
                .andExpect(jsonPath("$.totalAmount").value(300.00))
                .andExpect(jsonPath("$.predictedPrice").value(250.0));
    }

    @Test
    void deleteOrder() throws Exception {
        int orderId = 123;
        doNothing().when(orderService).deleteOrder(orderId);

        mockMvc.perform(delete("/orders/{id}", orderId)
                        .with(jwt().jwt(jwt -> jwt.claim("sub", "testuser"))))
                .andExpect(status().isOk());
    }

    @Test
    void getOrderByIdNotFound() throws Exception {
        int orderId = 999;
        when(orderService.getOrderById(orderId)).thenThrow(new OrderNotFoundException("Order not found"));

        mockMvc.perform(get("/orders/{id}", orderId))
                .andExpect(status().isNotFound());
    }

    @Test
    void updateOrderNotFound() throws Exception {
        int orderId = 999;
        OrderRequestDTO requestDTO = new OrderRequestDTO();
        requestDTO.setUserId("testuser");
        requestDTO.setStatus("UPDATED");

        when(orderService.updateOrder(eq(orderId), any(OrderRequestDTO.class)))
                .thenThrow(new OrderNotFoundException("Order not found"));

        mockMvc.perform(put("/orders/{id}", orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO))
                        .with(jwt().jwt(jwt -> jwt.claim("sub", "testuser"))))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteOrderNotFound() throws Exception {
        int orderId = 999;
        doThrow(new OrderNotFoundException("Order not found")).when(orderService).deleteOrder(orderId);

        mockMvc.perform(delete("/orders/{id}", orderId)
                        .with(jwt().jwt(jwt -> jwt.claim("sub", "testuser"))))
                .andExpect(status().isNotFound());
    }
}