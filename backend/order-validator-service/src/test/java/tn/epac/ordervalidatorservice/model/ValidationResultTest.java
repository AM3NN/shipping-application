package tn.epac.ordervalidatorservice.model;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ValidationResultTest {

    @Test
    void isValid() {
        ValidationResult validResult = new ValidationResult(true, Collections.emptyList());
        assertTrue(validResult.isValid());

        ValidationResult invalidResult = new ValidationResult(false, Arrays.asList("Error1"));
        assertFalse(invalidResult.isValid());
    }

    @Test
    void getErrors() {
        List<String> errors = Arrays.asList("Error1", "Error2");
        ValidationResult result = new ValidationResult(false, errors);
        assertEquals(errors, result.getErrors());

        ValidationResult emptyErrorsResult = new ValidationResult(true, Collections.emptyList());
        assertEquals(Collections.emptyList(), emptyErrorsResult.getErrors());

        ValidationResult nullErrorsResult = new ValidationResult(true, null);
        assertNull(nullErrorsResult.getErrors());
    }
}