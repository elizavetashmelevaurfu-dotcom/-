package urfu.backend.exciption;


import java.util.UUID;

public class QuestionnaireNotFoundException extends BusinessException {
    public QuestionnaireNotFoundException(UUID id) {
        super("SearchFilter with id %d not found".formatted(id), "FILTER_NOT_FOUND");
    }
}
