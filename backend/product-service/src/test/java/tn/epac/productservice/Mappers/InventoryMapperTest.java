package tn.epac.productservice.Mappers;
// test/java/tn/epac/productservice/Mappers/InventoryMapperTest.java


import org.junit.jupiter.api.Test;
import tn.epac.productservice.DTO.InventoryDTO;
import tn.epac.productservice.Entities.Inventory;

import static org.assertj.core.api.Assertions.assertThat;

public class InventoryMapperTest {

    private final InventoryMapper mapper ;

    public InventoryMapperTest(InventoryMapper mapper) {
        this.mapper = mapper;
    }

    @Test
    void testToInventoryDTO() {
        Inventory inv = new Inventory("1", "qas","f",5, 10, "WH1", "PR1");
        InventoryDTO dto = mapper.toInventoryDTO(inv);

        assertThat(dto.getId()).isEqualTo("1");
        assertThat(dto.getAvailableQuantity()).isEqualTo(10);
    }

    @Test
    void testToInventoryEntity() {
        InventoryDTO dto = new InventoryDTO("2", "aa","ee",3, 7, "WH2", "PR2");
        Inventory inv = mapper.toInventory(dto);

        assertThat(inv.getWarehouseId()).isEqualTo("WH2");
    }
}
