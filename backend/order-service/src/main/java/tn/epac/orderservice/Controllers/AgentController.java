package tn.epac.orderservice.Controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import tn.epac.orderservice.Services.AIAgent;


@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/orders")
public class AgentController {

    private final AIAgent agent;

    public AgentController(AIAgent agent) {
        this.agent = agent;
    }


    @GetMapping(value = "/askAgent", produces = MediaType.TEXT_PLAIN_VALUE)
    public Flux<String> askAgent(@RequestParam(defaultValue = "hello") String query) {
        return agent.askAgent(query);
    }
}