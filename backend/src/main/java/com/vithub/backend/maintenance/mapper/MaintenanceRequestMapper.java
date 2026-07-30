package com.vithub.backend.maintenance.mapper;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.entity.User;
import com.vithub.backend.maintenance.dto.MaintenanceRequestCreateRequest;
import com.vithub.backend.maintenance.dto.MaintenanceRequestResponse;
import com.vithub.backend.maintenance.dto.MaintenanceRequestUpdateRequest;
import com.vithub.backend.maintenance.entity.MaintenanceRequest;
import com.vithub.backend.maintenance.entity.MaintenanceStatus;
import com.vithub.backend.room.entity.Room;
import org.springframework.stereotype.Component;

/**
 * Entity-to-DTO mapping for {@link MaintenanceRequest}. Entities must
 * never be returned directly from a controller; this is the single place
 * that decides what of a MaintenanceRequest is safe to expose, and how an
 * incoming request is applied to the entity. Resolving the reporter,
 * assigned staff, building and room entities from their ids is the
 * caller's (service layer's) responsibility — this mapper only assembles
 * or flattens what it is given.
 */
@Component
public class MaintenanceRequestMapper {

    public MaintenanceRequestResponse toResponse(MaintenanceRequest request) {
        User reporter = request.getReporter();
        User assignedStaff = request.getAssignedStaff();
        Building building = request.getBuilding();
        Room room = request.getRoom();

        return MaintenanceRequestResponse.builder()
                .id(request.getId())
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .priority(request.getPriority())
                .status(request.getStatus())
                .reporterId(reporter != null ? reporter.getId() : null)
                .reporterUsername(reporter != null ? reporter.getUsername() : null)
                .reporterFullName(reporter != null ? reporter.getFullName() : null)
                .assignedStaffId(assignedStaff != null ? assignedStaff.getId() : null)
                .assignedStaffUsername(assignedStaff != null ? assignedStaff.getUsername() : null)
                .assignedStaffFullName(assignedStaff != null ? assignedStaff.getFullName() : null)
                .buildingId(building != null ? building.getId() : null)
                .buildingName(building != null ? building.getName() : null)
                .roomId(room != null ? room.getId() : null)
                .roomNumber(room != null ? room.getRoomNumber() : null)
                .createdAt(request.getCreatedAt())
                .updatedAt(request.getUpdatedAt())
                .build();
    }

    /**
     * Builds a new entity from a create request. Defaults status to
     * {@link MaintenanceStatus#OPEN} — every complaint starts out open.
     */
    public MaintenanceRequest toEntity(MaintenanceRequestCreateRequest request, User reporter,
                                        Building building, Room room) {
        return MaintenanceRequest.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .priority(request.getPriority())
                .status(MaintenanceStatus.OPEN)
                .reporter(reporter)
                .assignedStaff(null)
                .building(building)
                .room(room)
                .build();
    }

    /**
     * Applies an update request onto an already-persisted entity in place,
     * so JPA's dirty-checking picks up the changes on flush. Reporter,
     * assigned staff and status are untouched — they are updated through
     * their own dedicated operations.
     */
    public void updateEntity(MaintenanceRequest maintenanceRequest, MaintenanceRequestUpdateRequest request,
                              Building building, Room room) {
        maintenanceRequest.setTitle(request.getTitle());
        maintenanceRequest.setDescription(request.getDescription());
        maintenanceRequest.setCategory(request.getCategory());
        maintenanceRequest.setPriority(request.getPriority());
        maintenanceRequest.setBuilding(building);
        maintenanceRequest.setRoom(room);
    }

}
