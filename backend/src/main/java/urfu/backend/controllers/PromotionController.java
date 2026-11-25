package urfu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import urfu.backend.DTO.PromotionRequest;
import urfu.backend.DTO.PromotionResponse;
import urfu.backend.service.PromotionService;

import java.util.List;
import java.util.UUID;

@Tag(name = "Promotion-controller")
@RestController
@RequestMapping("/api/promotions")
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService service;

    @Operation(summary = "Создать акцию")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UUID create(@Valid @RequestBody PromotionRequest request) {
        return service.create(request);
    }

    @Operation(summary = "Получить акцию по ID")
    @GetMapping("/{id}")
    public PromotionResponse getById(@PathVariable UUID id) {
        return service.getById(id);
    }

    @Operation(summary = "Обновить акцию")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable UUID id, @Valid @RequestBody PromotionRequest request) {
        service.update(id, request);
    }

    @Operation(summary = "Удалить акцию")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }

    @Operation(summary = "Активировать акцию")
    @PatchMapping("/{id}/activate")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void activate(@PathVariable UUID id) {
        service.setActive(id, true);
    }

    @Operation(summary = "Деактивировать акцию")
    @PatchMapping("/{id}/deactivate")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deactivate(@PathVariable UUID id) {
        service.setActive(id, false);
    }

    @Operation(summary = "Список акций с фильтром по городу")
    @GetMapping
    public List<PromotionResponse> list(
            @RequestParam(required = false) String city,
            @RequestParam(defaultValue = "true") boolean activeOnly) {
        return (city == null || city.isBlank())
                ? service.listAllActive()
                : service.listByCity(city.trim(), activeOnly);
    }

    @Operation(summary = "Города, в которых есть активные акции (для выпадающего списка)")
    @GetMapping("/cities")
    public List<String> cities() {
        return service.listCities();
    }
}
