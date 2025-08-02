package tn.epac.productservice.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.epac.productservice.DTO.ProductDTO;
import tn.epac.productservice.Entities.Product;
import tn.epac.productservice.Exceptions.ProductAlreadyExistsException;
import tn.epac.productservice.Exceptions.ProductNotFoundException;
import tn.epac.productservice.Mappers.ProductMapper;
import tn.epac.productservice.Repositories.ProductRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Transactional
@Service
@RequiredArgsConstructor
public class ProductService implements IproductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductEventPublisher productEventPublisher; // ← injection

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        if (productDTO.getId() != null && productRepository.existsById(productDTO.getId())) {
            throw new ProductAlreadyExistsException("Un produit avec l'ID " + productDTO.getId() + " existe déjà.");
        }

        Optional<Product> existing = productRepository.findAll().stream()
                .filter(p -> p.getName().equalsIgnoreCase(productDTO.getName()) &&
                        p.getReference().equalsIgnoreCase(productDTO.getReference()))
                .findFirst();

        if (existing.isPresent()) {
            throw new ProductAlreadyExistsException("Un produit avec le même nom et référence existe déjà.");
        }

        Product product = productMapper.toProduct(productDTO);
        Product saved = productRepository.save(product);
        ProductDTO savedDTO = productMapper.toProductDTO(saved);

        productEventPublisher.publishProductCreated(savedDTO); // ← ici

        return savedDTO;
    }

    @Override
    public ProductDTO updateProduct(String id, ProductDTO productDTO) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Impossible de mettre à jour : produit introuvable avec l'ID : " + id));

        existing.setName(productDTO.getName());
        existing.setReference(productDTO.getReference());
        existing.setDescription(productDTO.getDescription());
        existing.setType(productDTO.getType());
        existing.setVersion(productDTO.getVersion());
        existing.setQuantity(productDTO.getQuantity());
        existing.setPrice(productDTO.getPrice());
        existing.setInventoryIds(productDTO.getInventoryIds());

        Product updated = productRepository.save(existing);
        ProductDTO updatedDTO = productMapper.toProductDTO(updated);

        productEventPublisher.publishProductUpdated(updatedDTO); // ← ici

        return updatedDTO;
    }

    @Override
    public void deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Impossible de supprimer : produit introuvable avec l'ID : " + id);
        }
        productRepository.deleteById(id);
        productEventPublisher.publishProductDeleted(id); // ← ici
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toProductDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Produit introuvable avec l'ID : " + id));
        return productMapper.toProductDTO(product);
    }

    @Override
    public void deleteProducts(List<String> ids) {
        List<String> notFoundIds = ids.stream()
                .filter(id -> !productRepository.existsById(id))
                .collect(Collectors.toList());
        if (!notFoundIds.isEmpty()) {
            throw new ProductNotFoundException("Produits introuvables avec les IDs : " + notFoundIds);
        }

        productRepository.deleteAllById(ids);

        // Tu peux publier les événements ici aussi, un par un si besoin
        ids.forEach(productEventPublisher::publishProductDeleted);
    }
}
