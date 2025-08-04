package tn.epac.orderservice.entities;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DatabaseSequenceTest {

    @Test
    void testGettersAndSetters() {
        DatabaseSequence sequence = new DatabaseSequence();
        sequence.setId("order_seq");
        sequence.setSeq(100);

        assertEquals("order_seq", sequence.getId());
        assertEquals(100, sequence.getSeq());
    }

    @Test
    void testEqualsAndHashCode() {
        DatabaseSequence seq1 = new DatabaseSequence();
        seq1.setId("order_seq");
        seq1.setSeq(100);

        DatabaseSequence seq2 = new DatabaseSequence();
        seq2.setId("order_seq");
        seq2.setSeq(100);

        assertEquals(seq1, seq2);
        assertEquals(seq1.hashCode(), seq2.hashCode());
    }

    @Test
    void testToString() {
        DatabaseSequence sequence = new DatabaseSequence();
        sequence.setId("order_seq");
        sequence.setSeq(100);

        String toString = sequence.toString();
        assertTrue(toString.contains("order_seq"));
        assertTrue(toString.contains("100"));
    }
}
