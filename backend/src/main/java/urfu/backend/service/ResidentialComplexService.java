package urfu.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import urfu.backend.DTO.ResidentialComplexRequest;
import urfu.backend.exciption.InvalidFilterRangeException;
import urfu.backend.exciption.QuestionnaireNotFoundException; // Или создайте ZhkNotFoundException
import urfu.backend.mapper.ResidentialComplexMapper;
import urfu.backend.models.ResidentialComplex;
import urfu.backend.repository.ResidentialComplexRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResidentialComplexService {

    private final ResidentialComplexRepository repository;
    private final ResidentialComplexMapper mapper;

    @Transactional
    public UUID create(ResidentialComplexRequest request) {
        validateRanges(request);
        ResidentialComplex entity = mapper.toEntity(request);
        return repository.save(entity).getId();
    }

    @Transactional(readOnly = true)
    public ResidentialComplex getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new QuestionnaireNotFoundException(id)); // Замените на ZhkNotFoundException
    }

    @Transactional
    public void update(Long id, ResidentialComplexRequest request) {
        validateRanges(request);
        ResidentialComplex entity = repository.findById(id)
                .orElseThrow(() -> new QuestionnaireNotFoundException(id)); // Замените на ZhkNotFoundException

        mapper.updateEntity(entity, request);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new QuestionnaireNotFoundException(id); // Замените на ZhkNotFoundException
        }
        repository.deleteById(id);
    }

    private void validateRanges(ResidentialComplexRequest request) {
        if (request.minArea() > request.maxArea()) {
            throw new InvalidFilterRangeException("Минимальная площадь не может быть больше максимальной");
        }
    }
}