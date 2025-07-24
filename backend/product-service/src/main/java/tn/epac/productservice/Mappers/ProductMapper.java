package tn.epac.productservice.Mappers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import tn.epac.productservice.DTO.ProductDTO;
import tn.epac.productservice.Entities.Product;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductMapper {

    private final ModelMapper modelMapper = new ModelMapper();

    public ProductDTO toProductDTO(Product product) {
        return modelMapper.map(product, ProductDTO.class);
    }

    public Product toProduct(ProductDTO productDTO) {
        return modelMapper.map(productDTO, Product.class);
    }

    public List<ProductDTO> toProductDTOList(List<Product> products) {
        return products.stream()
                .map(this::toProductDTO)
                .collect(Collectors.toList());
    }

    public List<Product> toProductList(List<ProductDTO> productDTOs) {
        return productDTOs.stream()
                .map(this::toProduct)
                .collect(Collectors.toList());
    }
}
