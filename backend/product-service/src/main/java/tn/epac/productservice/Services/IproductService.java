package tn.epac.productservice.Services;

import tn.epac.productservice.DTO.ProductDTO;
import java.util.List;

public interface IproductService {
    ProductDTO createProduct(ProductDTO productDTO);
    List<ProductDTO> getAllProducts();
    ProductDTO getProductById(String id);
    ProductDTO updateProduct(String id, ProductDTO productDTO);
    void deleteProduct(String id);
}
