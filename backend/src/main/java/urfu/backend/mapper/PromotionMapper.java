package urfu.backend.mapper;

import org.springframework.stereotype.Component;
import urfu.backend.DTO.PromotionRequest;
import urfu.backend.DTO.PromotionResponse;
import urfu.backend.models.Promotion;
import urfu.backend.models.ResidentialComplex;

@Component
public class PromotionMapper {

    public Promotion toEntity(PromotionRequest request, ResidentialComplex complex) {
        Promotion entity = new Promotion();
        entity.setTitle(request.title());
        entity.setDescription(request.description());
        entity.setActive(request.active());
        entity.setResidentialComplex(complex);
        return entity;
    }

    public void updateEntity(Promotion entity, PromotionRequest request, ResidentialComplex complex) {
        entity.setTitle(request.title());
        entity.setDescription(request.description());
        entity.setActive(request.active());
        entity.setResidentialComplex(complex);
    }

    public PromotionResponse toResponse(Promotion entity) {
        ResidentialComplex rc = entity.getResidentialComplex();
        return new PromotionResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.isActive(),
                rc.getId(),
                rc.getName(),
                rc.getCity()
        );
    }
}
