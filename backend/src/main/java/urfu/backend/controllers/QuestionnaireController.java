package urfu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import urfu.backend.DTO.QuestionnaireRequest;
import urfu.backend.models.Questionnaire;
import urfu.backend.service.QuestionnaireService;

@RestController
@RequestMapping("/api/questionnaire")
@RequiredArgsConstructor
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;

    @Operation(summary = "Создать анкету")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@Valid @RequestBody QuestionnaireRequest request) {
        return questionnaireService.create(request);
    }

    @Operation(summary = "Получить анкету по ID")
    @GetMapping("/{id}")
    public Questionnaire getById(@PathVariable Long id) {
        return questionnaireService.getById(id);
    }

    @Operation(summary = "Обновить анкету")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable Long id, @Valid @RequestBody QuestionnaireRequest request) {
        questionnaireService.update(id, request);
    }

    // 👇 УДАЛЕНИЕ (теперь с проверкой прав)
    @Operation(summary = "Удалить анкету")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        questionnaireService.delete(id);
    }
}
