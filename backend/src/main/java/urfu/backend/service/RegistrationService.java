package urfu.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import urfu.backend.DTO.RegisterRequest;
import urfu.backend.DTO.RegistrationResponse;
import urfu.backend.exciption.EmailAlreadyExistsException;
import urfu.backend.exciption.UsernameAlreadyExistsException;
import urfu.backend.models.User;
import urfu.backend.models.UserStatus;
import urfu.backend.repository.UserRepository;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class RegistrationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public RegistrationResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException("Email already in use");
        }
        if (userRepository.existsByUsername(request.username())) {
            throw new UsernameAlreadyExistsException("Username already in use");
        }

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setStatus(UserStatus.ACTIVE);
        user.setCreatedAt(Instant.now());

        User savedUser = userRepository.save(user);

        return new RegistrationResponse(savedUser.getId(), savedUser.getUsername());
    }
}
