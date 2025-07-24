package tn.epac.productservice.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tn.epac.productservice.DTO.ProductDTO;
import tn.epac.productservice.Services.IproductService;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class) // Enable Mockito support
class ProductControllerTest {

    private MockMvc mockMvc;

    @Mock
    private IproductService productService; // Pure Mockito mock

    @InjectMocks
    private ProductController productController; // Inject mocks into the controller

    private ObjectMapper objectMapper = new ObjectMapper();
    private ProductDTO sampleProduct;

    @BeforeEach
    void setup() {
        // Initialize MockMvc with the controller
        mockMvc = MockMvcBuilders.standaloneSetup(productController).build();

        // Initialize a sample product
        sampleProduct = ProductDTO.builder()
                .id("1")
                .name("Test Product")
                .reference("REF001")
                .description("Description")
                .type("TypeA")
                .version("v1")
                .quantity(10)
                .price(99)
                .inventoryIds(List.of("inv1", "inv2"))
                .build();
    }

    @Test
    void testCreateProduct() throws Exception {
        when(productService.createProduct(any())).thenReturn(sampleProduct);

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleProduct)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Product"));
    }

    @Test
    void testGetAllProducts() throws Exception {
        List<ProductDTO> products = Arrays.asList(sampleProduct);
        when(productService.getAllProducts()).thenReturn(products);

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].id").value("1"));
    }

    @Test
    void testGetProductById() throws Exception {
        when(productService.getProductById("1")).thenReturn(sampleProduct);

        mockMvc.perform(get("/api/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Test Product"));
    }

    @Test
    void testUpdateProduct() throws Exception {
        ProductDTO updatedProduct = sampleProduct;
        updatedProduct.setName("Updated");

        when(productService.updateProduct(eq("1"), any())).thenReturn(updatedProduct);

        mockMvc.perform(put("/api/products/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedProduct)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated"));
    }

    @Test
    void testDeleteProduct() throws Exception {
        mockMvc.perform(delete("/api/products/1"))
                .andExpect(status().isNoContent());
    }
}