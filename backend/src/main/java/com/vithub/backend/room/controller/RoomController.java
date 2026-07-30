package com.vithub.backend.room.controller;

import com.vithub.backend.common.response.ApiResponse;
import com.vithub.backend.room.dto.RoomRequest;
import com.vithub.backend.room.dto.RoomResponse;
import com.vithub.backend.room.service.RoomService;
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
 * Room endpoints, nested under the building-adjacent {@code /rooms} path.
 * {@code GET /rooms} additionally accepts an optional {@code buildingId}
 * filter, matching the classroom-occupancy and campus-map use cases in the
 * Project Bible. The mutating endpoints mirror BuildingController's pattern
 * and are restricted to Admins, who own building/room management per the
 * Project Bible's role list.
 */
@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
@Tag(name = "Rooms", description = "Rooms within campus buildings")
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    @Operation(summary = "List rooms", description = "Returns all rooms, or only those in a given building when buildingId is provided.")
    public ResponseEntity<ApiResponse<List<RoomResponse>>> getAllRooms(
            @Parameter(description = "Optional building id to filter by")
            @RequestParam(required = false) UUID buildingId) {
        List<RoomResponse> rooms = roomService.getAllRooms(buildingId);
        return ResponseEntity.ok(ApiResponse.success(rooms));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a room by id", description = "Returns a single room's full details, including its parent building.")
    public ResponseEntity<ApiResponse<RoomResponse>> getRoomById(
            @Parameter(description = "Room id") @PathVariable UUID id) {
        RoomResponse room = roomService.getRoomById(id);
        return ResponseEntity.ok(ApiResponse.success(room));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a room", description = "Admin-only. Creates a new room within an existing building.")
    public ResponseEntity<ApiResponse<RoomResponse>> createRoom(
            @Valid @RequestBody RoomRequest request) {
        RoomResponse room = roomService.createRoom(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Room created successfully", room));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a room", description = "Admin-only. Updates an existing room, optionally moving it to another building.")
    public ResponseEntity<ApiResponse<RoomResponse>> updateRoom(
            @Parameter(description = "Room id") @PathVariable UUID id,
            @Valid @RequestBody RoomRequest request) {
        RoomResponse room = roomService.updateRoom(id, request);
        return ResponseEntity.ok(ApiResponse.success("Room updated successfully", room));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a room", description = "Admin-only. Removes a room.")
    public ResponseEntity<ApiResponse<Void>> deleteRoom(
            @Parameter(description = "Room id") @PathVariable UUID id) {
        roomService.deleteRoom(id);
        return ResponseEntity.ok(ApiResponse.success("Room deleted successfully", null));
    }

}
