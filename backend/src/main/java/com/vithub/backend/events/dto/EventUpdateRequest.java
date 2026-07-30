package com.vithub.backend.events.dto;

import com.vithub.backend.events.entity.EventType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * Payload for {@code PUT /events/{id}}.
 * Updates an event's descriptive and scheduling fields. Status and the
 * creator are deliberately excluded — status is updated through its own
 * dedicated endpoint, and the creator never changes.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventUpdateRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category must not exceed 50 characters")
    private String category;

    @NotNull(message = "Event type is required")
    private EventType eventType;

    @NotBlank(message = "Organizer is required")
    @Size(max = 150, message = "Organizer must not exceed 150 characters")
    private String organizer;

    @NotNull(message = "Start date/time is required")
    private Instant startDateTime;

    @NotNull(message = "End date/time is required")
    private Instant endDateTime;

    @NotBlank(message = "Venue is required")
    @Size(max = 200, message = "Venue must not exceed 200 characters")
    private String venue;

    /** Optional — the building this event takes place in. */
    private UUID buildingId;

    /** Optional — the room this event takes place in. */
    private UUID roomId;

    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;

    @NotNull(message = "Registration-required flag is required")
    private Boolean registrationRequired;

}
