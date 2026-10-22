package urfu.backend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import urfu.backend.DTO.QuestionnaireRequest;
import urfu.backend.service.QuestionnaireService;

@RestController
@RequestMapping("/api/form")
@RequiredArgsConstructor
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@Valid @RequestBody QuestionnaireRequest request) {
        return questionnaireService.create(request);
    }
}
