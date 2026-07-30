package com.vithub.backend.library.repository;

import com.vithub.backend.library.entity.Library;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LibraryRepository extends JpaRepository<Library, UUID> {

    List<Library> findAllByBuildingIdOrderByNameAsc(UUID buildingId);

    List<Library> findAllByOrderByNameAsc();

    boolean existsByBuildingIdAndNameIgnoreCase(UUID buildingId, String name);

    boolean existsByBuildingIdAndNameIgnoreCaseAndIdNot(UUID buildingId, String name, UUID id);

}
