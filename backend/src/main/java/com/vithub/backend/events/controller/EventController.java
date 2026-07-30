package com.vithub.backend.events.controller;

import com.vithub.backend.common.response.ApiResponse;
import com.vithub.backend.events.dto.EventCreateRequest;
import com.vithub.backend.events.dto.EventResponse;
import com.vithub.backend.events.dto.EventStatusUpdateRequest;
import com.vithub.backend.events.dto.EventUpdateRequest;
import com.vithub.backend.events.entity.EventStatus;
import com.vithub.backend.events.service.EventService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Campus event endpoints. {@code GET /events} matches the Project
 * Bible's API contract, with {@code /events/upcoming} covering the
 * dashboard's "Upcoming Events" widget and the remaining filters covering
 * the campus map and AI assistant's venue/timing lookups. Every endpoint
 * is a thin pass-through to {@link EventService} — no business logic
 * lives here. Write endpoints are restricted to Admins, matching the
 * Project Bible's "Admin: Manage events". Event registration, QR codes,
 * notifications and chat logs are separate modules and are intentionally
 * not exposed here.
 */
@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
@Tag(name = "Events", description = "Campus event directory")
public class EventController {

    private final EventService eventService;

    @GetMapping
    @Operation(summary = "List all events", description = "Returns every event, ordered by start date/time.")
    public ResponseEntity<ApiResponse<List<EventResponse>>> getAllEvents() {
        List<EventResponse> events = eventService.getAllEvents();
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @GetMapping("/upcoming")
    @Operation(summary = "List upcoming events", description = "Returns every event currently in UPCOMING status.")
    public ResponseEntity<ApiResponse<List<EventResponse>>> getUpcomingEvents() {
        List<EventResponse> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "List events by status", description = "Returns every event in the given status (UPCOMING, ONGOING, COMPLETED or CANCELLED).")
    public ResponseEntity<ApiResponse<List<EventResponse>>> getEventsByStatus(
            @Parameter(description = "Event status") @PathVariable EventStatus status) {
        List<EventResponse> events = eventService.getEventsByStatus(status);
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "List events by category", description = "Returns every event in the given category.")
    public ResponseEntity<ApiResponse<List<EventResponse>>> getEventsByCategory(
            @Parameter(description = "Event category") @PathVariable String category) {
        List<EventResponse> events = eventService.getEventsByCategory(category);
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @GetMapping("/building/{buildingId}")
    @Operation(summary = "List events by building", description = "Returns every event scoped to the given building.")
    public ResponseEntity<ApiResponse<List<EventResponse>>> getEventsByBuilding(
            @Parameter(description = "Building id") @PathVariable UUID buildingId) {
        List<EventResponse> events = eventService.getEventsByBuilding(buildingId);
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @GetMapping("/room/{roomId}")
    @Operation(summary = "List events by room", description = "Returns every event scoped to the given room.")
    public ResponseEntity<ApiResponse<List<EventResponse>>> getEventsByRoom(
            @Parameter(description = "Room id") @PathVariable UUID roomId) {
        List<EventResponse> events = eventService.getEventsByRoom(roomId);
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @GetMapping("/range")
    @Operation(summary = "List events by date range", description = "Returns every event whose start date/time falls within the given range (ISO-8601 instants).")
    public ResponseEntity<ApiResponse<List<EventResponse>>> getEventsByDateRange(
            @Parameter(description = "Range start (inclusive, ISO-8601)") @RequestParam Instant start,
            @Parameter(description = "Range end (inclusive, ISO-8601)") @RequestParam Instant end) {
        List<EventResponse> events = eventService.getEventsByDateRange(start, end);
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get an event by id", description = "Returns a single event's full details.")
    public ResponseEntity<ApiResponse<EventResponse>> getEventById(
            @Parameter(description = "Event id") @PathVariable UUID id) {
        EventResponse event = eventService.getEventById(id);
        return ResponseEntity.ok(ApiResponse.success(event));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create an event", description = "Admin-only. Creates a new event listing, starting out UPCOMING.")
    public ResponseEntity<ApiResponse<EventResponse>> createEvent(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @Valid @RequestBody EventCreateRequest request) {
        EventResponse event = eventService.createEvent(currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Event created successfully", event));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an event", description = "Admin-only. Updates an existing event's details.")
    public ResponseEntity<ApiResponse<EventResponse>> updateEvent(
            @Parameter(description = "Event id") @PathVariable UUID id,
            @Valid @RequestBody EventUpdateRequest request) {
        EventResponse event = eventService.updateEvent(id, request);
        return ResponseEntity.ok(ApiResponse.success("Event updated successfully", event));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update event status", description = "Admin-only. Updates only an event's lifecycle status.")
    public ResponseEntity<ApiResponse<EventResponse>> updateEventStatus(
            @Parameter(description = "Event id") @PathVariable UUID id,
            @Valid @RequestBody EventStatusUpdateRequest request) {
        EventResponse event = eventService.updateEventStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success("Event status updated successfully", event));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete an event", description = "Admin-only. Removes an event listing.")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(
            @Parameter(description = "Event id") @PathVariable UUID id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok(ApiResponse.success("Event deleted successfully", null));
    }

}
