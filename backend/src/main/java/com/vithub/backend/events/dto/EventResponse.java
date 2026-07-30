package com.vithub.backend.events.dto;

import com.vithub.backend.events.entity.EventStatus;
import com.vithub.backend.events.entity.EventType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of an {@link com.vithub.backend.events.entity.Event}.
 * Returned by every {@code /events} endpoint; the entity is never exposed
 * directly. The optional building/room and the creator are flattened in
 * so consumers don't have to make a second call for the common case.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventResponse {

    private UUID id;
    private String title;
    private String description;
    private String category;
    private EventType eventType;
    private String organizer;
    private Instant startDateTime;
    private Instant endDateTime;
    private String venue;

    private UUID buildingId;
    private String buildingName;

    private UUID roomId;
    private String roomNumber;

    private Integer capacity;
    private boolean registrationRequired;
    private EventStatus status;

    private UUID createdById;
    private String createdByUsername;
    private String createdByFullName;

    private Instant createdAt;
    private Instant updatedAt;

}
