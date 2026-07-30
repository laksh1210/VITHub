package com.vithub.backend.shuttle.location.controller;

import com.vithub.backend.common.response.ApiResponse;
import com.vithub.backend.shuttle.location.dto.ShuttleLocationRequest;
import com.vithub.backend.shuttle.location.dto.ShuttleLocationResponse;
import com.vithub.backend.shuttle.location.service.ShuttleLocationService;
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
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Shuttle location endpoints, nested under {@code /shuttle-locations}.
 * {@code GET /shuttle-locations} returns the current (most recent) ping
 * for every shuttle, matching the dashboard's shuttle-tracking widget and
 * campus map. {@code /shuttle/{shuttleId}/latest} and
 * {@code /shuttle/{shuttleId}/history} cover the AI assistant's "where is
 * Shuttle 2?" use case and a trail view, respectively. Every endpoint is a
 * thin pass-through to {@link ShuttleLocationService} — no business logic
 * lives here. Write endpoints are additive (mirrors Occupancy/CanteenQueue)
 * and restricted to Admins; {@code POST} is the operation a future mock
 * GPS scheduler would call most often, appending a new ping rather than
 * upserting.
 */
@RestController
@RequestMapping("/shuttle-locations")
@RequiredArgsConstructor
@Tag(name = "Shuttle Locations", description = "Live and historical shuttle GPS pings")
public class ShuttleLocationController {

    private final ShuttleLocationService shuttleLocationService;

    @GetMapping
    @Operation(summary = "List current shuttle locations", description = "Returns the most recent location ping for every shuttle that has reported one.")
    public ResponseEntity<ApiResponse<List<ShuttleLocationResponse>>> getAllCurrentLocations() {
        List<ShuttleLocationResponse> locations = shuttleLocationService.getAllCurrentLocations();
        return ResponseEntity.ok(ApiResponse.success(locations));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a location record by id", description = "Returns a single location ping's full details.")
    public ResponseEntity<ApiResponse<ShuttleLocationResponse>> getLocationById(
            @Parameter(description = "Location record id") @PathVariable UUID id) {
        ShuttleLocationResponse location = shuttleLocationService.getLocationById(id);
        return ResponseEntity.ok(ApiResponse.success(location));
    }

    @GetMapping("/shuttle/{shuttleId}/latest")
    @Operation(summary = "Get latest location by shuttle", description = "Returns the most recent location ping for a specific shuttle.")
    public ResponseEntity<ApiResponse<ShuttleLocationResponse>> getLatestLocationByShuttleId(
            @Parameter(description = "Shuttle id") @PathVariable UUID shuttleId) {
        ShuttleLocationResponse location = shuttleLocationService.getLatestLocationByShuttleId(shuttleId);
        return ResponseEntity.ok(ApiResponse.success(location));
    }

    @GetMapping("/shuttle/{shuttleId}/history")
    @Operation(summary = "Get location history by shuttle", description = "Returns every recorded location ping for a specific shuttle, most recent first.")
    public ResponseEntity<ApiResponse<List<ShuttleLocationResponse>>> getLocationHistoryByShuttleId(
            @Parameter(description = "Shuttle id") @PathVariable UUID shuttleId) {
        List<ShuttleLocationResponse> locations = shuttleLocationService.getLocationHistoryByShuttleId(shuttleId);
        return ResponseEntity.ok(ApiResponse.success(locations));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Record a shuttle location", description = "Admin-only. Appends a new GPS ping for a shuttle.")
    public ResponseEntity<ApiResponse<ShuttleLocationResponse>> recordLocation(
            @Valid @RequestBody ShuttleLocationRequest request) {
        ShuttleLocationResponse location = shuttleLocationService.recordLocation(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Location recorded successfully", location));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a location record", description = "Admin-only. Corrects an existing location record's values.")
    public ResponseEntity<ApiResponse<ShuttleLocationResponse>> updateLocation(
            @Parameter(description = "Location record id") @PathVariable UUID id,
            @Valid @RequestBody ShuttleLocationRequest request) {
        ShuttleLocationResponse location = shuttleLocationService.updateLocation(id, request);
        return ResponseEntity.ok(ApiResponse.success("Location record updated successfully", location));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a location record", description = "Admin-only. Removes a location record.")
    public ResponseEntity<ApiResponse<Void>> deleteLocation(
            @Parameter(description = "Location record id") @PathVariable UUID id) {
        shuttleLocationService.deleteLocation(id);
        return ResponseEntity.ok(ApiResponse.success("Location record deleted successfully", null));
    }

}
