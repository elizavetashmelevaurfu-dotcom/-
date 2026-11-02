package urfu.backend.mapper;

import org.springframework.stereotype.Component;
import urfu.backend.DTO.ResidentialComplexRequest;
import urfu.backend.models.ResidentialComplex;

import java.util.ArrayList;

@Component
public class ResidentialComplexMapper {

    public ResidentialComplex toEntity(ResidentialComplexRequest request) {
        ResidentialComplex entity = new ResidentialComplex();
        updateEntity(entity, request);
        return entity;
    }

    public void updateEntity(ResidentialComplex entity, ResidentialComplexRequest request) {
        entity.setName(request.name());
        entity.setCity(request.city());

        entity.setMinArea(request.minArea());
        entity.setMaxArea(request.maxArea());
        entity.setFloor(request.Floor());
        entity.setCompletionYear(request.CompletionYear());

        entity.getMetroStations().clear();
        if (request.metroStations() != null) entity.getMetroStations().addAll(request.metroStations());

        entity.getDistricts().clear();
        if (request.districts() != null) entity.getDistricts().addAll(request.districts());

        entity.getApartmentTypes().clear();
        entity.getApartmentTypes().addAll(request.apartmentTypes());

        entity.getEuroFormats().clear();
        if (request.euroFormats() != null) entity.getEuroFormats().addAll(request.euroFormats());

        entity.getRenovationTypes().clear();
        entity.getRenovationTypes().addAll(request.renovationTypes());

        entity.getFinancialInstruments().clear();
        if (request.financialInstruments() != null) entity.getFinancialInstruments().addAll(request.financialInstruments());
    }
}