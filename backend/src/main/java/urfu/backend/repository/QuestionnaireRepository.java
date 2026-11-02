package urfu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import urfu.backend.models.Questionnaire;
import urfu.backend.models.User;

import java.util.Optional;
import java.util.UUID;


public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Long> {

    public interface UserRepository extends JpaRepository<User, UUID> {
        Optional<User> findByUsername(String username);
    }

}