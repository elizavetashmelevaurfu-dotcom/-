package urfu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import urfu.backend.models.ResidentialComplex;

@Repository
public interface ResidentialComplexRepository extends JpaRepository<ResidentialComplex, Long> {
}
