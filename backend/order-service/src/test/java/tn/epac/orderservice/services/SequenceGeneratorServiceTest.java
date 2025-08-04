package tn.epac.orderservice.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import tn.epac.orderservice.entities.DatabaseSequence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class SequenceGeneratorServiceTest {

    private MongoOperations mongoOperations;
    private SequenceGeneratorService sequenceGeneratorService;

    @BeforeEach
    void setUp() {
        mongoOperations = mock(MongoOperations.class);
        sequenceGeneratorService = new SequenceGeneratorService(mongoOperations);
    }

    @Test
    void getNextSequence_shouldReturnNextSequenceNumber() {
        // Arrange
        DatabaseSequence mockSequence = new DatabaseSequence();
        mockSequence.setSeq(5);
        when(mongoOperations.findAndModify(
                any(Query.class),
                any(Update.class),
                any(FindAndModifyOptions.class),
                eq(DatabaseSequence.class)
        )).thenReturn(mockSequence);

        // Act
        int result = sequenceGeneratorService.getNextSequence("order_sequence");

        // Assert
        assertEquals(5, result);
    }

    @Test
    void getNextSequence_shouldReturn1WhenNull() {
        // Arrange
        when(mongoOperations.findAndModify(
                any(Query.class),
                any(Update.class),
                any(FindAndModifyOptions.class),
                eq(DatabaseSequence.class)
        )).thenReturn(null);

        // Act
        int result = sequenceGeneratorService.getNextSequence("order_sequence");

        // Assert
        assertEquals(1, result);
    }
}
