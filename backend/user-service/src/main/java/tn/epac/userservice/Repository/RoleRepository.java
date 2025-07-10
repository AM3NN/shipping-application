package tn.epac.userservice.Repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import tn.epac.userservice.Entities.Role;


import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByRoleName(String name);

}