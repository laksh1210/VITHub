package com.vithub.backend.occupancy.controller;

import com.vithub.backend.common.response.ApiResponse;
import com.vithub.backend.occupancy.dto.OccupancyRequest;
import com.vithub.backend.occupancy.dto.OccupancyResponse;
import com.vithub.backend.occupancy.service.OccupancyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Classroom occupancy endpoints. {@code GET /occupancy} matches the Project
 * Bible's API contract exactly, with an optional {@code buildingId} filter
 * for the dashboard/heatmap. Every endpoint is a thin pass-through to
 * {@link OccupancyService} — no business logic lives here. Write endpoints
 * are additive (mirrors BuildingController/RoomController) and restricted
 * to Admins; mock/scheduled updates are wired up in a later phase but will
 * call through this same service.
 */
@RestController
@RequestMapping("/occupancy")
@RequiredArgsConstructor
@Tag(name = "Occupancy", description = "Live classroom occupancy readings")
public class OccupancyController {

    private final OccupancyService occupancyService;

    @GetMapping
    @Operation(summary = "List occupancy readings", description = "Returns the current occupancy for every room, or only those in a given building when buildingId is provided.")
    public ResponseEntity<ApiResponse<List<OccupancyResponse>>> getAllOccupancy(
            @Parameter(description = "Optional building id to filter by")
            @RequestParam(required = false) UUID buildingId) {
        List<OccupancyResponse> readings = occupancyService.getAllOccupancy(buildingId);
        return ResponseEntity.ok(ApiResponse.success(readings));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get an occupancy reading by id", description = "Returns a single occupancy record's full details.")
    public ResponseEntity<ApiResponse<OccupancyResponse>> getOccupancyById(
            @Parameter(description = "Occupancy record id") @PathVariable UUID id) {
        OccupancyResponse occupancy = occupancyService.getOccupancyById(id);
        return ResponseEntity.ok(ApiResponse.success(occupancy));
    }

    @GetMapping("/room/{roomId}")
    @Operation(summary = "Get occupancy by room", description = "Returns the current occupancy reading for a specific room.")
    public ResponseEntity<ApiResponse<OccupancyResponse>> getOccupancyByRoomId(
            @Parameter(description = "Room id") @PathVariable UUID roomId) {
        OccupancyResponse occupancy = occupancyService.getOccupancyByRoomId(roomId);
        return ResponseEntity.ok(ApiResponse.success(occupancy));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create an occupancy reading", description = "Admin-only. Records the initial occupancy count for a room that doesn't have one yet.")
    public ResponseEntity<ApiResponse<OccupancyResponse>> createOccupancy(
            @Valid @RequestBody OccupancyRequest request) {
        OccupancyResponse occupancy = occupancyService.createOccupancy(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Occupancy record created successfully", occupancy));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an occupancy reading", description = "Admin-only. Updates an existing room's occupancy count.")
    public ResponseEntity<ApiResponse<OccupancyResponse>> updateOccupancy(
            @Parameter(description = "Occupancy record id") @PathVariable UUID id,
            @Valid @RequestBody OccupancyRequest request) {
        OccupancyResponse occupancy = occupancyService.updateOccupancy(id, request);
        return ResponseEntity.ok(ApiResponse.success("Occupancy record updated successfully", occupancy));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete an occupancy reading", description = "Admin-only. Removes an occupancy record.")
    public ResponseEntity<ApiResponse<Void>> deleteOccupancy(
            @Parameter(description = "Occupancy record id") @PathVariable UUID id) {
        occupancyService.deleteOccupancy(id);
        return ResponseEntity.ok(ApiResponse.success("Occupancy record deleted successfully", null));
    }

}
