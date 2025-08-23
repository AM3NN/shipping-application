package tn.epac.orderservice.Services;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tn.epac.orderservice.DTO.OrderDetailDTO;
import tn.epac.orderservice.DTO.OrderDetaillDTO;

import java.util.Locale;

@Service
public class OpenAiService {

    private final ChatClient chatClient;

    public OpenAiService(ChatClient.Builder chatClientBuilder) {
        // construire le ChatClient Spring AI
        this.chatClient = chatClientBuilder
                .defaultAdvisors(new SimpleLoggerAdvisor())
                .build();
    }

    public Mono<OrderDetaillDTO> askModelToMap(String scrapedText) {
        String prompt = """
                Here is a text extracted from a product page:
                %s
                
                Analyze this text and fill an OrderDetailDTO JSON object with the following fields:
                id, Reference, bindingType, partStatus, securityLabel, shrinkwrap,
                threeHoleDrill, perf, productionPage, thickness, height, width,
                weight, textPaperType, coverFinishType, textColor, siren, quantity.
                
                Rules for exactness:
                - If a field is missing in the text or cannot be determined, set its value to null.
                - Extract values exactly as they appear in the text whenever possible.
                - Ensure numeric fields are numbers, boolean fields are true/false, and string fields are strings.
                - Respond only with valid JSON. Do not include any explanations, text, or comments outside the JSON.
                """.formatted(scrapedText);

        return Mono.just(chatClient.prompt()
                .user(prompt)
                .options(OpenAiChatOptions.builder()
                        .model("gpt-4o-mini")
                        .temperature(0.5)
                        .build())
                .call()
                .entity(OrderDetaillDTO.class));
    }
}
