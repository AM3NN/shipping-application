//package tn.epac.orderservice.Services;
//
//
//import org.springframework.ai.ollama.OllamaChatModel;
//import org.springframework.stereotype.Service;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class OrderChatService {
//
//    private final OllamaChatModel chatModel;
//
//    private final List<String> questions = List.of(
//            "Quel est le status de la commande ?",
//            "Quelle est la méthode d'expédition ?",
//            "Quel est le lieu d'expédition ?",
//            "Quel est le lieu de livraison ?",
//            "Quelle est la date de création (YYYY-MM-DD) ?",
//            "Quelle est la date prévue (YYYY-MM-DD) ?",
//            "Quelle est la date de clôture (YYYY-MM-DD) ?",
//            "Quel est le type de commande ?",
//            "Quelle est la direction ?",
//            "Quel est le coût d'expédition ?",
//            "Quelle est la devise du coût d'expédition ?",
//            "Quel est le montant de la remise ?",
//            "Quelle est la devise de la remise ?",
//            "Quel est le montant net ?",
//            "Quelle est la devise du montant net ?",
//            "Quel est le montant de la taxe ?",
//            "Quelle est la devise de la taxe ?",
//            "Quel est le montant total ?",
//            "Quelle est la devise du montant total ?",
//            "Quel est l'ID client ?"
//    );
//
//    private int currentQuestionIndex = 0;
//    private final Map<String, String> answers = new HashMap<>();
//
//    public OrderChatService(OllamaChatModel chatModel) {
//        this.chatModel = chatModel;
//    }
//
//    public String processUserAnswer(String userAnswer) {
//        if(currentQuestionIndex > 0) {
//            // Enregistrer la réponse précédente
//            String previousQuestion = questions.get(currentQuestionIndex - 1);
//            answers.put(previousQuestion, userAnswer);
//        }
//
//        if(currentQuestionIndex >= questions.size()) {
//            // Toutes les questions posées, construire et sauvegarder l'order
//            // (Conversion simplifiée)
//            String jsonOrder = answers.toString(); // tu peux construire un vrai JSON ici
//            currentQuestionIndex = 0;
//            answers.clear();
//            return "Commande créée avec succès : " + jsonOrder;
//        }
//
//        // Poser la prochaine question
//        String nextQuestion = questions.get(currentQuestionIndex);
//        currentQuestionIndex++;
//        return nextQuestion;
//    }
//}
//
