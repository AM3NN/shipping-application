//package tn.epac.orderservice.Services;
//
//import org.springframework.ai.chat.model.ChatResponse;
//import org.springframework.ai.chat.prompt.Prompt;
//import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
//import org.springframework.stereotype.Service;
//import org.springframework.ai.chat.messages.Message;
//import org.springframework.ai.chat.messages.UserMessage; // Import UserMessage
//import reactor.core.publisher.Flux;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class ChatbotService {
//
//    private final VertexAiGeminiChatModel chatModel;
//
//    public ChatbotService(VertexAiGeminiChatModel chatModel) {
//        this.chatModel = chatModel;
//    }
//
//    /**
//     * Envoie un prompt multi-turn et reçoit la réponse en streaming
//     * @param conversationHistory liste de messages (questions et réponses) précédents
//     * @param userMessage nouveau message utilisateur
//     * @return Flux des réponses partielles
//     */
//    public Flux<String> sendMultiTurnMessageStreaming(List<Message> conversationHistory, String userMessage) {
//        // Construire le prompt avec l'historique + nouveau message humain
//        List<Message> messages = new ArrayList<>(conversationHistory);
//        messages.add(new UserMessage(userMessage)); // Use UserMessage instead of Message.ofHuman
//        Prompt prompt = new Prompt(messages);
//
//        // Stream la réponse
//        return chatModel.stream(prompt)
//                .map(chatResponse -> chatResponse.getResults().getFirst().getOutput().getText());
//    }}