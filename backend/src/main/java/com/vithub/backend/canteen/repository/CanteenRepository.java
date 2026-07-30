package com.vithub.backend.canteen.repository;

import com.vithub.backend.canteen.entity.Canteen;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CanteenRepository extends JpaRepository<Canteen, UUID> {

    List<Canteen> findAllByOrderByNameAsc();

    List<Canteen> findAllByBuildingIdOrderByNameAsc(UUID buildingId);

    Optional<Canteen> findByNameIgnoreCase(String name);

    boolean existsByBuildingIdAndNameIgnoreCase(UUID buildingId, String name);

    boolean existsByBuildingIdAndNameIgnoreCaseAndIdNot(UUID buildingId, String name, UUID id);

}
