package tn.epac.productservice.Mappers;

import org.junit.jupiter.api.Test;
import tn.epac.productservice.DTO.ProductDTO;
import tn.epac.productservice.Entities.Category;
import tn.epac.productservice.Entities.InventoryStatus;
import tn.epac.productservice.Entities.Product;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

class ProductMapperTest {

    ProductMapper productMapper = new ProductMapper();

    @Test
    void toProductDTO() {
        Product product = new Product(
                "1", "Laptop", "REF123", "High-end laptop",
                "Electronics", "v1",
                10, 1500.0f,
                Arrays.asList("inv1", "inv2"),
                Category.COMIC, InventoryStatus.INSTOCK,"sdvd"
        );

        ProductDTO dto = productMapper.toProductDTO(product);

        assertNotNull(dto);
        assertEquals(product.getId(), dto.getId());
        assertEquals(product.getName(), dto.getName());
        assertEquals(product.getPrice(), dto.getPrice());
        assertEquals(product.getCategory(), dto.getCategory());
        assertEquals(product.getInventoryStatus(), dto.getInventoryStatus());
    }

    @Test
    void toProduct() {
        ProductDTO dto = new ProductDTO(
                "2", "Phone", "REF456", "Smartphone",
                "Electronics", "v2",
                5, 800.0f,
                Collections.singletonList("inv3"),
                Category.BOOK, InventoryStatus.OUTOFSTOCK,"dwbfbf"
        );

        Product product = productMapper.toProduct(dto);

        assertNotNull(product);
        assertEquals(dto.getId(), product.getId());
        assertEquals(dto.getName(), product.getName());
        assertEquals(dto.getReference(), product.getReference());
        assertEquals(dto.getCategory(), product.getCategory());
        assertEquals(dto.getInventoryStatus(), product.getInventoryStatus());
    }

    @Test
    void toProductDTOList() {
        Product p1 = new Product("1", "Item1", "R1", "Desc1", "TypeA", "v1", 3, 50.0f, null, Category.BOOK, InventoryStatus.LOWSTOCK,"ffd");
        Product p2 = new Product("2", "Item2", "R2", "Desc2", "TypeB", "v2", 7, 120.0f, null, Category.BOOK, InventoryStatus.INSTOCK,"fbf");

        List<ProductDTO> dtoList = productMapper.toProductDTOList(List.of(p1, p2));

        assertEquals(2, dtoList.size());
        assertEquals(p1.getName(), dtoList.get(0).getName());
        assertEquals(p2.getReference(), dtoList.get(1).getReference());
        assertEquals(p1.getCategory(), dtoList.get(0).getCategory());
        assertEquals(p2.getInventoryStatus(), dtoList.get(1).getInventoryStatus());
    }

    @Test
    void toProductList() {
        ProductDTO d1 = new ProductDTO("1", "Item1", "R1", "Desc1", "TypeA", "v1", 3, 50.0f, null, Category.BOOK, InventoryStatus.LOWSTOCK,"fvfb");
        ProductDTO d2 = new ProductDTO("2", "Item2", "R2", "Desc2", "TypeB", "v2", 7, 120.0f, null, Category.BOOK, InventoryStatus.INSTOCK,"fbbf");

        List<Product> productList = productMapper.toProductList(List.of(d1, d2));

        assertEquals(2, productList.size());
        assertEquals(d1.getName(), productList.get(0).getName());
        assertEquals(d1.getCategory(), productList.get(0).getCategory());
        assertEquals(d2.getReference(), productList.get(1).getReference());
        assertEquals(d2.getInventoryStatus(), productList.get(1).getInventoryStatus());
    }

    @Test
    void shouldThrowExceptionWhenProductIsNull() {
        assertThatThrownBy(() -> productMapper.toProductDTO(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Product must not be null");
    }
}
