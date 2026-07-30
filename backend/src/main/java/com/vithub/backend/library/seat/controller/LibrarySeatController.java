package com.vithub.backend.library.seat.controller;

import com.vithub.backend.common.response.ApiResponse;
import com.vithub.backend.library.seat.dto.LibrarySeatRequest;
import com.vithub.backend.library.seat.dto.LibrarySeatResponse;
import com.vithub.backend.library.seat.dto.LibrarySeatStatusUpdateRequest;
import com.vithub.backend.library.seat.service.LibrarySeatService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Library seat endpoints, nested under {@code /library-seats}.
 * {@code /available} and {@code /occupied} accept an optional
 * {@code libraryId} filter, matching the seat-availability use case in the
 * Project Bible. Every endpoint is a thin pass-through to
 * {@link LibrarySeatService} — no business logic lives here. Write
 * endpoints are additive (mirrors Building/Room/Occupancy/Library) and
 * restricted to Admins; the dedicated status-only PATCH is the operation a
 * future check-in/booking flow or mock scheduler would call most often.
 */
@RestController
@RequestMapping("/library-seats")
@RequiredArgsConstructor
@Tag(name = "Library Seats", description = "Individual seats within a library space")
public class LibrarySeatController {

    private final LibrarySeatService librarySeatService;

    @GetMapping
    @Operation(summary = "List library seats", description = "Returns every seat, or only those in a given library when libraryId is provided.")
    public ResponseEntity<ApiResponse<List<LibrarySeatResponse>>> getAllSeats(
            @Parameter(description = "Optional library id to filter by")
            @RequestParam(required = false) UUID libraryId) {
        List<LibrarySeatResponse> seats = librarySeatService.getAllSeats(libraryId);
        return ResponseEntity.ok(ApiResponse.success(seats));
    }

    @GetMapping("/available")
    @Operation(summary = "List available seats", description = "Returns seats currently marked AVAILABLE, optionally filtered by library.")
    public ResponseEntity<ApiResponse<List<LibrarySeatResponse>>> getAvailableSeats(
            @Parameter(description = "Optional library id to filter by")
            @RequestParam(required = false) UUID libraryId) {
        List<LibrarySeatResponse> seats = librarySeatService.getAvailableSeats(libraryId);
        return ResponseEntity.ok(ApiResponse.success(seats));
    }

    @GetMapping("/occupied")
    @Operation(summary = "List occupied seats", description = "Returns seats currently marked OCCUPIED, optionally filtered by library.")
    public ResponseEntity<ApiResponse<List<LibrarySeatResponse>>> getOccupiedSeats(
            @Parameter(description = "Optional library id to filter by")
            @RequestParam(required = false) UUID libraryId) {
        List<LibrarySeatResponse> seats = librarySeatService.getOccupiedSeats(libraryId);
        return ResponseEntity.ok(ApiResponse.success(seats));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a seat by id", description = "Returns a single seat's full details, including its parent library.")
    public ResponseEntity<ApiResponse<LibrarySeatResponse>> getSeatById(
            @Parameter(description = "Seat id") @PathVariable UUID id) {
        LibrarySeatResponse seat = librarySeatService.getSeatById(id);
        return ResponseEntity.ok(ApiResponse.success(seat));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a seat", description = "Admin-only. Creates a new seat within an existing library.")
    public ResponseEntity<ApiResponse<LibrarySeatResponse>> createSeat(
            @Valid @RequestBody LibrarySeatRequest request) {
        LibrarySeatResponse seat = librarySeatService.createSeat(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Seat created successfully", seat));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a seat", description = "Admin-only. Updates an existing seat's number, type or library.")
    public ResponseEntity<ApiResponse<LibrarySeatResponse>> updateSeat(
            @Parameter(description = "Seat id") @PathVariable UUID id,
            @Valid @RequestBody LibrarySeatRequest request) {
        LibrarySeatResponse seat = librarySeatService.updateSeat(id, request);
        return ResponseEntity.ok(ApiResponse.success("Seat updated successfully", seat));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update seat status", description = "Admin-only. Updates only a seat's availability status.")
    public ResponseEntity<ApiResponse<LibrarySeatResponse>> updateSeatStatus(
            @Parameter(description = "Seat id") @PathVariable UUID id,
            @Valid @RequestBody LibrarySeatStatusUpdateRequest request) {
        LibrarySeatResponse seat = librarySeatService.updateSeatStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success("Seat status updated successfully", seat));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a seat", description = "Admin-only. Removes a seat.")
    public ResponseEntity<ApiResponse<Void>> deleteSeat(
            @Parameter(description = "Seat id") @PathVariable UUID id) {
        librarySeatService.deleteSeat(id);
        return ResponseEntity.ok(ApiResponse.success("Seat deleted successfully", null));
    }

}
