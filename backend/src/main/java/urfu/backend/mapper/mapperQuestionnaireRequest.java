package urfu.backend.mapper;


import org.springframework.stereotype.Component;
import urfu.backend.DTO.QuestionnaireRequest;
import urfu.backend.models.Questionnaire;

import java.util.ArrayList;

@Component
public class mapperQuestionnaireRequest {

    public Questionnaire toEntity(QuestionnaireRequest request) {
        Questionnaire filter = new Questionnaire();

        filter.setCities(new ArrayList<>(request.cities()));
        filter.setDistricts(new ArrayList<>(request.districts()));
        filter.setMetroStations(request.metroStations() == null
                ? new ArrayList<>()
                : new ArrayList<>(request.metroStations()));
        filter.setApartmentTypes(new ArrayList<>(request.apartmentTypes()));

        filter.setMaxWalkTimeToMetro(request.maxWalkTimeToMetro());

        filter.setMinArea(request.minArea());
        filter.setMaxArea(request.maxArea());

        filter.setMinFloor(request.minFloor());
        filter.setMaxFloor(request.maxFloor());

        filter.setRenovation(request.renovation());
        filter.setPurchaseTimeframe(request.purchaseTimeframe());

        filter.setMinCompletionYear(request.minCompletionYear());
        filter.setMaxCompletionYear(request.maxCompletionYear());

        return filter;
    }
}