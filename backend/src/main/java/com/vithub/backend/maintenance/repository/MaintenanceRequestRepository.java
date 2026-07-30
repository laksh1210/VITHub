package com.vithub.backend.maintenance.repository;

import com.vithub.backend.maintenance.entity.MaintenanceRequest;
import com.vithub.backend.maintenance.entity.MaintenanceStatus;
import com.vithub.backend.maintenance.entity.Priority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, UUID> {

    /** Get all maintenance requests, most recently created first. */
    List<MaintenanceRequest> findAllByOrderByCreatedAtDesc();

    /** Get maintenance requests by status. */
    List<MaintenanceRequest> findAllByStatusOrderByCreatedAtDesc(MaintenanceStatus status);

    /** Get maintenance requests by priority. */
    List<MaintenanceRequest> findAllByPriorityOrderByCreatedAtDesc(Priority priority);

    /** Get maintenance requests by reporter. */
    List<MaintenanceRequest> findAllByReporterIdOrderByCreatedAtDesc(UUID reporterId);

    /** Get maintenance requests by assigned staff. */
    List<MaintenanceRequest> findAllByAssignedStaffIdOrderByCreatedAtDesc(UUID assignedStaffId);

    /** Get maintenance requests by building. */
    List<MaintenanceRequest> findAllByBuildingIdOrderByCreatedAtDesc(UUID buildingId);

    /** Get maintenance requests by room. */
    List<MaintenanceRequest> findAllByRoomIdOrderByCreatedAtDesc(UUID roomId);

}
