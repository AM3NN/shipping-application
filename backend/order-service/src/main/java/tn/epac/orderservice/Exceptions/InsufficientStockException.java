package tn.epac.orderservice.Exceptions;

public class InsufficientStockException extends RuntimeException {

    public InsufficientStockException(String productRef, int availableQuantity) {
        super("Stock insuffisant pour le produit '" + productRef
                + "'. Quantité disponible : " + availableQuantity);
    }
}
