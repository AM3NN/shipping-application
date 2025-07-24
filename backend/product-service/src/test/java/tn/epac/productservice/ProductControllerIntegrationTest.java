//package tn.epac.productservice;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.DynamicPropertyRegistry;
//import org.springframework.test.context.DynamicPropertySource;
//import org.springframework.test.web.servlet.MockMvc;
//
//import org.testcontainers.containers.MongoDBContainer;
//import org.testcontainers.junit.jupiter.Container;
//import org.testcontainers.junit.jupiter.Testcontainers;
//import tn.epac.productservice.DTO.ProductDTO;
//import tn.epac.productservice.Repositories.ProductRepository;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@SpringBootTest
//@Testcontainers
//@AutoConfigureMockMvc
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//public class ProductControllerIntegrationTest {
//
//    @Container
//    static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:6.0");
//
//    @DynamicPropertySource
//    static void setProps(DynamicPropertyRegistry registry) {
//        registry.add("spring.data.mongodb.uri", mongoDBContainer::getReplicaSetUrl);
//    }
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ProductRepository productRepository;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    private static String productId;
//
//    @Test
//    @Order(1)
//    void testCreateProduct() throws Exception {
//        ProductDTO productDTO = new ProductDTO();
//        productDTO.setName("Keyboard");
//        productDTO.setPrice(49);
//        productDTO.setDescription("Wireless keyboard");
//
//        var result = mockMvc.perform(post("/api/products")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(productDTO)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name").value("Keyboard"))
//                .andReturn();
//
//        // Extract the ID from the response for next tests
//        String response = result.getResponse().getContentAsString();
//        ProductDTO created = objectMapper.readValue(response, ProductDTO.class);
//        productId = created.getId();
//
//        assertThat(productId).isNotNull();
//    }
//
//    @Test
//    @Order(2)
//    void testGetProductById() throws Exception {
//        mockMvc.perform(get("/api/products/{id}", productId))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(productId));
//    }
//
//    @Test
//    @Order(3)
//    void testGetAllProducts() throws Exception {
//        mockMvc.perform(get("/api/products"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.length()").value(1));
//    }
//
//    @Test
//    @Order(4)
//    void testUpdateProduct() throws Exception {
//        ProductDTO updatedDTO = new ProductDTO();
//        updatedDTO.setName("Updated Keyboard");
//        updatedDTO.setPrice(59);
//        updatedDTO.setDescription("Bluetooth keyboard");
//
//        mockMvc.perform(put("/api/products/{id}", productId)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(updatedDTO)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name").value("Updated Keyboard"));
//    }
//
//    @Test
//    @Order(5)
//    void testDeleteProduct() throws Exception {
//        mockMvc.perform(delete("/api/products/{id}", productId))
//                .andExpect(status().isNoContent());
//
//        assertThat(productRepository.findById(productId)).isEmpty();
//    }
//}
