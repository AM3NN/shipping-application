package tn.epac.orderservice.Services;

import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private PredictionService predictionService;
    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO) {
        System.out.println("Creating order with data: " + orderRequestDTO);
        var prediction = predictionService.predict(orderRequestDTO);
        System.out.println("Received prediction: " + prediction);
        orderRequestDTO.setPredictedPrice(prediction.getPredictedPrice());
        orderRequestDTO.setEstimatedFabricationTime(prediction.getEstimatedFabricationTime());
        Order order = OrderMapper.toEntity(orderRequestDTO);
        System.out.println("Mapped order entity: " + order);

        Order savedOrder = orderRepository.save(order);
        System.out.println("Saved order with ID: " + savedOrder.getId());

        OrderResponseDTO responseDTO = OrderMapper.toDTO(savedOrder);
        System.out.println("Returning OrderResponseDTO: " + responseDTO);

        return responseDTO;
    }


    @Override
    public List<OrderResponseDTO> getAllOrders() {
        System.out.println("Fetching all orders");
        List<OrderResponseDTO> orders = orderRepository.findAll()
                .stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
        System.out.println("Found " + orders.size() + " orders");
        return orders;
    }
    @Override
    public OrderResponseDTO updateOrder(String id, OrderRequestDTO dto) {
        Order existing = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        existing.setStatus(dto.getStatus());
        existing.setShippingMethod(dto.getShippingMethod());

        Order saved = orderRepository.save(existing);
        return OrderMapper.toDTO(saved);
    }

    @Override
    public void deleteOrder(String id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        orderRepository.deleteById(id);
    }

    @Override
    public OrderResponseDTO getOrderById(String id) {
        System.out.println("Fetching order by ID: " + id);
        OrderResponseDTO orderDTO = orderRepository.findById(id)
                .map(OrderMapper::toDTO)
                .orElse(null);
        System.out.println("Found order: " + orderDTO);
        return orderDTO;
    }
}

