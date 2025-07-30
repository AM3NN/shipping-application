package tn.epac.productservice.Controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import tn.epac.productservice.DTO.ProductDTO;
import tn.epac.productservice.Services.ImageStorageService;
import tn.epac.productservice.Services.IproductService;


import java.io.IOException;
import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);
    private final IproductService productService;
    private final ImageStorageService imageStorageService;
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDTO> createProductWithImage(
            @RequestPart("product") ProductDTO productDTO,
            @RequestPart("image") MultipartFile imageFile
    ) {
        // Étape 1: Sauvegarde de l'image dans un dossier local ou cloud (ex: /uploads)
        String imageUrl = imageStorageService.storeFile(imageFile); // méthode à créer

        // Étape 2: Affecter le chemin ou URL au produit
        productDTO.setImageUrl(imageUrl);

        // Étape 3: Sauvegarde du produit
        ProductDTO created = productService.createProduct(productDTO);
        return ResponseEntity.ok(created);
    }

    private boolean isValidImageType(String contentType) {
        return contentType != null && (
                contentType.equals("image/jpeg") ||
                        contentType.equals("image/png") ||
                        contentType.equals("image/gif")
        );
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts(HttpServletRequest request) {

        try {
            List<ProductDTO> products = productService.getAllProducts();

            return ResponseEntity.ok(products);
        } catch (Exception e) {
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable String id, HttpServletRequest request) {
        try {
            ProductDTO product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            throw e;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable String id,
            @RequestBody ProductDTO productDTO,
            HttpServletRequest request
    ) {

        try {
            ProductDTO updated = productService.updateProduct(id, productDTO);

            return ResponseEntity.ok(updated);
        } catch (Exception e) {

            throw e;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id, HttpServletRequest request) {

        try {
            productService.deleteProduct(id);

            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw e;
        }
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions(HttpServletRequest request) {

        return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
                .header("Access-Control-Allow-Headers", "Authorization,Content-Type,Accept,Origin,X-Requested-With")
                .header("Access-Control-Max-Age", "3600")
                .build();
    }
    @DeleteMapping("/batch")
    public ResponseEntity<Void> deleteProducts(@RequestBody List<String> ids) {
        productService.deleteProducts(ids);
        return ResponseEntity.noContent().build();
    }
}