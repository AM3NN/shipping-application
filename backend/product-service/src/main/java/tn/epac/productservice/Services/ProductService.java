package tn.epac.productservice.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.epac.productservice.DTO.ProductDTO;
import tn.epac.productservice.Entities.Product;
import tn.epac.productservice.Repositories.ProductRepository;

import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class ProductService implements IproductService {

    private final ProductRepository productRepository;

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = mapToEntity(productDTO);
        return mapToDTO(productRepository.save(product));
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return mapToDTO(product);
    }

    @Override
    public ProductDTO updateProduct(String id, ProductDTO productDTO) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        existing.setName(productDTO.getName());
        existing.setReference(productDTO.getReference());
        existing.setDescription(productDTO.getDescription());
        existing.setType(productDTO.getType());
        existing.setVersion(productDTO.getVersion());
        existing.setQuantity(productDTO.getQuantity());
        existing.setPrice(productDTO.getPrice());
        existing.setInventoryIds(productDTO.getInventoryIds());

        return mapToDTO(productRepository.save(existing));
    }

    @Override
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    // Mapper: Entity -> DTO
    private ProductDTO mapToDTO(Product product) {
        return new ProductDTO(
                product.getName(),
                product.getReference(),
                product.getDescription(),
                product.getType(),
                product.getVersion(),
                product.getQuantity(),
                product.getPrice(),
                product.getInventoryIds()
        );
    }

    // Mapper: DTO -> Entity
    private Product mapToEntity(ProductDTO dto) {
        return new Product(
                null, // L'id est généré automatiquement
                dto.getName(),
                dto.getReference(),
                dto.getDescription(),
                dto.getType(),
                dto.getVersion(),
                dto.getQuantity(),
                dto.getPrice(),
                dto.getInventoryIds()
        );
    }
}
