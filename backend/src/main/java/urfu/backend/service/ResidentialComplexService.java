package urfu.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import urfu.backend.DTO.FileRequest;
import urfu.backend.DTO.ResidentialComplexRequest;
import urfu.backend.exciption.InvalidFileException;
import urfu.backend.exciption.InvalidFilterRangeException;
import urfu.backend.exciption.QuestionnaireNotFoundException;
import urfu.backend.exciption.ResidentialComplexNotFoundException;
import urfu.backend.mapper.ResidentialComplexMapper;
import urfu.backend.models.ResidentialComplex;
import urfu.backend.repository.ResidentialComplexRepository;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResidentialComplexService {

    private static final long MAX_RENDER_BYTES = 10L * 1024 * 1024;   // 10 MB
    private static final long MAX_PRESENTATION_BYTES = 50L * 1024 * 1024; // 50 MB

    private final ResidentialComplexRepository repository;
    private final ResidentialComplexMapper mapper;

    @Transactional
    public UUID create(ResidentialComplexRequest request) {
        validateRanges(request);
        ResidentialComplex entity = mapper.toEntity(request);
        return repository.save(entity).getId();
    }

    @Transactional(readOnly = true)
    public ResidentialComplex getById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new QuestionnaireNotFoundException(id));
    }

    @Transactional
    public void update(UUID id, ResidentialComplexRequest request) {
        validateRanges(request);
        ResidentialComplex entity = repository.findById(id)
                .orElseThrow(() -> new QuestionnaireNotFoundException(id));

        mapper.updateEntity(entity, request);
    }

    @Transactional
    public void delete(UUID id) {
        if (!repository.existsById(id)) {
            throw new QuestionnaireNotFoundException(id);
        }
        repository.deleteById(id);
    }

    //Рендер
    @Transactional
    public void uploadRender(UUID id, MultipartFile file) {
        byte[] bytes = readFile(file, MAX_RENDER_BYTES);
        if (file.getContentType() == null || !file.getContentType().startsWith("image/")) {
            throw new InvalidFileException("Рендер должен быть изображением (image/*)");
        }

        ResidentialComplex entity = repository.findById(id)
                .orElseThrow(() -> new ResidentialComplexNotFoundException(id));
        entity.setRenderPhoto(bytes);
        entity.setRenderPhotoFilename(file.getOriginalFilename());
        entity.setRenderPhotoContentType(file.getContentType());
    }

    @Transactional
    public void deleteRender(UUID id) {
        ResidentialComplex entity = repository.findById(id)
                .orElseThrow(() -> new ResidentialComplexNotFoundException(id));
        entity.setRenderPhoto(null);
        entity.setRenderPhotoFilename(null);
        entity.setRenderPhotoContentType(null);
    }

    @Transactional(readOnly = true)
    public FileRequest getRender(UUID id) {
        ResidentialComplex entity = repository.findById(id)
                .orElseThrow(() -> new ResidentialComplexNotFoundException(id));
        if (entity.getRenderPhoto() == null) {
            throw new InvalidFileException("У ЖК нет рендера");
        }
        return new FileRequest(
                entity.getRenderPhoto(),
                entity.getRenderPhotoFilename(),
                entity.getRenderPhotoContentType()
        );
    }

    //Презентация
    @Transactional
    public void uploadPresentation(UUID id, MultipartFile file) {
        byte[] bytes = readFile(file, MAX_PRESENTATION_BYTES);
        if (!"application/pdf".equals(file.getContentType())) {
            throw new InvalidFileException("Презентация должна быть PDF");
        }

        ResidentialComplex entity = repository.findById(id)
                .orElseThrow(() -> new ResidentialComplexNotFoundException(id));
        entity.setPresentationPdf(bytes);
        entity.setPresentationFilename(file.getOriginalFilename());
    }

    @Transactional
    public void deletePresentation(UUID id) {
        ResidentialComplex entity = repository.findById(id)
                .orElseThrow(() -> new ResidentialComplexNotFoundException(id));
        entity.setPresentationPdf(null);
        entity.setPresentationFilename(null);
    }

    @Transactional(readOnly = true)
    public FileRequest getPresentation(UUID id) {
        ResidentialComplex entity = repository.findById(id)
                .orElseThrow(() -> new ResidentialComplexNotFoundException(id));
        if (entity.getPresentationPdf() == null) {
            throw new InvalidFileException("У ЖК нет презентации");
        }
        return new FileRequest(
                entity.getPresentationPdf(),
                entity.getPresentationFilename(),
                "application/pdf"
        );
    }

    private void validateRanges(ResidentialComplexRequest request) {
        if (request.minArea() > request.maxArea()) {
            throw new InvalidFilterRangeException("Минимальная площадь не может быть больше максимальной");
        }
    }

    private byte[] readFile(MultipartFile file, long maxBytes) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileException("Файл не передан или пуст");
        }
        if (file.getSize() > maxBytes) {
            throw new InvalidFileException("Файл слишком большой (макс. " + maxBytes + " байт)");
        }
        try {
            return file.getBytes();
        } catch (IOException e) {
            throw new InvalidFileException("Не удалось прочитать файл: " + e.getMessage());
        }
    }
}