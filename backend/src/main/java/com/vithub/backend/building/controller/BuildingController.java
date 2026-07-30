package com.vithub.backend.building.controller;

import com.vithub.backend.building.dto.BuildingRequest;
import com.vithub.backend.building.dto.BuildingResponse;
import com.vithub.backend.building.service.BuildingService;
import com.vithub.backend.common.response.ApiResponse;
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
 * Building endpoints. {@code GET /buildings} and {@code GET /buildings/{id}}
 * match the Project Bible's API contract exactly. The mutating endpoints are
 * additive (mirrors the pattern already used in AuthenticationController for
 * {@code /auth/refresh}) and are restricted to Admins, who own building
 * management per the Project Bible's role list.
 */
@RestController
@RequestMapping("/buildings")
@RequiredArgsConstructor
@Tag(name = "Buildings", description = "Campus building directory")
public class BuildingController {

    private final BuildingService buildingService;

    @GetMapping
    @Operation(summary = "List all buildings", description = "Returns every campus building, ordered by name.")
    public ResponseEntity<ApiResponse<List<BuildingResponse>>> getAllBuildings() {
        List<BuildingResponse> buildings = buildingService.getAllBuildings();
        return ResponseEntity.ok(ApiResponse.success(buildings));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a building by id", description = "Returns a single building's full details.")
    public ResponseEntity<ApiResponse<BuildingResponse>> getBuildingById(
            @Parameter(description = "Building id") @PathVariable UUID id) {
        BuildingResponse building = buildingService.getBuildingById(id);
        return ResponseEntity.ok(ApiResponse.success(building));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a building", description = "Admin-only. Creates a new campus building.")
    public ResponseEntity<ApiResponse<BuildingResponse>> createBuilding(
            @Valid @RequestBody BuildingRequest request) {
        BuildingResponse building = buildingService.createBuilding(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Building created successfully", building));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a building", description = "Admin-only. Updates an existing campus building.")
    public ResponseEntity<ApiResponse<BuildingResponse>> updateBuilding(
            @Parameter(description = "Building id") @PathVariable UUID id,
            @Valid @RequestBody BuildingRequest request) {
        BuildingResponse building = buildingService.updateBuilding(id, request);
        return ResponseEntity.ok(ApiResponse.success("Building updated successfully", building));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a building", description = "Admin-only. Removes a campus building.")
    public ResponseEntity<ApiResponse<Void>> deleteBuilding(
            @Parameter(description = "Building id") @PathVariable UUID id) {
        buildingService.deleteBuilding(id);
        return ResponseEntity.ok(ApiResponse.success("Building deleted successfully", null));
    }

}
