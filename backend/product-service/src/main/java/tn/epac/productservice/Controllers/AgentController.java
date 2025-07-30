package tn.epac.productservice.Controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import tn.epac.productservice.Services.AIAgent;
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/products")
public class AgentController {

    private final AIAgent agent;

    public AgentController(AIAgent agent) {
        this.agent = agent;
    }


    @GetMapping(value = "/askAgent", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> askAgent(@RequestParam(defaultValue = "hello") String query) {
        return agent.askAgent(query);
    }
}