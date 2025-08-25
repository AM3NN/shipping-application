package tn.epac.orderservice.mappers;

import tn.epac.orderservice.dto.*;
import tn.epac.orderservice.entities.Order;

public class OrderMapper {

    private OrderMapper() {
        throw new UnsupportedOperationException("OrderMapper is a utility class and cannot be instantiated");
    }

    public static Order toEntity(OrderRequestDTO dto) {
        Order order = new Order();
        order.setUserId(dto.getUserId());

        order.setStatus(dto.getStatus());
        order.setShippingMethod(dto.getShippingMethod());
        order.setShippingLocation(dto.getShippingLocation());
        order.setDeliveryLocation(dto.getDeliveryLocation());
        order.setCreatedDate(dto.getCreatedDate());
        order.setExpectedDate(dto.getExpectedDate()); // OK
        order.setClosedDate(dto.getClosedDate());
        order.setReference(dto.getReference());
        order.setType(dto.getType());
        order.setDirection(dto.getDirection());
        order.setDomain(dto.getDomain());

        order.setShippingCost(dto.getShippingCost());
        order.setShippingCurrency(dto.getShippingCurrency());
        order.setDiscount(dto.getDiscount());
        order.setDiscountCurrency(dto.getDiscountCurrency());
        order.setNetAmount(dto.getNetAmount());
        order.setNetCurrency(dto.getNetCurrency());
        order.setTax(dto.getTax());
        order.setTaxCurrency(dto.getTaxCurrency());
        order.setTotalAmount(dto.getTotalAmount());
        order.setTotalCurrency(dto.getTotalCurrency());

        order.setPredictedPrice(dto.getPredictedPrice());
        order.setEstimatedFabricationTime(dto.getEstimatedFabricationTime());

        order.setQuantity(dto.getQuantity());

        return order;
    }

    public static OrderResponseDTO toDTO(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setUserId(order.getUserId());

        dto.setId(order.getId());
        dto.setStatus(order.getStatus());
        dto.setDeliveryLocation(order.getDeliveryLocation());
        dto.setCreatedDate(order.getCreatedDate());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setTotalCurrency(order.getTotalCurrency());
        dto.setQuantity(order.getQuantity());
        dto.setExpectedDate(order.getExpectedDate());
        dto.setPredictedPrice(order.getPredictedPrice());
        dto.setEstimatedFabricationTime(order.getEstimatedFabricationTime());
        return dto;
    }
}
