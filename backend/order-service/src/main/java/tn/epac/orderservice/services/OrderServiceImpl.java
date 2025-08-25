package tn.epac.orderservice.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import tn.epac.orderservice.dto.OrderRequestDTO;
import tn.epac.orderservice.dto.OrderResponseDTO;
import tn.epac.orderservice.entities.Order;
import tn.epac.orderservice.exceptions.OrderNotFoundException;
import tn.epac.orderservice.mappers.OrderMapper;
import tn.epac.orderservice.repository.OrderRepository;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepository orderRepository;
    private final SequenceGeneratorService sequenceGeneratorService;
    private final PredictionService predictionService;

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

        var prediction = predictionService.predict(orderRequestDTO);
        logger.debug("Received prediction: {}", prediction);
        orderRequestDTO.setPredictedPrice(prediction.getPredictedPrice());
        orderRequestDTO.setEstimatedFabricationTime(prediction.getEstimatedFabricationTime());

        Order order = OrderMapper.toEntity(orderRequestDTO);

        int newId = sequenceGeneratorService.getNextSequence("orders_sequence");
        order.setId(newId);

        logger.debug("Mapped order entity with new ID: {}", order);

        Order savedOrder = orderRepository.save(order);
        logger.info("Saved order with ID: {}", savedOrder.getId());

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
    public List<OrderResponseDTO> getOrdersByUserId(String userId) {
        logger.info("Fetching orders for userId: {}", userId);
        List<OrderResponseDTO> orders = orderRepository.findByUserId(userId)
                .stream()
                .map(OrderMapper::toDTO)
                .toList();
        logger.info("Found {} orders for userId: {}", orders.size(), userId);
        return orders;
    }

    @Override
    public OrderResponseDTO getOrderById(int id) {
        logger.info("Fetching order by ID: {}", id);
        OrderResponseDTO orderDTO = orderRepository.findById(id)
                .map(OrderMapper::toDTO)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + id));
        logger.info("Found order: {}", orderDTO);
        return orderDTO;
    }

    @Override
    public OrderResponseDTO updateOrder(int id, OrderRequestDTO dto) {
        logger.info("Updating order with ID: {}", id);
        Order existing = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + id));
        existing.setUserId(dto.getUserId());
        existing.setStatus(dto.getStatus());
        existing.setTotalAmount(dto.getTotalAmount());
        existing.setQuantity(dto.getQuantity());
        existing.setCreatedDate(dto.getCreatedDate());
        existing.setExpectedDate(dto.getExpectedDate());
        existing.setClosedDate(dto.getClosedDate());
        existing.setEstimatedFabricationTime(dto.getEstimatedFabricationTime());
        existing.setDeliveryLocation(dto.getDeliveryLocation());
        existing.setPredictedPrice(dto.getPredictedPrice());
        existing.setShippingMethod(dto.getShippingMethod());

        Order saved = orderRepository.save(existing);
        logger.info("Updated order with ID: {}", saved.getId());
        return OrderMapper.toDTO(saved);
    }

    @Override
    public void deleteOrder(int id) {
        logger.info("Deleting order with ID: {}", id);
        if (!orderRepository.existsById(id)) {
            throw new OrderNotFoundException("Order not found with id: " + id);
        }
        orderRepository.deleteById(id);
        logger.info("Deleted order with ID: {}", id);
    }
}