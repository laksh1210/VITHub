package com.vithub.backend.maintenance.image.repository;

import com.vithub.backend.maintenance.image.entity.MaintenanceImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MaintenanceImageRepository extends JpaRepository<MaintenanceImage, UUID> {

    /** Find all images by maintenance request, oldest first. */
    List<MaintenanceImage> findAllByMaintenanceRequestIdOrderByCreatedAtAsc(UUID maintenanceRequestId);

    /** Find image by ID is provided by JpaRepository#findById(UUID). */

    /** Delete image by ID is provided by JpaRepository#deleteById(UUID). */

}
