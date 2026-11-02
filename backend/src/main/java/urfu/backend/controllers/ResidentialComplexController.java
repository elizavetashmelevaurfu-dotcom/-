package urfu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import urfu.backend.DTO.ResidentialComplexRequest;
import urfu.backend.models.ResidentialComplex;
import urfu.backend.service.ResidentialComplexService;

import java.util.UUID;

@Tag(name = "ResidentialComplex-controller")
@RestController
@RequestMapping("/api/complexes")
@RequiredArgsConstructor
public class ResidentialComplexController {

    private final ResidentialComplexService service;

    @Operation(summary = "Добавить новый ЖК")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UUID create(@Valid @RequestBody ResidentialComplexRequest request) {
        return service.create(request);
    }

    @Operation(summary = "Получить ЖК по ID")
    @GetMapping("/{id}")
    public ResidentialComplex getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @Operation(summary = "Обновить данные ЖК")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable Long id, @Valid @RequestBody ResidentialComplexRequest request) {
        service.update(id, request);
    }

    @Operation(summary = "Удалить ЖК")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}