package com.vithub.backend.shuttle.controller;

import com.vithub.backend.common.response.ApiResponse;
import com.vithub.backend.shuttle.dto.ShuttleRequest;
import com.vithub.backend.shuttle.dto.ShuttleResponse;
import com.vithub.backend.shuttle.dto.ShuttleStatusUpdateRequest;
import com.vithub.backend.shuttle.entity.ShuttleStatus;
import com.vithub.backend.shuttle.service.ShuttleService;
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
 * Shuttle endpoints. {@code GET /shuttle} matches the Project Bible's API
 * contract, with {@code /shuttle/active} and {@code /shuttle/status/{status}}
 * covering the dashboard's shuttle-tracking widget and the AI assistant's
 * "where is Shuttle 2?" use case. Every endpoint is a thin pass-through to
 * {@link ShuttleService} — no business logic lives here. Write endpoints
 * are additive (mirrors Building/Library) and restricted to Admins; the
 * dedicated status-only PATCH is the operation a future mock scheduler or
 * live GPS feed would call most often. Live position tracking is a
 * separate module and is intentionally not exposed here.
 */
@RestController
@RequestMapping("/shuttle")
@RequiredArgsConstructor
@Tag(name = "Shuttle", description = "Campus shuttle fleet directory")
public class ShuttleController {

    private final ShuttleService shuttleService;

    @GetMapping
    @Operation(summary = "List all shuttles", description = "Returns every shuttle, ordered by shuttle number.")
    public ResponseEntity<ApiResponse<List<ShuttleResponse>>> getAllShuttles() {
        List<ShuttleResponse> shuttles = shuttleService.getAllShuttles();
        return ResponseEntity.ok(ApiResponse.success(shuttles));
    }

    @GetMapping("/active")
    @Operation(summary = "List active shuttles", description = "Returns every shuttle currently in ACTIVE status.")
    public ResponseEntity<ApiResponse<List<ShuttleResponse>>> getActiveShuttles() {
        List<ShuttleResponse> shuttles = shuttleService.getActiveShuttles();
        return ResponseEntity.ok(ApiResponse.success(shuttles));
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "List shuttles by status", description = "Returns every shuttle in the given status (ACTIVE, INACTIVE or MAINTENANCE).")
    public ResponseEntity<ApiResponse<List<ShuttleResponse>>> getShuttlesByStatus(
            @Parameter(description = "Shuttle status") @PathVariable ShuttleStatus status) {
        List<ShuttleResponse> shuttles = shuttleService.getShuttlesByStatus(status);
        return ResponseEntity.ok(ApiResponse.success(shuttles));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a shuttle by id", description = "Returns a single shuttle's full details.")
    public ResponseEntity<ApiResponse<ShuttleResponse>> getShuttleById(
            @Parameter(description = "Shuttle id") @PathVariable UUID id) {
        ShuttleResponse shuttle = shuttleService.getShuttleById(id);
        return ResponseEntity.ok(ApiResponse.success(shuttle));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a shuttle", description = "Admin-only. Registers a new shuttle in the fleet.")
    public ResponseEntity<ApiResponse<ShuttleResponse>> createShuttle(
            @Valid @RequestBody ShuttleRequest request) {
        ShuttleResponse shuttle = shuttleService.createShuttle(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Shuttle created successfully", shuttle));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a shuttle", description = "Admin-only. Updates an existing shuttle's details.")
    public ResponseEntity<ApiResponse<ShuttleResponse>> updateShuttle(
            @Parameter(description = "Shuttle id") @PathVariable UUID id,
            @Valid @RequestBody ShuttleRequest request) {
        ShuttleResponse shuttle = shuttleService.updateShuttle(id, request);
        return ResponseEntity.ok(ApiResponse.success("Shuttle updated successfully", shuttle));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update shuttle status", description = "Admin-only. Updates only a shuttle's operational status.")
    public ResponseEntity<ApiResponse<ShuttleResponse>> updateShuttleStatus(
            @Parameter(description = "Shuttle id") @PathVariable UUID id,
            @Valid @RequestBody ShuttleStatusUpdateRequest request) {
        ShuttleResponse shuttle = shuttleService.updateShuttleStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success("Shuttle status updated successfully", shuttle));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a shuttle", description = "Admin-only. Removes a shuttle from the fleet.")
    public ResponseEntity<ApiResponse<Void>> deleteShuttle(
            @Parameter(description = "Shuttle id") @PathVariable UUID id) {
        shuttleService.deleteShuttle(id);
        return ResponseEntity.ok(ApiResponse.success("Shuttle deleted successfully", null));
    }

}
