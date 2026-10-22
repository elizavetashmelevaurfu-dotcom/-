package urfu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import urfu.backend.models.Questionnaire;


public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Long> {

}