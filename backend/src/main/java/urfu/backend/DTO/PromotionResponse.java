package urfu.backend.DTO;

import java.util.UUID;

public record PromotionResponse(
        UUID id,
        String title,
        String description,
        boolean active,
        UUID complexId,
        String complexName,
        String complexCity
) {}
