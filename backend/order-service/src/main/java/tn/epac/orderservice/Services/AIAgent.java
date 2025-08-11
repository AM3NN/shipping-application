package tn.epac.orderservice.Services;

import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Flux;
import tn.epac.orderservice.Tools.AgentTools;
import reactor.util.retry.Retry;

import java.time.Duration;
@Service
public class AIAgent {

    private final ChatClient chatClient;

    public AIAgent(ChatClient.Builder chatClientBuilder, AgentTools agentTools) {
        this.chatClient = chatClientBuilder
                .defaultAdvisors(new SimpleLoggerAdvisor())
                .defaultTools(agentTools)
                .build();
    }

    @RateLimiter(name = "openai", fallbackMethod = "fallbackResponse")
    public Flux<String> askAgent(String query) {
        return chatClient.prompt()
                .user(query)
                .stream()
                .content()
                .retryWhen(
                        Retry.backoff(3, Duration.ofSeconds(2))
                                .filter(ex -> ex instanceof WebClientResponseException.TooManyRequests)
                );
    }

    public Flux<String> fallbackResponse(String query, Throwable t) {
        return Flux.just("OpenAI est surchargé, veuillez réessayer plus tard.");
    }
}
