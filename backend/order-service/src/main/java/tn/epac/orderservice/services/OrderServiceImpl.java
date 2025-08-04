package tn.epac.orderservice.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.epac.orderservice.dto.OrderRequestDTO;
import tn.epac.orderservice.dto.OrderResponseDTO;
import tn.epac.orderservice.entities.Order;
import tn.epac.orderservice.exceptions.OrderNotFoundException;
import tn.epac.orderservice.mappers.OrderMapper;
import tn.epac.orderservice.repository.OrderRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);


    private final OrderRepository orderRepository;
    private final SequenceGeneratorService sequenceGeneratorService;
    private final PredictionService predictionService;


    // Constructor injection for all dependencies
    public OrderServiceImpl(PredictionService predictionService,
                            OrderRepository orderRepository,
                            SequenceGeneratorService sequenceGeneratorService) {
        this.predictionService = predictionService;
        this.orderRepository = orderRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO) {
        logger.info("Creating order with data: {}", orderRequestDTO);

        // Get prediction data
        var prediction = predictionService.predict(orderRequestDTO);
        logger.debug("Received prediction: {}", prediction);
        orderRequestDTO.setPredictedPrice(prediction.getPredictedPrice());
        orderRequestDTO.setEstimatedFabricationTime(prediction.getEstimatedFabricationTime());

        // Map DTO to entity
        Order order = OrderMapper.toEntity(orderRequestDTO);

        // Set the auto-incremented integer ID using the sequence generator
        int newId = sequenceGeneratorService.getNextSequence("orders_sequence");
        order.setId(newId);

        logger.debug("Mapped order entity with new ID: {}", order);

        // Save order to database
        Order savedOrder = orderRepository.save(order);
        logger.info("Saved order with ID: {}", savedOrder.getId());

        // Map entity to response DTO
        OrderResponseDTO responseDTO = OrderMapper.toDTO(savedOrder);
        logger.debug("Returning OrderResponseDTO: {}", responseDTO);

        return responseDTO;
    }

    @Override
    public List<OrderResponseDTO> getAllOrders() {
        logger.info("Fetching all orders");
        List<OrderResponseDTO> orders = orderRepository.findAll()
                .stream()
                .map(OrderMapper::toDTO)
                .toList();

        logger.info("Found {} orders", orders.size());
        return orders;
    }

    @Override
    public OrderResponseDTO updateOrder(int id, OrderRequestDTO dto) {
        Order existing = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        existing.setStatus(dto.getStatus());
        existing.setShippingMethod(dto.getShippingMethod());

        Order saved = orderRepository.save(existing);
        return OrderMapper.toDTO(saved);
    }

    @Override
    public void deleteOrder(int id) {
        if (!orderRepository.existsById(id)) {
            throw new OrderNotFoundException("Order not found with id: " + id);
        }
        orderRepository.deleteById(id);
    }


    @Override
    public OrderResponseDTO getOrderById(int id) {
        logger.info("Fetching order by ID: {}", id);
        OrderResponseDTO orderDTO = orderRepository.findById(id)
                .map(OrderMapper::toDTO)
                .orElse(null);
        logger.info("Found order: {}", orderDTO);
        return orderDTO;
    }
}
