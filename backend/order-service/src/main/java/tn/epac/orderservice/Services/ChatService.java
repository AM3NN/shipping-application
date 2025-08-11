//package tn.epac.orderservice.Services;
//
//import org.springframework.ai.ollama.OllamaChatModel;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//@Service
//public class ChatService {
//
//    private final OllamaChatModel chatModel;
//    private final OrderChatService orderChatService;
//
//    @Autowired
//    public ChatService(OllamaChatModel chatModel, OrderChatService orderChatService) {
//        this.chatModel = chatModel;
//        this.orderChatService = orderChatService;
//    }
//
//    public String generateResponse(String userMessage, String context) {
//        if ("order".equalsIgnoreCase(context)) {
//            // Ici on ne passe pas la requête à Ollama directement, on gère la conversation
//            return orderChatService.processUserAnswer(userMessage);
//        } else {
//            // Pour contexte général, appeler Ollama directement
//            return chatModel.call(userMessage);
//        }
//    }
//}
