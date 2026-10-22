package urfu.backend.exciption;


public class QuestionnaireNotFoundException extends BusinessException {
    public QuestionnaireNotFoundException(Long id) {
        super("SearchFilter with id %d not found".formatted(id), "FILTER_NOT_FOUND");
    }
}
