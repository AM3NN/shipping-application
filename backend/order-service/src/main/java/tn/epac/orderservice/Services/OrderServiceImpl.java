package tn.epac.orderservice.Services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import tn.epac.orderservice.DTO.MixedProduct;
import tn.epac.orderservice.DTO.OrderDTO;
import tn.epac.orderservice.DTO.OrderDetailDTO;
import tn.epac.orderservice.DTO.ProductDTO;
import tn.epac.orderservice.Entities.Order;
import tn.epac.orderservice.Entities.OrderDetail;
import tn.epac.orderservice.Entities.OrderProduct;
import tn.epac.orderservice.Repository.OrderRepository;
import tn.epac.orderservice.Repository.OrderdetailRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor

public class OrderServiceImpl implements OrderService {
    private static final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);
    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;
    private final SequenceGeneratorService sequenceGenerator;
private  final OrderdetailRepository orderDetailRepository;


    @Override
    public Order createOrder(Order orderDTO) {
        orderDTO.setCreatedDate(LocalDate.now());
        return orderRepository.save(orderDTO);
    }

    @Override
    public Order creategeneralOrder(Order order) {


        order.setCreatedDate(LocalDate.now());

        // Générer référence incrémentée, ex : ORD-0001
        long seq = sequenceGenerator.generateSequence("order_sequence");
        order.setReference(String.format("ORD-%04d", seq));

        // Valeur par défaut pour le statut
        if (order.getStatus() == null) {
            order.setStatus("CREATED");
        }

        // Vérifier la disponibilité des produits
        for (OrderProduct op : order.getProducts()) {
            if (op.getQuantity() > op.getProduct().getQuantity()) {
                throw new IllegalArgumentException(
                        "Stock insuffisant pour le produit : " + op.getProduct().getName()
                );
        }
        }
        return orderRepository.save(order);
    }


    @Override
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> getMyOrders(String clientId) {
        List<Order> orders = orderRepository.findByClientId(clientId);
        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public OrderDTO getOrderById(String id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return modelMapper.map(order, OrderDTO.class);
    }

    @Override
    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }

    @Override
    public List<OrderDetail> getMycustomProducts(String clientId) {
        List<Order> orders = orderRepository.findByClientId(clientId);

        return orders.stream()
                .filter(order -> order.getCustomproductsids() != null && !order.getCustomproductsids().isEmpty())
                .flatMap(order -> order.getCustomproductsids().stream()
                        .map(id -> orderDetailRepository.findById(id)
                                .orElse(null))
                        .filter(Objects::nonNull)
                )
                .collect(Collectors.toList());
    }




    @Override
    public Order createOrder(Order order, List<OrderDetail> customproducts) {
        // Save OrderDetails and collect IDs
        List<String> customProductIds = new ArrayList<>();
        for (OrderDetail detail : customproducts) {
            detail.setReference(generateOrderDetailReference());
            OrderDetail savedDetail = orderDetailRepository.save(detail);
            customProductIds.add(savedDetail.getId());
        }

        // Assign IDs to Order
        order.setCustomproductsids(customProductIds);
        order.setCreatedDate(LocalDate.now());

        // Générer référence incrémentée, ex : ORD-0001
        long seq = sequenceGenerator.generateSequence("order_sequence");
        order.setReference(String.format("ORD-%04d", seq));

        // Valeur par défaut pour le statut
        if (order.getStatus() == null) {
            order.setStatus("CREATED");
        }

        // Vérifier la disponibilité des produits
        for (OrderProduct op : order.getProducts()) {
            if (op.getQuantity() > op.getProduct().getQuantity()) {
                throw new IllegalArgumentException(
                        "Stock insuffisant pour le produit : " + op.getProduct().getName()
                );
            }
        }
        return orderRepository.save(order);
    }

    @Override
    public List<OrderDetailDTO> getOrderdetails(String orderId) {
        log.info("Fetching OrderDetails for Order ID: {}", orderId);

        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            log.warn("Order not found with ID: {}", orderId);
            return new ArrayList<>();
        }

        List<String> customProductIds = order.getCustomproductsids();
        if (customProductIds == null || customProductIds.isEmpty()) {
            log.info("No custom products found for Order ID: {}", orderId);
            return new ArrayList<>();
        }

        log.info("Custom product IDs: {}", customProductIds);

        // Convert String IDs to ObjectId
        List<ObjectId> objectIds = customProductIds.stream()
                .map(ObjectId::new)
                .collect(Collectors.toList());

        log.info("Converted ObjectIds: {}", objectIds);

        List<OrderDetail> orderDetails = orderDetailRepository.findByIdIn(objectIds);

        log.info("Fetched OrderDetails count: {}", orderDetails.size());
        orderDetails.forEach(detail -> log.info("OrderDetail: {}", detail));

        // Map to DTO
        List<OrderDetailDTO> orderDetailDTOS = orderDetails.stream()
                .map(detail -> modelMapper.map(detail, OrderDetailDTO.class))
                .collect(Collectors.toList());

        return orderDetailDTOS;
    }
    @Override
    public List<MixedProduct> getmixedproducts(String clientId) {
        List<MixedProduct> mixedProducts = new ArrayList<>();

        // 1️⃣ Récupérer les custom products
        List<OrderDetail> customProducts = this.getMycustomProducts(clientId);
        List<MixedProduct> mixedCustoms = customProducts.stream()
                .map(c -> {
                    MixedProduct mp = modelMapper.map(c, MixedProduct.class);
                    mp.setQuantity(c.getQuantity()); // s'assurer que la quantité est copiée
                    return mp;
                })
                .collect(Collectors.toList());

        // 2️⃣ Récupérer les commandes du client
        List<OrderDTO> myOrders = this.getMyOrders(clientId);

        // 3️⃣ Mapper les produits classiques
        for (OrderDTO order : myOrders) {
            if (order.getProducts() != null) {
                List<MixedProduct> orderProducts = order.getProducts().stream()
                        .map(p -> {
                            MixedProduct mp = new MixedProduct();
                            mp.setId(p.getProduct().getId());
                            mp.setReference(p.getProduct().getName()); // ou Reference si tu préfères
                            mp.setQuantity(p.getQuantity());
                            return mp;
                        })
                        .collect(Collectors.toList());
                mixedProducts.addAll(orderProducts);
            }
        }

        // 4️⃣ Ajouter les custom products
        mixedProducts.addAll(mixedCustoms);

        return mixedProducts;
    }


    private String generateOrderDetailReference() {
        // Exemple : OD-20250820-UUIDcourt
        String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String shortId = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return "CUSTPROD-" + date + "-" + shortId;
    }

}
