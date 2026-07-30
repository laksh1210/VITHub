package com.vithub.backend.maintenance.dto;

import com.vithub.backend.maintenance.entity.MaintenanceStatus;
import com.vithub.backend.maintenance.entity.Priority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of a {@link com.vithub.backend.maintenance.entity.MaintenanceRequest}.
 * Returned by every {@code /maintenance} endpoint; the entity is never
 * exposed directly. Related reporter/staff/building/room entities are
 * flattened to their id and display name so consumers don't have to make
 * a second call for the common case.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceRequestResponse {

    private UUID id;
    private String title;
    private String description;
    private String category;
    private Priority priority;
    private MaintenanceStatus status;

    private UUID reporterId;
    private String reporterUsername;
    private String reporterFullName;

    private UUID assignedStaffId;
    private String assignedStaffUsername;
    private String assignedStaffFullName;

    private UUID buildingId;
    private String buildingName;

    private UUID roomId;
    private String roomNumber;

    private Instant createdAt;
    private Instant updatedAt;

}
