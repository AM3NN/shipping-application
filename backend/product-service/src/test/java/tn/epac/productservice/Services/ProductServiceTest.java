package tn.epac.productservice.Services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.epac.productservice.DTO.ProductDTO;
import tn.epac.productservice.Entities.Product;
import tn.epac.productservice.Exceptions.ProductAlreadyExistsException;
import tn.epac.productservice.Exceptions.ProductNotFoundException;
import tn.epac.productservice.Mappers.ProductMapper;
import tn.epac.productservice.Repositories.ProductRepository;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductMapper productMapper;

    @InjectMocks
    private ProductService productService;

    private Product product;
    private ProductDTO productDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        product = new Product();
        product.setId("1");
        product.setName("Test");
        product.setReference("REF123");

        productDTO = new ProductDTO();
        productDTO.setId("1");
        productDTO.setName("Test");
        productDTO.setReference("REF123");
    }

    @Test
    void testCreateProduct_success() {
        when(productRepository.existsById("1")).thenReturn(false);
        when(productRepository.findAll()).thenReturn(Collections.emptyList());
        when(productMapper.toProduct(productDTO)).thenReturn(product);
        when(productRepository.save(product)).thenReturn(product);
        when(productMapper.toProductDTO(product)).thenReturn(productDTO);

        ProductDTO result = productService.createProduct(productDTO);

        assertEquals(productDTO, result);
        verify(productRepository).save(product);
    }

    @Test
    void testCreateProduct_alreadyExistsById() {
        when(productRepository.existsById("1")).thenReturn(true);

        assertThrows(ProductAlreadyExistsException.class, () -> productService.createProduct(productDTO));
    }

    @Test
    void testCreateProduct_duplicateNameAndReference() {
        when(productRepository.existsById("1")).thenReturn(false);
        when(productRepository.findAll()).thenReturn(List.of(product));
        productDTO.setId("2");

        assertThrows(ProductAlreadyExistsException.class, () -> productService.createProduct(productDTO));
    }

    @Test
    void testGetAllProducts() {
        when(productRepository.findAll()).thenReturn(List.of(product));
        when(productMapper.toProductDTO(product)).thenReturn(productDTO);

        List<ProductDTO> results = productService.getAllProducts();

        assertEquals(1, results.size());
        assertEquals("Test", results.get(0).getName());
    }

    @Test
    void testGetProductById_found() {
        when(productRepository.findById("1")).thenReturn(Optional.of(product));
        when(productMapper.toProductDTO(product)).thenReturn(productDTO);

        ProductDTO result = productService.getProductById("1");

        assertEquals("Test", result.getName());
    }

    @Test
    void testGetProductById_notFound() {
        when(productRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> productService.getProductById("1"));
    }

    @Test
    void testUpdateProduct_success() {
        ProductDTO updateDTO = new ProductDTO();
        updateDTO.setName("Updated");
        updateDTO.setReference("UpdatedRef");
        updateDTO.setDescription("New description");
        updateDTO.setVersion("v2");
        updateDTO.setQuantity(5);
        updateDTO.setPrice(100);
        updateDTO.setType("Electronic");

        when(productRepository.findById("1")).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(product);
        when(productMapper.toProductDTO(any(Product.class))).thenReturn(updateDTO);

        ProductDTO result = productService.updateProduct("1", updateDTO);

        assertEquals("Updated", result.getName());
    }

    @Test
    void testUpdateProduct_notFound() {
        when(productRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> productService.updateProduct("1", productDTO));
    }

    @Test
    void testDeleteProduct_success() {
        when(productRepository.existsById("1")).thenReturn(true);

        productService.deleteProduct("1");

        verify(productRepository).deleteById("1");
    }

    @Test
    void testDeleteProduct_notFound() {
        when(productRepository.existsById("1")).thenReturn(false);

        assertThrows(ProductNotFoundException.class, () -> productService.deleteProduct("1"));
    }
}
