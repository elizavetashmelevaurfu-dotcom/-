package urfu.backend.DTO;

import jakarta.validation.constraints.*;

import java.util.UUID;

public record PromotionRequest(
        @NotBlank(message = "Заголовок обязателен")
        @Size(max = 35, message = "Заголовок не длиннее 35 символов")
        String title,

        @NotBlank(message = "Описание обязательно")
        @Size(max = 80, message = "Описание не длиннее 80 символов")
        String description,

        boolean active,

        @NotNull(message = "Не указан ЖК")
        UUID residentialComplexId
) {}
