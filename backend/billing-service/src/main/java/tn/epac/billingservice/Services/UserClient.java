package tn.epac.billingservice.Services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.epac.billingservice.DTO.OrderDTO;
import tn.epac.billingservice.DTO.UserProfileDto;
import tn.epac.billingservice.feign.OrderFeignConfig;
import tn.epac.billingservice.feign.UserFeignConfig;

import java.util.List;

@FeignClient(name = "user-service", configuration = UserFeignConfig.class)
public interface UserClient {

    @GetMapping("/api/users/{userId}/profile")
    UserProfileDto getUserProfile(@PathVariable("userId") String userId);
}