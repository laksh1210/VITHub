package com.vithub.backend.library.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of a {@link com.vithub.backend.library.entity.Library}
 * space. Returned by every {@code /library} endpoint; the entity is never
 * exposed directly. Building context is flattened in, and available seats
 * / occupancy percentage are derived rather than stored, mirroring the
 * Occupancy module's read model.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibraryResponse {

    private UUID id;
    private UUID buildingId;
    private String buildingName;
    private String buildingCode;
    private String name;
    private Integer floor;
    private Integer totalSeats;
    private Integer occupiedSeats;
    private Integer availableSeats;
    private double occupancyPercentage;
    private Integer silentRoomCount;
    private Integer discussionRoomCount;
    private boolean active;
    private Instant createdAt;
    private Instant updatedAt;

}
