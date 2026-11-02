package urfu.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import urfu.backend.DTO.QuestionnaireRequest;
import urfu.backend.exciption.InvalidFilterRangeException;
import urfu.backend.exciption.QuestionnaireNotFoundException;
import urfu.backend.mapper.mapperQuestionnaireRequest;
import urfu.backend.models.Questionnaire;
import urfu.backend.models.User;
import urfu.backend.repository.QuestionnaireRepository;
import urfu.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class QuestionnaireService {

    private final QuestionnaireRepository questionnaireRepository;
    private final UserRepository userRepository; // Добавили для поиска текущего юзера
    private final mapperQuestionnaireRequest mapperQuestionnaireRequest;

    @Transactional
    public Long create(QuestionnaireRequest request) {
        validateRanges(request);

        Questionnaire entity = mapperQuestionnaireRequest.toEntity(request);

        entity.setUser(getCurrentUser());

        Questionnaire saved = questionnaireRepository.save(entity);
        return saved.getId();
    }

    @Transactional(readOnly = true)
    public Questionnaire getById(Long id) {
        Questionnaire questionnaire = questionnaireRepository.findById(id)
                .orElseThrow(() -> new QuestionnaireNotFoundException(id));

        checkOwnership(questionnaire); // Проверка, что запрашивает владелец
        return questionnaire;
    }

    @Transactional
    public void update(Long id, QuestionnaireRequest request) {
        validateRanges(request);

        Questionnaire entity = questionnaireRepository.findById(id)
                .orElseThrow(() -> new QuestionnaireNotFoundException(id));

        checkOwnership(entity);

        mapperQuestionnaireRequest.updateEntity(entity, request);
    }

    @Transactional
    public void delete(Long id) {
        Questionnaire entity = questionnaireRepository.findById(id)
                .orElseThrow(() -> new QuestionnaireNotFoundException(id));

        checkOwnership(entity);

        questionnaireRepository.delete(entity);
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

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found in DB"));
    }

    private void checkOwnership(Questionnaire questionnaire) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if (questionnaire.getUser() == null || !questionnaire.getUser().getUsername().equals(currentUsername)) {
            throw new AccessDeniedException("You do not have permission to access this questionnaire");
        }
    }
}