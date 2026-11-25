package urfu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import urfu.backend.DTO.FileRequest;
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
    public ResidentialComplex getById(@PathVariable UUID id) {
        return service.getById(id);
    }

    @Operation(summary = "Обновить данные ЖК")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable UUID id, @Valid @RequestBody ResidentialComplexRequest request) {
        service.update(id, request);
    }

    @Operation(summary = "Удалить ЖК")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }

    //Рендер
    @Operation(summary = "Загрузить рендер ЖК (изображение)")
    @PostMapping(value = "/{id}/render", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void uploadRender(@PathVariable UUID id,
                             @RequestPart("file") MultipartFile file) {
        service.uploadRender(id, file);
    }

    @Operation(summary = "Скачать рендер ЖК")
    @GetMapping("/{id}/render")
    public ResponseEntity<byte[]> getRender(@PathVariable UUID id) {
        FileRequest f = service.getRender(id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(f.contentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.inline()
                                .filename(f.filename())
                                .build()
                                .toString())
                .body(f.data());
    }

    @Operation(summary = "Удалить рендер ЖК")
    @DeleteMapping("/{id}/render")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRender(@PathVariable UUID id) {
        service.deleteRender(id);
    }

    //Презентация
    @Operation(summary = "Загрузить презентацию ЖК (PDF)")
    @PostMapping(value = "/{id}/presentation", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void uploadPresentation(@PathVariable UUID id,
                                   @RequestPart("file") MultipartFile file) {
        service.uploadPresentation(id, file);
    }

    @Operation(summary = "Скачать презентацию ЖК")
    @GetMapping("/{id}/presentation")
    public ResponseEntity<byte[]> getPresentation(@PathVariable UUID id) {
        FileRequest f = service.getPresentation(id);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment()
                                .filename(f.filename())
                                .build()
                                .toString())
                .body(f.data());
    }

    @Operation(summary = "Удалить презентацию ЖК")
    @DeleteMapping("/{id}/presentation")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePresentation(@PathVariable UUID id) {
        service.deletePresentation(id);
    }
}