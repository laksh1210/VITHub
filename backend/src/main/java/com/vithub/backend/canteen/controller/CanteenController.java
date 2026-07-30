package com.vithub.backend.canteen.controller;

import com.vithub.backend.canteen.dto.CanteenRequest;
import com.vithub.backend.canteen.dto.CanteenResponse;
import com.vithub.backend.canteen.service.CanteenService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Canteen endpoints. {@code GET /canteens} matches the Project Bible's API
 * contract, with an optional {@code buildingId} filter for the campus map
 * and AI assistant ("where's the nearest canteen?"). {@code GET
 * /canteens/search} exposes name-based lookup for the same use case. Every
 * endpoint is a thin pass-through to {@link CanteenService} — no business
 * logic lives here. Write endpoints are additive (mirrors Building/Library)
 * and restricted to Admins. Canteen queue length is a separate module and
 * is intentionally not exposed here.
 */
@RestController
@RequestMapping("/canteens")
@RequiredArgsConstructor
@Tag(name = "Canteens", description = "Campus canteen directory")
public class CanteenController {

    private final CanteenService canteenService;

    @GetMapping
    @Operation(summary = "List canteens", description = "Returns every canteen, or only those in a given building when buildingId is provided.")
    public ResponseEntity<ApiResponse<List<CanteenResponse>>> getAllCanteens(
            @Parameter(description = "Optional building id to filter by")
            @RequestParam(required = false) UUID buildingId) {
        List<CanteenResponse> canteens = canteenService.getAllCanteens(buildingId);
        return ResponseEntity.ok(ApiResponse.success(canteens));
    }

    @GetMapping("/search")
    @Operation(summary = "Find a canteen by name", description = "Returns a single canteen matching the given name (case-insensitive, exact match).")
    public ResponseEntity<ApiResponse<CanteenResponse>> getCanteenByName(
            @Parameter(description = "Canteen name") @RequestParam String name) {
        CanteenResponse canteen = canteenService.getCanteenByName(name);
        return ResponseEntity.ok(ApiResponse.success(canteen));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a canteen by id", description = "Returns a single canteen's full details.")
    public ResponseEntity<ApiResponse<CanteenResponse>> getCanteenById(
            @Parameter(description = "Canteen id") @PathVariable UUID id) {
        CanteenResponse canteen = canteenService.getCanteenById(id);
        return ResponseEntity.ok(ApiResponse.success(canteen));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a canteen", description = "Admin-only. Creates a new canteen within an existing building.")
    public ResponseEntity<ApiResponse<CanteenResponse>> createCanteen(
            @Valid @RequestBody CanteenRequest request) {
        CanteenResponse canteen = canteenService.createCanteen(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Canteen created successfully", canteen));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a canteen", description = "Admin-only. Updates an existing canteen's details.")
    public ResponseEntity<ApiResponse<CanteenResponse>> updateCanteen(
            @Parameter(description = "Canteen id") @PathVariable UUID id,
            @Valid @RequestBody CanteenRequest request) {
        CanteenResponse canteen = canteenService.updateCanteen(id, request);
        return ResponseEntity.ok(ApiResponse.success("Canteen updated successfully", canteen));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a canteen", description = "Admin-only. Removes a canteen.")
    public ResponseEntity<ApiResponse<Void>> deleteCanteen(
            @Parameter(description = "Canteen id") @PathVariable UUID id) {
        canteenService.deleteCanteen(id);
        return ResponseEntity.ok(ApiResponse.success("Canteen deleted successfully", null));
    }

}
