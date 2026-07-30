package com.vithub.backend.occupancy.dto;

import com.vithub.backend.occupancy.entity.OccupancyStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of an {@link com.vithub.backend.occupancy.entity.Occupancy}
 * reading. Returned by every {@code /occupancy} endpoint; the entity is
 * never exposed directly. Room and building context is flattened in so
 * dashboard/heatmap consumers don't need a second call per room.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OccupancyResponse {

    private UUID id;
    private UUID roomId;
    private String roomNumber;
    private String roomName;
    private UUID buildingId;
    private String buildingName;
    private String buildingCode;
    private Integer capacity;
    private Integer currentCount;
    private Integer availableCapacity;
    private double occupancyPercentage;
    private OccupancyStatus status;
    private Instant recordedAt;
    private Instant createdAt;
    private Instant updatedAt;

}
