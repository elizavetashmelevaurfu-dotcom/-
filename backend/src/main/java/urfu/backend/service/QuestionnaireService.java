package urfu.backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import urfu.backend.DTO.QuestionnaireRequest;
import urfu.backend.exciption.InvalidFilterRangeException;
import urfu.backend.exciption.QuestionnaireNotFoundException;
import urfu.backend.mapper.mapperQuestionnaireRequest;
import urfu.backend.models.Questionnaire;
import urfu.backend.repository.QuestionnaireRepository;


@Service
@RequiredArgsConstructor
public class QuestionnaireService {

    private final QuestionnaireRepository questionnaireRepository;
    private final mapperQuestionnaireRequest mapperQuestionnaireRequest;

    @Transactional
    public Long create(QuestionnaireRequest request) {
        validateRanges(request);

        Questionnaire entity = mapperQuestionnaireRequest.toEntity(request);
        Questionnaire saved = questionnaireRepository.save(entity);

        return saved.getId();
    }

    @Transactional(readOnly = true)
    public Questionnaire getById(Long id) {
        return questionnaireRepository.findById(id)
                .orElseThrow(() -> new QuestionnaireNotFoundException(id));
    }

    @Transactional
    public void delete(Long id) {
        if (!questionnaireRepository.existsById(id)) {
            throw new QuestionnaireNotFoundException(id);
        }
        questionnaireRepository.deleteById(id);
    }

    private void validateRanges(QuestionnaireRequest request) {
        if (request.minArea() > request.maxArea()) {
            throw new InvalidFilterRangeException("minArea не может быть больше maxArea");
        }
        if (request.minFloor() > request.maxFloor()) {
            throw new InvalidFilterRangeException("minFloor не может быть больше maxFloor");
        }
        if (request.minCompletionYear() > request.maxCompletionYear()) {
            throw new InvalidFilterRangeException("minCompletionYear не может быть больше maxCompletionYear");
        }
    }
}