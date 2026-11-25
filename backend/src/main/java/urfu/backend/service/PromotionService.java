package urfu.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import urfu.backend.DTO.PromotionRequest;
import urfu.backend.DTO.PromotionResponse;
import urfu.backend.exciption.PromotionNotFoundException;
import urfu.backend.exciption.ResidentialComplexNotFoundException;
import urfu.backend.mapper.PromotionMapper;
import urfu.backend.models.Promotion;
import urfu.backend.models.ResidentialComplex;
import urfu.backend.repository.PromotionRepository;
import urfu.backend.repository.ResidentialComplexRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PromotionService {

    private final PromotionRepository repository;
    private final ResidentialComplexRepository complexRepository;
    private final PromotionMapper mapper;

    @Transactional
    public UUID create(PromotionRequest request) {
        ResidentialComplex complex = complexRepository.findById(request.residentialComplexId())
                .orElseThrow(() -> new ResidentialComplexNotFoundException(request.residentialComplexId()));
        return repository.save(mapper.toEntity(request, complex)).getId();
    }

    @Transactional(readOnly = true)
    public PromotionResponse getById(UUID id) {
        return mapper.toResponse(find(id));
    }

    @Transactional
    public void update(UUID id, PromotionRequest request) {
        Promotion entity = find(id);
        ResidentialComplex complex = complexRepository.findById(request.residentialComplexId())
                .orElseThrow(() -> new ResidentialComplexNotFoundException(request.residentialComplexId()));
        mapper.updateEntity(entity, request, complex);
    }

    @Transactional
    public void delete(UUID id) {
        if (!repository.existsById(id)) {
            throw new PromotionNotFoundException(id);
        }
        repository.deleteById(id);
    }

    @Transactional
    public void setActive(UUID id, boolean active) {
        find(id).setActive(active);
    }

    @Transactional(readOnly = true)
    public List<PromotionResponse> listByCity(String city, boolean activeOnly) {
        List<Promotion> result = activeOnly
                ? repository.findByResidentialComplexCityIgnoreCaseAndActiveTrueOrderByTitleAsc(city)
                : repository.findByResidentialComplexCityIgnoreCaseOrderByTitleAsc(city);
        return result.stream().map(mapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<PromotionResponse> listAllActive() {
        return repository.findAll().stream()
                .filter(Promotion::isActive)
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<String> listCities() {
        return repository.findCitiesWithActivePromotions();
    }

    private Promotion find(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new PromotionNotFoundException(id));
    }
}
