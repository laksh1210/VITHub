package com.vithub.backend.maintenance.controller;

import com.vithub.backend.common.response.ApiResponse;
import com.vithub.backend.maintenance.dto.MaintenanceRequestAssignRequest;
import com.vithub.backend.maintenance.dto.MaintenanceRequestCreateRequest;
import com.vithub.backend.maintenance.dto.MaintenanceRequestResponse;
import com.vithub.backend.maintenance.dto.MaintenanceRequestStatusUpdateRequest;
import com.vithub.backend.maintenance.dto.MaintenanceRequestUpdateRequest;
import com.vithub.backend.maintenance.entity.MaintenanceStatus;
import com.vithub.backend.maintenance.entity.Priority;
import com.vithub.backend.maintenance.service.MaintenanceRequestService;
import com.vithub.backend.security.userdetails.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Maintenance request endpoints. {@code GET /maintenance} and
 * {@code POST /maintenance} match the Project Bible's API contract, with
 * additional filters covering the dashboard's "active maintenance
 * requests" widget and per-role complaint views. Every endpoint is a thin
 * pass-through to {@link MaintenanceRequestService} — no business logic
 * lives here; the only thing resolved at this layer is the authenticated
 * principal's id, so a user can never file or query complaints on behalf
 * of someone else. Maintenance images, notifications and chat logs are
 * separate modules and are intentionally not exposed here.
 */
@RestController
@RequestMapping("/maintenance")
@RequiredArgsConstructor
@Tag(name = "Maintenance", description = "Campus maintenance complaint tracking")
public class MaintenanceRequestController {

