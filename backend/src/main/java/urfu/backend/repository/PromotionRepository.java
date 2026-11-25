package urfu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import urfu.backend.models.Promotion;

import java.util.List;
import java.util.UUID;


public interface PromotionRepository extends JpaRepository<Promotion, UUID> {

    List<Promotion> findByResidentialComplexCityIgnoreCaseOrderByTitleAsc(String city);

    List<Promotion> findByResidentialComplexCityIgnoreCaseAndActiveTrueOrderByTitleAsc(String city);

    List<Promotion> findByResidentialComplexId(UUID complexId);

    @Query("""
           select distinct rc.city
           from Promotion p
           join p.residentialComplex rc
           where p.active = true
           order by rc.city
           """)
    List<String> findCitiesWithActivePromotions();
}
