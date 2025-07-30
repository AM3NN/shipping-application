package tn.epac.productservice.Services;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import tn.epac.productservice.Tools.AgentTools;

@Service
public class AIAgent {
    private final ChatClient chatClient;

    public AIAgent(ChatClient.Builder chatClientBuilder , AgentTools agentTools) {
        this.chatClient = chatClientBuilder
                .defaultAdvisors(
                        new SimpleLoggerAdvisor()
                )
                .defaultTools(agentTools)
                .build();
    }

    public Flux<String> askAgent(String query) {
        return chatClient.prompt()
                .user(query)
                .stream()
                .content();
    }
}
