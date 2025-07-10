package tn.epac.userservice.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import tn.epac.userservice.Entities.UserEntity;

import java.util.List;
import java.util.Optional;

public interface UserEntityRepository extends MongoRepository<UserEntity, String> {

    // Recherche par username, email ou numéro (insensible à la casse)
    @Query("{ '$or': [ " +
            "{ 'username': { $regex: ?0, $options: 'i' } }, " +
            "{ 'email': { $regex: ?0, $options: 'i' } }, " +
            "{ 'phoneNumber': { $regex: ?0, $options: 'i' } } " +
            "] }")
    List<UserEntity> searchByUsernameOrEmailOrPhoneNumber(String query);

    // findAll avec @DBRef (pas besoin de requête custom)
    List<UserEntity> findAll();  // MongoDB chargera les DBRef automatiquement
}