    private final MaintenanceRequestService maintenanceRequestService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MAINTENANCE', 'SECURITY')")
    @Operation(summary = "List all maintenance requests", description = "Admin/Maintenance/Security-only. Returns every complaint, most recent first.")
    public ResponseEntity<ApiResponse<List<MaintenanceRequestResponse>>> getAllMaintenanceRequests() {
        List<MaintenanceRequestResponse> requests = maintenanceRequestService.getAllMaintenanceRequests();
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @GetMapping("/my")
    @Operation(summary = "List my maintenance requests", description = "Returns every complaint reported by the current user.")
    public ResponseEntity<ApiResponse<List<MaintenanceRequestResponse>>> getMyMaintenanceRequests(
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        List<MaintenanceRequestResponse> requests =
                maintenanceRequestService.getMaintenanceRequestsByReporter(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @GetMapping("/my-assignments")
    @PreAuthorize("hasAnyRole('MAINTENANCE', 'ADMIN')")
    @Operation(summary = "List my assigned maintenance requests", description = "Maintenance/Admin-only. Returns every complaint assigned to the current user.")
    public ResponseEntity<ApiResponse<List<MaintenanceRequestResponse>>> getMyAssignedMaintenanceRequests(
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        List<MaintenanceRequestResponse> requests =
                maintenanceRequestService.getMaintenanceRequestsByAssignedStaff(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MAINTENANCE', 'SECURITY')")
    @Operation(summary = "List maintenance requests by status", description = "Admin/Maintenance/Security-only. Returns every complaint in the given status.")
    public ResponseEntity<ApiResponse<List<MaintenanceRequestResponse>>> getMaintenanceRequestsByStatus(
            @Parameter(description = "Complaint status") @PathVariable MaintenanceStatus status) {
        List<MaintenanceRequestResponse> requests = maintenanceRequestService.getMaintenanceRequestsByStatus(status);
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @GetMapping("/priority/{priority}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MAINTENANCE', 'SECURITY')")
    @Operation(summary = "List maintenance requests by priority", description = "Admin/Maintenance/Security-only. Returns every complaint at the given priority.")
    public ResponseEntity<ApiResponse<List<MaintenanceRequestResponse>>> getMaintenanceRequestsByPriority(
            @Parameter(description = "Complaint priority") @PathVariable Priority priority) {
        List<MaintenanceRequestResponse> requests = maintenanceRequestService.getMaintenanceRequestsByPriority(priority);
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @GetMapping("/reporter/{reporterId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List maintenance requests by reporter", description = "Admin-only. Returns every complaint reported by the given user.")
    public ResponseEntity<ApiResponse<List<MaintenanceRequestResponse>>> getMaintenanceRequestsByReporter(
            @Parameter(description = "Reporter (user) id") @PathVariable UUID reporterId) {
        List<MaintenanceRequestResponse> requests = maintenanceRequestService.getMaintenanceRequestsByReporter(reporterId);
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @GetMapping("/assigned-staff/{staffId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List maintenance requests by assigned staff", description = "Admin-only. Returns every complaint assigned to the given staff member.")
    public ResponseEntity<ApiResponse<List<MaintenanceRequestResponse>>> getMaintenanceRequestsByAssignedStaff(
            @Parameter(description = "Assigned staff (user) id") @PathVariable UUID staffId) {
        List<MaintenanceRequestResponse> requests = maintenanceRequestService.getMaintenanceRequestsByAssignedStaff(staffId);
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @GetMapping("/building/{buildingId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MAINTENANCE', 'SECURITY')")
    @Operation(summary = "List maintenance requests by building", description = "Admin/Maintenance/Security-only. Returns every complaint for the given building.")
    public ResponseEntity<ApiResponse<List<MaintenanceRequestResponse>>> getMaintenanceRequestsByBuilding(
            @Parameter(description = "Building id") @PathVariable UUID buildingId) {
        List<MaintenanceRequestResponse> requests = maintenanceRequestService.getMaintenanceRequestsByBuilding(buildingId);
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @GetMapping("/room/{roomId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MAINTENANCE', 'SECURITY')")
    @Operation(summary = "List maintenance requests by room", description = "Admin/Maintenance/Security-only. Returns every complaint for the given room.")
    public ResponseEntity<ApiResponse<List<MaintenanceRequestResponse>>> getMaintenanceRequestsByRoom(
            @Parameter(description = "Room id") @PathVariable UUID roomId) {
        List<MaintenanceRequestResponse> requests = maintenanceRequestService.getMaintenanceRequestsByRoom(roomId);
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a maintenance request by id", description = "Returns a single complaint's full details.")
    public ResponseEntity<ApiResponse<MaintenanceRequestResponse>> getMaintenanceRequestById(
            @Parameter(description = "Maintenance request id") @PathVariable UUID id) {
        MaintenanceRequestResponse request = maintenanceRequestService.getMaintenanceRequestById(id);
        return ResponseEntity.ok(ApiResponse.success(request));
    }

    @PostMapping
    @Operation(summary = "Report a maintenance issue", description = "Creates a new complaint reported by the current user.")
    public ResponseEntity<ApiResponse<MaintenanceRequestResponse>> createMaintenanceRequest(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @Valid @RequestBody MaintenanceRequestCreateRequest request) {
        MaintenanceRequestResponse created =
                maintenanceRequestService.createMaintenanceRequest(currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Maintenance request created successfully", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a maintenance request", description = "Admin-only. Updates a complaint's title, description, category, priority, building and room.")
    public ResponseEntity<ApiResponse<MaintenanceRequestResponse>> updateMaintenanceRequest(
            @Parameter(description = "Maintenance request id") @PathVariable UUID id,
            @Valid @RequestBody MaintenanceRequestUpdateRequest request) {
        MaintenanceRequestResponse updated = maintenanceRequestService.updateMaintenanceRequest(id, request);
        return ResponseEntity.ok(ApiResponse.success("Maintenance request updated successfully", updated));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'MAINTENANCE')")
    @Operation(summary = "Update maintenance request status", description = "Admin/Maintenance-only. Moves a complaint through its lifecycle.")
    public ResponseEntity<ApiResponse<MaintenanceRequestResponse>> updateMaintenanceRequestStatus(
            @Parameter(description = "Maintenance request id") @PathVariable UUID id,
            @Valid @RequestBody MaintenanceRequestStatusUpdateRequest request) {
        MaintenanceRequestResponse updated = maintenanceRequestService.updateMaintenanceRequestStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success("Maintenance request status updated successfully", updated));
    }

    @PatchMapping("/{id}/assign")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Assign a maintenance request", description = "Admin-only. Assigns or unassigns the staff member responsible for a complaint.")
    public ResponseEntity<ApiResponse<MaintenanceRequestResponse>> assignMaintenanceRequest(
            @Parameter(description = "Maintenance request id") @PathVariable UUID id,
            @Valid @RequestBody MaintenanceRequestAssignRequest request) {
        MaintenanceRequestResponse updated = maintenanceRequestService.assignMaintenanceRequest(id, request);
        return ResponseEntity.ok(ApiResponse.success("Maintenance request assigned successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a maintenance request", description = "Admin-only. Removes a complaint.")
    public ResponseEntity<ApiResponse<Void>> deleteMaintenanceRequest(
            @Parameter(description = "Maintenance request id") @PathVariable UUID id) {
        maintenanceRequestService.deleteMaintenanceRequest(id);
        return ResponseEntity.ok(ApiResponse.success("Maintenance request deleted successfully", null));
    }

}
