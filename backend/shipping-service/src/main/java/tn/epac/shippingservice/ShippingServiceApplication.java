package tn.epac.shippingservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableDiscoveryClient
@EnableMongoRepositories(basePackages = "tn.epac.shippingservice.Repository")
@SpringBootApplication
@EnableScheduling
@EnableFeignClients(basePackages ={ "tn.epac.shippingservice.Services","tn.epac.shippingservice.feign"})
public class ShippingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShippingServiceApplication.class, args);
    }

}
