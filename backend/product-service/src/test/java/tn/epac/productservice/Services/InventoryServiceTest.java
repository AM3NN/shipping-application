// test/java/tn/epac/productservice/Services/InventoryServiceTest.java
package tn.epac.productservice.Services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.epac.productservice.DTO.InventoryDTO;
import tn.epac.productservice.Entities.Inventory;
import tn.epac.productservice.Repositories.InventoryRepository;
import tn.epac.productservice.Repositories.ProductRepository;
import tn.epac.productservice.Repositories.WarehouseRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class InventoryServiceTest {

    @Mock private InventoryRepository inventoryRepository;
    @Mock private ProductRepository productRepository;
    @Mock private WarehouseRepository warehouseRepository;

    @InjectMocks
    private InventoryService inventoryService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateInventory() {
        InventoryDTO dto = new InventoryDTO(null, 3, 5, "WH1", "PR1");
        Inventory inv = new Inventory(null, 3, 5, "WH1", "PR1");

        when(inventoryRepository.save(any(Inventory.class))).thenReturn(inv);

        InventoryDTO result = inventoryService.createInventory(dto);

        assertThat(result.getAvailableQuantity()).isEqualTo(5);
        verify(inventoryRepository, times(1)).save(any());
    }

    @Test
    void testGetInventoryById_NotFound() {
        when(inventoryRepository.findById("123")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> inventoryService.getInventoryById("123"));
    }
}
