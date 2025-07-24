// test/java/tn/epac/productservice/Repositories/InventoryRepositoryTest.java
package tn.epac.productservice.Repositories;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import tn.epac.productservice.Entities.Inventory;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
public class InventoryRepositoryTest {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Test
    void testSaveAndFindByWarehouseId() {
        Inventory inv = new Inventory(null, 5, 10, "WH1", "PR1");
        inventoryRepository.save(inv);

        List<Inventory> found = inventoryRepository.findByWarehouseId("WH1");
        assertThat(found).isNotEmpty();
        assertThat(found.get(0).getProductId()).isEqualTo("PR1");
    }

    @Test
    void testFindByProductId() {
        Inventory inv = new Inventory(null, 2, 8, "WH2", "PR2");
        inventoryRepository.save(inv);

        List<Inventory> result = inventoryRepository.findByProductId("PR2");
        assertThat(result).isNotEmpty();
    }
}
