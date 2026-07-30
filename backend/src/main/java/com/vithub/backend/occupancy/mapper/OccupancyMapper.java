package com.vithub.backend.occupancy.mapper;

import com.vithub.backend.occupancy.dto.OccupancyResponse;
import com.vithub.backend.occupancy.entity.Occupancy;
import com.vithub.backend.occupancy.entity.OccupancyStatus;
import com.vithub.backend.room.entity.Room;
import org.springframework.stereotype.Component;

import java.time.Instant;

/**
 * Entity-to-DTO mapping for {@link Occupancy}. Entities must never be
 * returned directly from a controller; this is the single place that
 * decides what of an Occupancy reading is safe to expose. Deriving the
 * {@link OccupancyStatus} tier is a business decision and stays in the
 * service layer — the mapper only assembles the read-only response shape.
 */
@Component
public class OccupancyMapper {

    public OccupancyResponse toResponse(Occupancy occupancy) {
        Room room = occupancy.getRoom();
        int capacity = room.getCapacity();
        int currentCount = occupancy.getCurrentCount();
        int availableCapacity = Math.max(capacity - currentCount, 0);
        double occupancyPercentage = capacity > 0
                ? Math.round((currentCount * 10000.0) / capacity) / 100.0
                : 0.0;

        return OccupancyResponse.builder()
                .id(occupancy.getId())
                .roomId(room.getId())
                .roomNumber(room.getRoomNumber())
                .roomName(room.getName())
                .buildingId(room.getBuilding().getId())
                .buildingName(room.getBuilding().getName())
                .buildingCode(room.getBuilding().getCode())
                .capacity(capacity)
                .currentCount(currentCount)
                .availableCapacity(availableCapacity)
                .occupancyPercentage(occupancyPercentage)
                .status(occupancy.getStatus())
                .recordedAt(occupancy.getRecordedAt())
                .createdAt(occupancy.getCreatedAt())
                .updatedAt(occupancy.getUpdatedAt())
                .build();
    }

    public Occupancy toEntity(Room room, Integer currentCount, OccupancyStatus status, Instant recordedAt) {
        return Occupancy.builder()
                .room(room)
                .currentCount(currentCount)
                .status(status)
                .recordedAt(recordedAt)
                .build();
    }

    /**
     * Applies a new reading onto an already-persisted entity in place,
     * so JPA's dirty-checking picks up the changes on flush.
     */
    public void updateEntity(Occupancy occupancy, Room room, Integer currentCount, OccupancyStatus status, Instant recordedAt) {
        occupancy.setRoom(room);
        occupancy.setCurrentCount(currentCount);
        occupancy.setStatus(status);
        occupancy.setRecordedAt(recordedAt);
    }

}
