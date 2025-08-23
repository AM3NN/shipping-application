package tn.epac.billingservice.Services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {

    @PostConstruct
    public void init() {
        Stripe.apiKey = "sk_test_51RxSNnRveyiEnQT7zXWwh25ryiBgKOejbSEDd4UOA7B88WPA2qkWdrC3ga63sXDn7QK5Tqm3zmiUfVRATn7oGmnh002ZVOHE1P"; // clé secrète Stripe
    }

    public PaymentIntent createPaymentIntent(Long amount, String currency) throws StripeException {
        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount); // en CENTIMES (ex: 10.00€ = 1000)
        params.put("currency", currency);
        params.put("payment_method_types", List.of("card"));

        return PaymentIntent.create(params);
    }
}

