package tn.epac.orderservice.Exceptions;

public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(String productRef) {
        super("Produit avec la référence '" + productRef + "' introuvable.");
    }
}
