package tn.epac.orderservice.Tools;

import com.mongodb.client.MongoIterable;
import org.modelmapper.ModelMapper;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tn.epac.orderservice.DTO.OrderDTO;
import tn.epac.orderservice.DTO.OrderProductDTO;
import tn.epac.orderservice.DTO.ProductDTO;
import tn.epac.orderservice.Entities.Order;
import tn.epac.orderservice.Entities.OrderProduct;
import tn.epac.orderservice.Entities.Product;
import tn.epac.orderservice.Exceptions.InsufficientStockException;
import tn.epac.orderservice.Exceptions.ProductNotFoundException;
import tn.epac.orderservice.Repository.OrderRepository;
import tn.epac.orderservice.Repository.ProductRepository;
import tn.epac.orderservice.Services.OrderService;

import java.util.ArrayList;
import java.util.List;

@Component
public class AgentTools {

  private final OrderService orderService;
  private final ProductRepository productRepository;
  private final ModelMapper modelMapper;
  private final OrderRepository orderRepository;

  public AgentTools(OrderService orderService, ProductRepository productRepository, ModelMapper modelMapper, OrderRepository orderRepository) {
    this.orderService = orderService;
    this.productRepository = productRepository;
    this.modelMapper = modelMapper;
    this.orderRepository = orderRepository;
  }

  @Tool(description = "Récupérer tous les ordres")
  public List<OrderDTO> getAllOrders() {
    return orderService.getAllOrders();
  }

  @Tool(description = "Liste tous les produits disponibles avec prix et quantité")
  public List<Product> listProducts() {
    return productRepository.findAll();
  }


  @Transactional
  @Tool(description = "Créer une commande avec un produit et sa quantité")
  public OrderDTO createOrder(
          @ToolParam(description = "Référence du produit") String productref,
          @ToolParam(description = "Quantité à commander") int quantity,
          @ToolParam(description = "Méthode de livraison (FEDEX ou DHL)") String shippingMethod,
          @ToolParam(description = "Lieu d'expédition") String shippingLocation,
          @ToolParam(description = "Lieu de livraison") String deliveryLocation) {

    // Recherche du produit par référence, exception si non trouvé
    Product productEntity = productRepository.findByReference(productref)
            .orElseThrow(() -> new ProductNotFoundException(productref));

    // Vérification du stock disponible
    if (quantity > productEntity.getQuantity()) {
      throw new InsufficientStockException(productEntity.getReference(), productEntity.getQuantity());
    }

    // Mise à jour du stock
    productEntity.setQuantity(productEntity.getQuantity() - quantity);
    productRepository.save(productEntity);

    // Création de la commande
    Order orderEntity = new Order();
    orderEntity.setShippingMethod(shippingMethod);
    orderEntity.setShippingLocation(shippingLocation);
    orderEntity.setDeliveryLocation(deliveryLocation);

    // Initialisation de la liste des produits si nécessaire
    if (orderEntity.getProducts() == null) {
      orderEntity.setProducts(new ArrayList<>());
    }

    // Création de l'objet OrderProduct
    OrderProduct orderProduct = new OrderProduct();
    orderProduct.setProduct(productEntity);
    orderProduct.setQuantity(quantity);

    // Ajout du produit à la commande
    orderEntity.getProducts().add(orderProduct);

    // Sauvegarde de la commande
    orderEntity = orderRepository.save(orderEntity);

    // Retourne le DTO de la commande
    return modelMapper.map(orderEntity, OrderDTO.class);
  }

}

// Tu peux définir un record ou une classe simple pour les infos produit

