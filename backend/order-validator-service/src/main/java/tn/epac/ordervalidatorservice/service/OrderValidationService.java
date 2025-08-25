package tn.epac.ordervalidatorservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tn.epac.ordervalidatorservice.model.ValidOrder;
import tn.epac.ordervalidatorservice.model.InvalidOrder;
import tn.epac.ordervalidatorservice.model.ValidationResult;
import tn.epac.ordervalidatorservice.repository.ValidOrderRepository;
import tn.epac.ordervalidatorservice.repository.InvalidOrderRepository;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class OrderValidationService {

    private static final Logger logger = LoggerFactory.getLogger(OrderValidationService.class);

    private static final String DATE_PATTERN = "yyyy-MM-dd";
    private static final String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss.SSSSSS";
    private static final String ORDER_ID = "order_id";
    private static final String ORDER_NUM = "order_num";
    private static final String PART_ID = "part_id";
    private static final String RECEPTION_DATE = "reception_date";
    private static final String EXPECTED_DATE = "expected_date";
    private static final String DELIVERY_DATE = "delivery_date";
    private static final String QUANTITY = "quantity";
    private static final String QTY_MIN = "qty_min";
    private static final String QTY_MAX = "qty_max";
    private static final String QTY_PRODUCED = "qty_produced";
    private static final String QTY_DELIVERED = "qty_delivered";
    private static final String ORDER_STATUS = "order_status";
    private static final String PRIORITY_LEVEL = "priority_level";
    private static final String UNIT_PRICE = "unit_price";
    private static final String TEXT_PAPER_TYPE = "text_paper_type";
    private static final String COVER_FINISH_TYPE = "cover_finish_type";
    private static final String ISBN13 = "isbn13";
    private static final String TITLE = "title";
    private static final String BINDING_TYPE = "binding_type";
    private static final String PART_STATUS = "part_status";
    private static final String SECURITY_LABEL = "security_label";
    private static final String SHRINKWRAP = "shrinkwrap";
    private static final String THREE_HOLE_DRILL = "three_hole_drill";
    private static final String PERF = "perf";
    private static final String PRODUCTION_PAGE = "production_page";
    private static final String THICKNESS = "thickness";
    private static final String HEIGHT = "height";
    private static final String WIDTH = "width";
    private static final String WEIGHT = "weight";
    private static final String TEXT_COLOR = "text_color";
    private static final String SIREN = "siren";
    private static final String PRODUCTS = "products";

    private static final List<String> VALID_STATUSES = Arrays.asList("INVOICED", "CREATED", "CANCELED", "SHIPPED", "PENDING", "ONPROD");
    private static final List<String> VALID_PRIORITIES = Arrays.asList("NORMAL", "HIGH", "URGENT");

    private final ValidOrderRepository validRepo;
    private final InvalidOrderRepository invalidRepo;
    private int lineNumber = 0;
    private Set<String> orderIds = new HashSet<>();
    @Value("${scraper.url:https://fakestoreapi.com/carts}")
    private String scraperUrl;
    @Value("${scraper.auth.token:}")
    private String authToken;

    @Autowired
    public OrderValidationService(ValidOrderRepository validRepo, InvalidOrderRepository invalidRepo) {
        this.validRepo = validRepo;
        this.invalidRepo = invalidRepo;
    }
    public void scrapeAndProcessOrders(String authToken) throws IOException {
        this.authToken = authToken != null ? authToken : this.authToken;
        lineNumber = 0;
        orderIds.clear();

        List<Map<String, String>> scrapedRows = scrapeOrders();

        for (Map<String, String> row : scrapedRows) {
            lineNumber++;
            ValidationResult result = validateRow(row);

            if (result.isValid()) {
                ValidOrder validOrder = toValidOrder(row);
                try {
                    validRepo.save(validOrder);
                    orderIds.add(validOrder.getOrderId());
                    logger.info("Processed valid order: order_id={}", validOrder.getOrderId());
                } catch (Exception e) {
                    InvalidOrder invalidOrder = new InvalidOrder();
                    invalidOrder.setOrderId(row.get(ORDER_ID));
                    invalidOrder.setOriginalRow(String.join(",", row.values()));
                    invalidOrder.setErrors(Collections.singletonList(formatError("Database error: " + e.getMessage(), row.get(ORDER_ID))));
                    invalidOrder.setRejectedAt(LocalDateTime.now());
                    invalidRepo.save(invalidOrder);
                    logger.warn("Rejected row {}: order_id={}, database error={}", lineNumber, row.get(ORDER_ID), e.getMessage());
                }
            } else {
                InvalidOrder invalidOrder = new InvalidOrder();
                invalidOrder.setOrderId(row.get(ORDER_ID));
                invalidOrder.setOriginalRow(String.join(",", row.values()));
                invalidOrder.setErrors(result.getErrors());
                invalidOrder.setRejectedAt(LocalDateTime.now());
                invalidRepo.save(invalidOrder);
                if (logger.isWarnEnabled()) {
                    logger.warn("Rejected row {}: order_id={}, errors={}",
                            lineNumber, row.get(ORDER_ID), result.getErrors());
                }
            }
        }
    }

    private List<Map<String, String>> scrapeOrders() throws IOException {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            if (!authToken.isEmpty()) {
                headers.set("Authorization", "Bearer " + authToken);
            }
            HttpEntity<String> entity = new HttpEntity<>(headers);
            String jsonResponse = restTemplate.exchange(scraperUrl, HttpMethod.GET, entity, String.class).getBody();
            ObjectMapper mapper = new ObjectMapper();
            List<Map<String, Object>> carts = mapper.readValue(jsonResponse, new TypeReference<>() {});
            List<Map<String, String>> rows = new ArrayList<>();

            for (Map<String, Object> cart : carts) {
                Map<String, String> row = new HashMap<>();
                row.put(ORDER_ID, String.valueOf(cart.get("id")));

                row.put(ORDER_NUM, "CART-" + cart.get("id"));

                row.put(EXPECTED_DATE, parseFakeStoreDate(String.valueOf(cart.get("date"))));
                row.put(QUANTITY, String.valueOf(((List<?>) cart.get(PRODUCTS)).size()));
                row.put(TITLE, ((List<Map<String, Object>>) cart.get(PRODUCTS)).isEmpty()
                        ? ""
                        : String.valueOf(((List<Map<String, Object>>) cart.get(PRODUCTS)).get(0).get("productId")));
                    row.put(PART_ID, "");
                row.put(RECEPTION_DATE, "");
                row.put(DELIVERY_DATE, "");
                row.put(QTY_MIN, "0");
                row.put(QTY_MAX, "1000");
                row.put(QTY_PRODUCED, "0");
                row.put(QTY_DELIVERED, "0");
                row.put(ORDER_STATUS, "PENDING");
                row.put(PRIORITY_LEVEL, "NORMAL");
                row.put(UNIT_PRICE, "0.00");
                row.put(ISBN13, "");
                row.put(BINDING_TYPE, "");
                row.put(PART_STATUS, "");
                row.put(SECURITY_LABEL, "");
                row.put(SHRINKWRAP, "0");
                row.put(THREE_HOLE_DRILL, "0");
                row.put(PERF, "0");
                row.put(PRODUCTION_PAGE, "0");
                row.put(THICKNESS, "0.0");
                row.put(HEIGHT, "0.0");
                row.put(WIDTH, "0.0");
                row.put(WEIGHT, "0.0");
                row.put(TEXT_PAPER_TYPE, "");
                row.put(COVER_FINISH_TYPE, "");
                row.put(TEXT_COLOR, "");
                row.put(SIREN, "");
                rows.add(row);
            }

            logger.info("Scraped {} order rows from {}", rows.size(), scraperUrl);
            return rows;
        } catch (Exception e) {
            throw new IOException("Scraping failed while accessing URL: " + scraperUrl +
                    " (cause: " + e.getClass().getSimpleName() + ")", e);
        }


    }

    private String parseFakeStoreDate(String dateStr) {
        if (dateStr == null || dateStr.isEmpty()) return "";
        try {
            LocalDateTime dateTime = LocalDateTime.parse(dateStr, DateTimeFormatter.ISO_DATE_TIME);
            return dateTime.format(DateTimeFormatter.ofPattern(DATE_PATTERN));
        } catch (Exception e) {
            logger.warn("Failed to parse FakeStoreAPI date: {}", dateStr);
            return "";
        }
    }

    private ValidationResult validateRow(Map<String, String> row) {
        List<String> errors = new ArrayList<>();
        String orderId = row.get(ORDER_ID);

        if (orderIds.contains(orderId)) {
            errors.add(formatError("Duplicate order_id detected", orderId));
        }
        validateRequiredFields(row, errors);
        if (errors.isEmpty()) validateDates(row, errors);
        if (errors.isEmpty()) validateQuantities(row, errors);
        if (errors.isEmpty()) validateStatusAndPriority(row, errors);
        if (errors.isEmpty()) validateNumericFields(row, errors);

        if (!errors.isEmpty()) {
            logger.debug("Validation errors for row {} (order_id={}): {}", lineNumber, orderId, errors);
        }
        return new ValidationResult(errors.isEmpty(), errors);
    }

    private void validateRequiredFields(Map<String, String> row, List<String> errors) {
        String orderId = row.get(ORDER_ID);
        String[] requiredFields = {
                ORDER_ID, ORDER_NUM, PART_ID, RECEPTION_DATE, EXPECTED_DATE, DELIVERY_DATE, QUANTITY, QTY_MIN, QTY_MAX,
                QTY_PRODUCED, QTY_DELIVERED, ORDER_STATUS, PRIORITY_LEVEL, UNIT_PRICE, ISBN13, TITLE, BINDING_TYPE,
                PART_STATUS, SECURITY_LABEL, SHRINKWRAP, THREE_HOLE_DRILL, PERF, PRODUCTION_PAGE, THICKNESS, HEIGHT,
                WIDTH, WEIGHT, TEXT_PAPER_TYPE, COVER_FINISH_TYPE, TEXT_COLOR, SIREN
        };

        for (String field : requiredFields) {
            String value = row.get(field);
            if (isEmpty(value)) {
                errors.add(formatError(field + " is required", orderId));
            }
        }
    }

    private void validateDates(Map<String, String> row, List<String> errors) {
        String orderId = row.get(ORDER_ID);
        String expectedDate = row.get(EXPECTED_DATE);
        if (isInvalidSimpleDate(expectedDate)) {
            errors.add(formatError("expected_date must be a valid date in format " + DATE_PATTERN + " (e.g., 2025-08-20)", orderId));
        } else if (expectedDate.startsWith("00")) {
            try {
                String correctedDate = "20" + expectedDate.substring(2);
                LocalDate.parse(correctedDate, DateTimeFormatter.ofPattern(DATE_PATTERN));
            } catch (Exception e) {
                errors.add(formatError("expected_date must be a valid date after year 2000 in format " + DATE_PATTERN, orderId));
            }
        }

        if (isInvalidDate(row.get(RECEPTION_DATE))) {
            errors.add(formatError("reception_date must be a valid date in format " + DATE_PATTERN + " or " + DATE_TIME_PATTERN, orderId));
        }

        if (isInvalidDate(row.get(DELIVERY_DATE))) {
            errors.add(formatError("delivery_date must be a valid date in format " + DATE_PATTERN + " or " + DATE_TIME_PATTERN, orderId));
        }
    }

    private void validateQuantities(Map<String, String> row, List<String> errors) {
        String orderId = row.get(ORDER_ID);
        if (!isValidInteger(row.get(QUANTITY))) {
            errors.add(formatError("quantity must be a positive integer", orderId));
        }
        if (!isValidInteger(row.get(QTY_MIN))) {
            errors.add(formatError("qty_min must be a positive integer", orderId));
        }
        if (!isValidInteger(row.get(QTY_MAX))) {
            errors.add(formatError("qty_max must be a positive integer", orderId));
        }
        if (!isValidInteger(row.get(QTY_PRODUCED))) {
            errors.add(formatError("qty_produced must be a positive integer", orderId));
        }
        if (!isValidInteger(row.get(QTY_DELIVERED))) {
            errors.add(formatError("qty_delivered must be a positive integer", orderId));
        }

        if (errors.isEmpty()) {
            int quantity = Integer.parseInt(row.get(QUANTITY));
            int qtyMin = Integer.parseInt(row.get(QTY_MIN));
            int qtyMax = Integer.parseInt(row.get(QTY_MAX));
            if (quantity < qtyMin || quantity > qtyMax) {
                errors.add(formatError("quantity must be between qty_min and qty_max", orderId));
            }
        }
    }

    private void validateStatusAndPriority(Map<String, String> row, List<String> errors) {
        String orderId = row.get(ORDER_ID);
        String status = row.get(ORDER_STATUS);
        if (!isValidStatus(status)) {
            errors.add(formatError("order_status must be one of: " + String.join(", ", VALID_STATUSES) + ", found: " + status, orderId));
        }

        String priority = row.get(PRIORITY_LEVEL);
        if (!isValidPriority(priority)) {
            errors.add(formatError("priority_level must be one of: " + String.join(", ", VALID_PRIORITIES) + ", found: " + priority, orderId));
        }
    }

    private void validateNumericFields(Map<String, String> row, List<String> errors) {
        String orderId = row.get(ORDER_ID);
        if (!isValidDouble(row.get(UNIT_PRICE))) {
            errors.add(formatError("unit_price must be a valid number >= 0", orderId));
        }
        if (!isValidDouble(row.get(THICKNESS))) {
            errors.add(formatError("thickness must be a valid number >= 0", orderId));
        }
        if (!isValidDouble(row.get(HEIGHT))) {
            errors.add(formatError("height must be a valid number >= 0", orderId));
        }
        if (!isValidDouble(row.get(WIDTH))) {
            errors.add(formatError("width must be a valid number >= 0", orderId));
        }
        if (!isValidDouble(row.get(WEIGHT))) {
            errors.add(formatError("weight must be a valid number >= 0", orderId));
        }
        if (!isValidInteger(row.get(PRODUCTION_PAGE))) {
            errors.add(formatError("production_page must be a positive integer", orderId));
        }
        if (!isValidInteger(row.get(SHRINKWRAP))) {
            errors.add(formatError("shrinkwrap must be a positive integer", orderId));
        }
        if (!isValidInteger(row.get(THREE_HOLE_DRILL))) {
            errors.add(formatError("three_hole_drill must be a positive integer", orderId));
        }
        if (!isValidInteger(row.get(PERF))) {
            errors.add(formatError("perf must be a positive integer", orderId));
        }
    }

    private String formatError(String message, String orderId) {
        return String.format("Row %d (order_id=%s): %s", lineNumber, isEmpty(orderId) ? "N/A" : orderId, message);
    }

    private boolean isEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }

    private boolean isInvalidDate(String dateStr) {
        if (isEmpty(dateStr)) return true;
        try {
            LocalDateTime.parse(dateStr, DateTimeFormatter.ofPattern(DATE_TIME_PATTERN));
            return false;
        } catch (Exception e1) {
            try {
                LocalDate.parse(dateStr, DateTimeFormatter.ofPattern(DATE_PATTERN));
                return false;
            } catch (Exception e2) {
                return true;
            }
        }
    }

    private boolean isInvalidSimpleDate(String dateStr) {
        if (isEmpty(dateStr)) return true;
        try {
            LocalDate.parse(dateStr, DateTimeFormatter.ofPattern(DATE_PATTERN));
            return false;
        } catch (Exception e) {
            return true;
        }
    }

    private boolean isValidInteger(String value) {
        if (isEmpty(value)) return false;
        try {
            return Integer.parseInt(value) >= 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean isValidDouble(String value) {
        if (isEmpty(value)) return false;
        try {
            return Double.parseDouble(value) >= 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean isValidStatus(String status) {
        return !isEmpty(status) && VALID_STATUSES.contains(status.trim().toUpperCase());
    }

    private boolean isValidPriority(String priority) {
        return !isEmpty(priority) && VALID_PRIORITIES.contains(priority.trim().toUpperCase());
    }

    private ValidOrder toValidOrder(Map<String, String> row) {
        ValidOrder order = new ValidOrder();
        order.setOrderId(row.get(ORDER_ID));
        order.setOrderNum(row.get(ORDER_NUM));
        order.setExpectedDate(parseLocalDate(row.get(EXPECTED_DATE)));
        order.setReceptionDate(parseLocalDateTime(row.get(RECEPTION_DATE)));
        order.setDeliveryDate(parseLocalDateTime(row.get(DELIVERY_DATE)));
        order.setQuantity(parseInteger(row.get(QUANTITY)));
        order.setQtyMin(parseInteger(row.get(QTY_MIN)));
        order.setQtyMax(parseInteger(row.get(QTY_MAX)));
        order.setQtyProduced(parseInteger(row.get(QTY_PRODUCED)));
        order.setQtyDelivered(parseInteger(row.get(QTY_DELIVERED)));
        order.setPriorityLevel(row.get(PRIORITY_LEVEL));
        order.setOrderStatus(row.get(ORDER_STATUS));
        order.setPartId(row.get(PART_ID));
        order.setIsbn13(row.get(ISBN13));
        order.setTitle(row.get(TITLE));
        order.setBindingType(row.get(BINDING_TYPE));
        order.setPartStatus(row.get(PART_STATUS));
        order.setSecurityLabel(row.get(SECURITY_LABEL));
        order.setShrinkwrap(parseInteger(row.get(SHRINKWRAP)));
        order.setThreeHoleDrill(parseInteger(row.get(THREE_HOLE_DRILL)));
        order.setPerf(parseInteger(row.get(PERF)));
        order.setProductionPage(parseInteger(row.get(PRODUCTION_PAGE)));
        order.setThickness(parseDouble(row.get(THICKNESS)));
        order.setHeight(parseDouble(row.get(HEIGHT)));
        order.setWidth(parseDouble(row.get(WIDTH)));
        order.setWeight(parseDouble(row.get(WEIGHT)));
        order.setTextPaperType(row.get(TEXT_PAPER_TYPE));
        order.setCoverFinishType(row.get(COVER_FINISH_TYPE));
        order.setTextColor(row.get(TEXT_COLOR));
        order.setSiren(row.get(SIREN));
        order.setUnitPrice(parseBigDecimal(row.get(UNIT_PRICE)));
        return order;
    }

    private LocalDate parseLocalDate(String dateStr) {
        if (isEmpty(dateStr)) {
            logger.warn("Empty or invalid date: {}", dateStr);
            return null;
        }
        try {
            String correctedDate = dateStr.startsWith("00") ? "20" + dateStr.substring(2) : dateStr;
            return LocalDate.parse(correctedDate, DateTimeFormatter.ofPattern(DATE_PATTERN));
        } catch (Exception e) {
            logger.warn("Failed to parse date: {}", dateStr, e);
            return null;
        }
    }

    private LocalDateTime parseLocalDateTime(String dateStr) {
        if (isEmpty(dateStr)) {
            logger.warn("Empty or invalid date/time: {}", dateStr);
            return null;
        }
        try {
            return LocalDateTime.parse(dateStr, DateTimeFormatter.ofPattern(DATE_TIME_PATTERN));
        } catch (Exception e1) {
            try {
                return LocalDate.parse(dateStr, DateTimeFormatter.ofPattern(DATE_PATTERN)).atStartOfDay();
            } catch (Exception e2) {
                logger.warn("Failed to parse date/time: {}", dateStr, e2);
                return null;
            }
        }
    }

    private Integer parseInteger(String value) {
        if (isEmpty(value)) {
            logger.warn("Empty or invalid integer: {}", value);
            return null;
        }
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            logger.warn("Failed to parse integer: {}", value, e);
            return null;
        }
    }

    private Double parseDouble(String value) {
        if (isEmpty(value)) {
            logger.warn("Empty or invalid double: {}", value);
            return null;
        }
        try {
            return Double.parseDouble(value);
        } catch (NumberFormatException e) {
            logger.warn("Failed to parse double: {}", value, e);
            return null;
        }
    }

    private BigDecimal parseBigDecimal(String value) {
        if (isEmpty(value)) {
            logger.warn("Empty or invalid BigDecimal: {}", value);
            return null;
        }
        try {
            return new BigDecimal(value);
        } catch (NumberFormatException e) {
            logger.warn("Failed to parse BigDecimal: {}", value, e);
            return null;
        }
    }
}