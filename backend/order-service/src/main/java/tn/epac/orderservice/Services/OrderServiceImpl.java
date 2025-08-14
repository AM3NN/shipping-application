package tn.epac.orderservice.Services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import tn.epac.orderservice.DTO.OrderDTO;
import tn.epac.orderservice.Entities.Order;
import tn.epac.orderservice.Entities.OrderDetail;
import tn.epac.orderservice.Entities.OrderProduct;
import tn.epac.orderservice.Repository.OrderRepository;
import tn.epac.orderservice.Repository.OrderdetailRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

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
    public Order createOrder(Order order, List<OrderDetail> customproducts) {
        // Save OrderDetails and collect IDs
        List<String> customProductIds = new ArrayList<>();
        for (OrderDetail detail : customproducts) {
            OrderDetail savedDetail = orderDetailRepository.save(detail);
            customProductIds.add(savedDetail.getId());
        }

        // Assign IDs to Order
        order.setCustomproductsids(customProductIds);
        return orderRepository.save(order);
    }
}
