package com.vithub.backend.maintenance.image.controller;

import com.vithub.backend.common.response.ApiResponse;
import com.vithub.backend.maintenance.image.dto.MaintenanceImageResponse;
import com.vithub.backend.maintenance.image.dto.MaintenanceImageUploadRequest;
import com.vithub.backend.maintenance.image.service.MaintenanceImageService;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Maintenance image endpoints, nested under {@code /maintenance-images}.
 * {@code GET /maintenance-images/maintenance-request/{maintenanceRequestId}}
 * lists every photo attached to a complaint. Every endpoint is a thin
 * pass-through to {@link MaintenanceImageService} — no business logic
 * lives here; the only thing resolved at this layer is the authenticated
 * principal's id, so an image can never be attributed to someone else.
 * Actual file/cloud upload is a separate concern and out of scope here —
 * this module only records the resulting URL and its metadata.
 */
@RestController
@RequestMapping("/maintenance-images")
@RequiredArgsConstructor
@Tag(name = "Maintenance Images", description = "Photos attached to maintenance complaints")
public class MaintenanceImageController {

    private final MaintenanceImageService maintenanceImageService;

    @GetMapping("/maintenance-request/{maintenanceRequestId}")
    @Operation(summary = "List images for a maintenance request", description = "Returns every photo attached to a complaint, oldest first.")
    public ResponseEntity<ApiResponse<List<MaintenanceImageResponse>>> getImagesByMaintenanceRequest(
            @Parameter(description = "Maintenance request id") @PathVariable UUID maintenanceRequestId) {
        List<MaintenanceImageResponse> images =
                maintenanceImageService.getImagesByMaintenanceRequest(maintenanceRequestId);
        return ResponseEntity.ok(ApiResponse.success(images));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a maintenance image by id", description = "Returns a single image's full details.")
    public ResponseEntity<ApiResponse<MaintenanceImageResponse>> getImageById(
            @Parameter(description = "Maintenance image id") @PathVariable UUID id) {
        MaintenanceImageResponse image = maintenanceImageService.getImageById(id);
        return ResponseEntity.ok(ApiResponse.success(image));
    }

    @PostMapping
    @Operation(summary = "Attach an image to a maintenance request", description = "Records a photo (already uploaded elsewhere by URL) uploaded by the current user.")
    public ResponseEntity<ApiResponse<MaintenanceImageResponse>> uploadImage(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @Valid @RequestBody MaintenanceImageUploadRequest request) {
        MaintenanceImageResponse image = maintenanceImageService.uploadImage(currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Maintenance image uploaded successfully", image));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MAINTENANCE')")
    @Operation(summary = "Delete a maintenance image", description = "Admin/Maintenance-only. Removes a photo from a complaint.")
    public ResponseEntity<ApiResponse<Void>> deleteImage(
            @Parameter(description = "Maintenance image id") @PathVariable UUID id) {
        maintenanceImageService.deleteImage(id);
        return ResponseEntity.ok(ApiResponse.success("Maintenance image deleted successfully", null));
    }

}
