package urfu.backend.DTO;

import jakarta.validation.constraints.*;

import java.util.List;

public record ResidentialComplexRequest(
        @NotBlank(message = "Название ЖК обязательно")
        String name,

        @NotBlank(message = "Город обязателен")
        String city,

        List<String> metroStations,
        List<String> districts,

        @NotEmpty(message = "Выберите хотя бы один тип квартиры")
        List<String> apartmentTypes,
        List<String> euroFormats,

        @NotNull @Min(5) @Max(10000)
        Integer minArea,

        @NotNull @Min(5) @Max(10000)
        Integer maxArea,

        @NotNull @Min(1) @Max(100) //пока 100
        Integer Floor,

        @NotEmpty(message = "Выберите хотя бы один вид отделки")
        List<String> renovationTypes,

        List<String> financialInstruments,

        @NotNull @Min(2000) @Max(2100)
        Integer CompletionYear
) {}