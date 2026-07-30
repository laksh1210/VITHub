package com.vithub.backend.maintenance.service;

import com.vithub.backend.maintenance.dto.MaintenanceRequestAssignRequest;
import com.vithub.backend.maintenance.dto.MaintenanceRequestCreateRequest;
import com.vithub.backend.maintenance.dto.MaintenanceRequestResponse;
import com.vithub.backend.maintenance.dto.MaintenanceRequestStatusUpdateRequest;
import com.vithub.backend.maintenance.dto.MaintenanceRequestUpdateRequest;
import com.vithub.backend.maintenance.entity.MaintenanceStatus;
import com.vithub.backend.maintenance.entity.Priority;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Maintenance Request module. Implemented by
 * {@link com.vithub.backend.maintenance.service.impl.MaintenanceRequestServiceImpl}.
 */
public interface MaintenanceRequestService {

    List<MaintenanceRequestResponse> getAllMaintenanceRequests();

    MaintenanceRequestResponse getMaintenanceRequestById(UUID id);

    List<MaintenanceRequestResponse> getMaintenanceRequestsByStatus(MaintenanceStatus status);

    List<MaintenanceRequestResponse> getMaintenanceRequestsByPriority(Priority priority);

    List<MaintenanceRequestResponse> getMaintenanceRequestsByReporter(UUID reporterId);

    List<MaintenanceRequestResponse> getMaintenanceRequestsByAssignedStaff(UUID assignedStaffId);

    List<MaintenanceRequestResponse> getMaintenanceRequestsByBuilding(UUID buildingId);

    List<MaintenanceRequestResponse> getMaintenanceRequestsByRoom(UUID roomId);

    MaintenanceRequestResponse createMaintenanceRequest(UUID reporterId, MaintenanceRequestCreateRequest request);

    MaintenanceRequestResponse updateMaintenanceRequest(UUID id, MaintenanceRequestUpdateRequest request);

    MaintenanceRequestResponse updateMaintenanceRequestStatus(UUID id, MaintenanceRequestStatusUpdateRequest request);

    MaintenanceRequestResponse assignMaintenanceRequest(UUID id, MaintenanceRequestAssignRequest request);

    void deleteMaintenanceRequest(UUID id);

}
