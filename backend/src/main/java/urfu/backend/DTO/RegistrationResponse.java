package urfu.backend.DTO;

import java.util.UUID;

public record RegistrationResponse(UUID userId, String username) {}
