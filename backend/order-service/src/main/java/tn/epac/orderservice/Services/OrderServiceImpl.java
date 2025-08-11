package tn.epac.orderservice.Services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import tn.epac.orderservice.DTO.OrderDTO;
import tn.epac.orderservice.Entities.Order;
import tn.epac.orderservice.Entities.OrderProduct;
import tn.epac.orderservice.Entities.Product;
import tn.epac.orderservice.Repository.OrderRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;
    private final SequenceGeneratorService sequenceGenerator;
    @Override
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = modelMapper.map(orderDTO, Order.class);
        order.setCreatedDate(LocalDate.now());
        return modelMapper.map(orderRepository.save(order), OrderDTO.class);
    }

    @Override
    public OrderDTO creategeneralOrder(OrderDTO orderDTO) {
        Order order = modelMapper.map(orderDTO, Order.class);

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
        return modelMapper.map(orderRepository.save(order), OrderDTO.class);
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
}
