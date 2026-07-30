package com.vithub.backend.room.dto;

import com.vithub.backend.room.entity.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of a {@link com.vithub.backend.room.entity.Room}.
 * Returned by every {@code /rooms} endpoint; the entity is never exposed
 * directly. The parent building is flattened to its id/name/code so
 * consumers don't have to make a second call for the common case.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomResponse {

    private UUID id;
    private UUID buildingId;
    private String buildingName;
    private String buildingCode;
    private String roomNumber;
    private String name;
    private RoomType type;
    private Integer floor;
    private Integer capacity;
    private boolean active;
    private Instant createdAt;
    private Instant updatedAt;

}
