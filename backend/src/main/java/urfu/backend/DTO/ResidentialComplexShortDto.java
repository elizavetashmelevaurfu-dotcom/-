package urfu.backend.DTO;

import java.util.UUID;

public record ResidentialComplexShortDto(
        UUID id,
        String name,
        String city
) {}
