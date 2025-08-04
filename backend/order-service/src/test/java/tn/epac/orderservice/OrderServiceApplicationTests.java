package tn.epac.orderservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import tn.epac.orderservice.services.SequenceGeneratorService;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class OrderServiceApplicationTests {

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @Test
    void contextLoads() {
        // Assert that the SequenceGeneratorService bean is loaded in the context
        assertNotNull(sequenceGeneratorService, "SequenceGeneratorService bean should be loaded in the application context");
    }
}