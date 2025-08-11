//package tn.epac.orderservice.Mappers;
//
//import tn.epac.orderservice.DTO.*;
//import tn.epac.orderservice.Entities.Order;
//
//public class OrderMapper {
//
//    public static Order toEntity(OrderDTO dto) {
//        Order order = new Order();
//        order.setStatus(dto.getStatus());
//        order.setShippingMethod(dto.getShippingMethod());
//        order.setShippingLocation(dto.getShippingLocation());
//        order.setDeliveryLocation(dto.getDeliveryLocation());
//        order.setCreatedDate(dto.getCreatedDate());
//        order.setExpectedDate(dto.getExpectedDate());
//        order.setClosedDate(dto.getClosedDate());
//        order.setReference(dto.getReference());
//        order.setType(dto.getType());
//        order.setDirection(dto.getDirection());
//        order.setShippingCost(dto.getShippingCost());
//        order.setShippingCurrency(dto.getShippingCurrency());
//        order.setDiscount(dto.getDiscount());
//        order.setDiscountCurrency(dto.getDiscountCurrency());
//        order.setNetAmount(dto.getNetAmount());
//        order.setNetCurrency(dto.getNetCurrency());
//        order.setTax(dto.getTax());
//        order.setTaxCurrency(dto.getTaxCurrency());
//        order.setTotalAmount(dto.getTotalAmount());
//        order.setTotalCurrency(dto.getTotalCurrency());
//        order.setClientId(dto.getClientId());
//        order.setProducts(dto.getProducts());
//        return order;
//    }
//
//    public static OrderDTO toDTO(Order order) {
//        OrderDTO dto = new OrderDTO();
//        dto.setId(order.getId());
//        dto.setStatus(order.getStatus());
//        dto.setDeliveryLocation(order.getDeliveryLocation());
//        dto.setCreatedDate(order.getCreatedDate());
//        dto.setTotalAmount(order.getTotalAmount());
//        dto.setTotalCurrency(order.getTotalCurrency());
//        dto.setClientId(order.getClientId());
//        dto.setProducts(order.getProducts());
//        return dto;
//    }
//
//}
