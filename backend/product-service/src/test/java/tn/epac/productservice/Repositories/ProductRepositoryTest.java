package tn.epac.productservice.Repositories;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import tn.epac.productservice.Entities.Category;
import tn.epac.productservice.Entities.InventoryStatus;
import tn.epac.productservice.Entities.Product;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
@ActiveProfiles("test")
@DataMongoTest
class ProductRepositoryTest {
    @Autowired
private ProductRepository productRepository;
    @BeforeEach
    public void setUp() {
        // Nettoyer la base avant chaque test
        productRepository.deleteAll();

        // Insérer 3 produits avec catégorie et statut d’inventaire
        productRepository.save(new Product(
                null, "Product A", "REF001", "Desc A", "Type1", "v1",
                10, 100.0f, List.of(), Category.BOOK, InventoryStatus.INSTOCK,"b"
        ));

        productRepository.save(new Product(
                null, "Product B", "REF002", "Desc B", "Type1", "v1",
                5, 150.0f, List.of(), Category.BOOK, InventoryStatus.LOWSTOCK,"dc"
        ));

        productRepository.save(new Product(
                null, "Product C", "REF003", "Desc C", "Type2", "v2",
                0, 200.0f, List.of(), Category.COMIC, InventoryStatus.OUTOFSTOCK,"fv"
        ));
    }

    @Test
    void testFindByReference_existingProduct() {
        Optional<Product> product = productRepository.findByReference("REF002");
        assertTrue(product.isPresent());
        assertEquals("Product B", product.get().getName());
    }

    @Test
    void testFindByReference_nonExistingProduct() {
        Optional<Product> product = productRepository.findByReference("NON_EXISTENT_REF");
        assertFalse(product.isPresent(), "Le produit avec cette référence ne devrait pas exister");
    }
    @Test
    void testFindByType() {
        List<Product> type1Products = productRepository.findByType("Type1");
        assertEquals(2, type1Products.size());

        List<Product> type2Products = productRepository.findByType("Type2");
        assertEquals(1, type2Products.size());
    }
}