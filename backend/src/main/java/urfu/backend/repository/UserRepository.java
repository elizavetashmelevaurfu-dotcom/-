package urfu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import urfu.backend.models.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}
