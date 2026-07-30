package com.vithub.backend.canteen.queue.controller;

import com.vithub.backend.canteen.queue.dto.CanteenQueueCountUpdateRequest;
import com.vithub.backend.canteen.queue.dto.CanteenQueueRequest;
import com.vithub.backend.canteen.queue.dto.CanteenQueueResponse;
import com.vithub.backend.canteen.queue.dto.CanteenQueueWaitTimeUpdateRequest;
import com.vithub.backend.canteen.queue.service.CanteenQueueService;
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
 * Canteen queue endpoints, nested under {@code /canteen-queues}.
 * {@code /canteen/{canteenId}} matches the AI assistant's "how long is the
 * canteen wait?" use case, and {@code /canteen/{canteenId}/size} exposes
 * just the current headcount for lightweight dashboard polling. Every
 * endpoint is a thin pass-through to {@link CanteenQueueService} — no
 * business logic lives here. Write endpoints are additive (mirrors
 * Occupancy/LibrarySeat) and restricted to Admins; the dedicated
 * count/wait-time PATCH endpoints are the operations a future mock
 * scheduler or live feed would call most often.
 */
@RestController
@RequestMapping("/canteen-queues")
@RequiredArgsConstructor
@Tag(name = "Canteen Queue", description = "Live canteen queue length and estimated wait time")
public class CanteenQueueController {

    private final CanteenQueueService canteenQueueService;

    @GetMapping
    @Operation(summary = "List queue readings", description = "Returns the current queue reading for every canteen.")
    public ResponseEntity<ApiResponse<List<CanteenQueueResponse>>> getAllQueues() {
        List<CanteenQueueResponse> queues = canteenQueueService.getAllQueues();
        return ResponseEntity.ok(ApiResponse.success(queues));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a queue reading by id", description = "Returns a single queue record's full details.")
    public ResponseEntity<ApiResponse<CanteenQueueResponse>> getQueueById(
            @Parameter(description = "Queue record id") @PathVariable UUID id) {
        CanteenQueueResponse queue = canteenQueueService.getQueueById(id);
        return ResponseEntity.ok(ApiResponse.success(queue));
    }

    @GetMapping("/canteen/{canteenId}")
    @Operation(summary = "Get queue by canteen", description = "Returns the current queue reading for a specific canteen.")
    public ResponseEntity<ApiResponse<CanteenQueueResponse>> getQueueByCanteenId(
            @Parameter(description = "Canteen id") @PathVariable UUID canteenId) {
        CanteenQueueResponse queue = canteenQueueService.getQueueByCanteenId(canteenId);
        return ResponseEntity.ok(ApiResponse.success(queue));
    }

    @GetMapping("/canteen/{canteenId}/size")
    @Operation(summary = "Get current queue size", description = "Returns just the current headcount waiting at a specific canteen.")
    public ResponseEntity<ApiResponse<Integer>> getCurrentQueueSize(
            @Parameter(description = "Canteen id") @PathVariable UUID canteenId) {
        Integer size = canteenQueueService.getCurrentQueueSize(canteenId);
        return ResponseEntity.ok(ApiResponse.success(size));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a queue reading", description = "Admin-only. Records the initial queue reading for a canteen that doesn't have one yet.")
    public ResponseEntity<ApiResponse<CanteenQueueResponse>> createQueue(
            @Valid @RequestBody CanteenQueueRequest request) {
        CanteenQueueResponse queue = canteenQueueService.createQueue(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Queue record created successfully", queue));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a queue reading", description = "Admin-only. Updates an existing queue record's canteen, count and wait estimate.")
    public ResponseEntity<ApiResponse<CanteenQueueResponse>> updateQueue(
            @Parameter(description = "Queue record id") @PathVariable UUID id,
            @Valid @RequestBody CanteenQueueRequest request) {
        CanteenQueueResponse queue = canteenQueueService.updateQueue(id, request);
        return ResponseEntity.ok(ApiResponse.success("Queue record updated successfully", queue));
    }

    @PatchMapping("/{id}/count")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update queue count", description = "Admin-only. Updates only a queue record's current headcount; the crowding status is re-derived automatically.")
    public ResponseEntity<ApiResponse<CanteenQueueResponse>> updateQueueCount(
            @Parameter(description = "Queue record id") @PathVariable UUID id,
            @Valid @RequestBody CanteenQueueCountUpdateRequest request) {
        CanteenQueueResponse queue = canteenQueueService.updateQueueCount(id, request);
        return ResponseEntity.ok(ApiResponse.success("Queue count updated successfully", queue));
    }

    @PatchMapping("/{id}/wait-time")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update estimated waiting time", description = "Admin-only. Updates only a queue record's estimated wait time.")
    public ResponseEntity<ApiResponse<CanteenQueueResponse>> updateEstimatedWaitTime(
            @Parameter(description = "Queue record id") @PathVariable UUID id,
            @Valid @RequestBody CanteenQueueWaitTimeUpdateRequest request) {
        CanteenQueueResponse queue = canteenQueueService.updateEstimatedWaitTime(id, request);
        return ResponseEntity.ok(ApiResponse.success("Estimated wait time updated successfully", queue));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a queue reading", description = "Admin-only. Removes a queue record.")
    public ResponseEntity<ApiResponse<Void>> deleteQueue(
            @Parameter(description = "Queue record id") @PathVariable UUID id) {
        canteenQueueService.deleteQueue(id);
        return ResponseEntity.ok(ApiResponse.success("Queue record deleted successfully", null));
    }

}
