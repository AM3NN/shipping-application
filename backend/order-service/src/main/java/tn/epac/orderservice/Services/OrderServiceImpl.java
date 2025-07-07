package tn.epac.orderservice.Services;

import org.springframework.stereotype.Service;
import tn.epac.orderservice.DTO.OrderRequestDTO;
import tn.epac.orderservice.DTO.OrderResponseDTO;
import tn.epac.orderservice.Entities.Order;
import tn.epac.orderservice.Mappers.OrderMapper;
import tn.epac.orderservice.Repository.OrderRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO) {
        Order order = OrderMapper.toEntity(orderRequestDTO);
        Order savedOrder = orderRepository.save(order);
        return OrderMapper.toDTO(savedOrder);
    }

    @Override
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDTO getOrderById(String id) {
        return orderRepository.findById(id)
                .map(OrderMapper::toDTO)
                .orElse(null);
    }
}
