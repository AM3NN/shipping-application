package tn.epac.productservice.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith; // Permet d’ajouter des extensions JUnit (ex: Mockito)
import org.mockito.InjectMocks; // Injection des mocks dans l’objet testé
import org.mockito.Mock; // Création d’un mock (objet simulé)
import org.mockito.junit.jupiter.MockitoExtension; // Extension pour utiliser Mockito avec JUnit 5
import org.springframework.http.MediaType; // Pour définir le type MIME des requêtes
import org.springframework.test.context.ActiveProfiles; // Pour choisir un profil Spring spécifique (ex: test)
import org.springframework.test.web.servlet.MockMvc; // Simule des requêtes HTTP pour tester les controllers
import org.springframework.test.web.servlet.setup.MockMvcBuilders; // Configure MockMvc avec un controller ou plus
import tn.epac.productservice.DTO.InventoryDTO;
import tn.epac.productservice.Exceptions.ResourceNotFoundException;
import tn.epac.productservice.Services.IInventoryservice;

import java.util.List;

import static org.mockito.Mockito.*; // Import statique des méthodes Mockito (when, any, etc.)
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*; // Import statique pour les requêtes HTTP simulées (get, post, etc.)
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*; // Import statique pour vérifier les résultats (status, jsonPath, etc.)

@ActiveProfiles("test") // Indique que ce test s’exécute sous le profil Spring "test", utile pour config dédiée
@ExtendWith(MockitoExtension.class) // Active l’extension Mockito dans ce test (gestion automatique des mocks)
class InventoryControllerTest {

    private MockMvc mockMvc; // Objet principal pour simuler les appels HTTP vers le controller

    @Mock
    private IInventoryservice inventoryService;
    // Crée un mock (objet simulé) pour le service d’inventaire, pas d’appel réel à la BDD

    @InjectMocks
    private InventoryController inventoryController;
    // Crée une instance d’InventoryController et injecte le mock "inventoryService" dedans

    private ObjectMapper objectMapper = new ObjectMapper();
    // Utilisé pour convertir les objets Java en JSON et inversement (utile pour body des requêtes)

    private InventoryDTO sampleInventoryDTO;
    // Exemple d’objet DTO pour les tests

    @BeforeEach
    void setup() {
        // Initialise MockMvc avec le controller à tester, sans lancer tout le contexte Spring
        // setControllerAdvice permet d’ajouter un gestionnaire d’exceptions global (si tu en as un)
        mockMvc = MockMvcBuilders.standaloneSetup(inventoryController)
                .setControllerAdvice(new ResourceNotFoundException("Inventory not found")) // Note: ici tu dois passer un vrai handler global, pas une exception
                .build();

        // Création d’un exemple de DTO d’inventaire à utiliser dans les tests
        sampleInventoryDTO = new InventoryDTO("1","aa","ee", 5, 10, "W1", "P1");
    }

    @Test
    void testGetInventoryByIdFound() throws Exception {
        // Mockito : quand inventoryService.getInventoryById("1") est appelé, renvoyer sampleInventoryDTO
        when(inventoryService.getInventoryById("1")).thenReturn(sampleInventoryDTO);

        // Simule un GET sur /api/inventories/1
        mockMvc.perform(get("/api/inventories/1"))
                .andExpect(status().isOk()) // Vérifie que le status HTTP est 200 OK
                .andExpect(jsonPath("$.id").value("1")) // Vérifie que le JSON retourné contient "id": "1"
                .andExpect(jsonPath("$.availableQuantity").value(10)); // Vérifie la valeur d'un autre champ JSON
    }

    @Test
    void testCreateInventory() throws Exception {
        // Mock la méthode createInventory pour retourner sampleInventoryDTO peu importe l'entrée (any())
        when(inventoryService.createInventory(any())).thenReturn(sampleInventoryDTO);

        // Simule un POST sur /api/inventories avec un corps JSON converti depuis sampleInventoryDTO
        mockMvc.perform(post("/api/inventories")
                        .contentType(MediaType.APPLICATION_JSON) // Indique que le contenu envoyé est du JSON
                        .content(objectMapper.writeValueAsString(sampleInventoryDTO))) // Convertit l'objet Java en JSON
                .andExpect(status().isOk()) // Vérifie que la réponse est 200 OK
                .andExpect(jsonPath("$.id").value("1")) // Vérifie champ id dans la réponse JSON
                .andExpect(jsonPath("$.availableQuantity").value(10)); // Vérifie champ disponible
    }

    @Test
    void testGetAllInventories() throws Exception {
        // Simule le retour d’une liste contenant sampleInventoryDTO quand getAllInventories est appelé
        when(inventoryService.getAllInventories()).thenReturn(List.of(sampleInventoryDTO));

        // Simule un GET sur /api/inventories
        mockMvc.perform(get("/api/inventories"))
                .andExpect(status().isOk()) // Vérifie que la réponse est 200 OK
                .andExpect(jsonPath("$.size()").value(1)) // Vérifie que la liste JSON contient 1 élément
                .andExpect(jsonPath("$[0].id").value("1")); // Vérifie l’id du premier élément dans la liste
    }
}
