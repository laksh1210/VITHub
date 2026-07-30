package com.vithub.backend.canteen.queue.mapper;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.canteen.entity.Canteen;
import com.vithub.backend.canteen.queue.dto.CanteenQueueResponse;
import com.vithub.backend.canteen.queue.entity.CanteenQueue;
import com.vithub.backend.canteen.queue.entity.CanteenQueueStatus;
import org.springframework.stereotype.Component;

import java.time.Instant;

/**
 * Entity-to-DTO mapping for {@link CanteenQueue}. Entities must never be
 * returned directly from a controller; this is the single place that
 * decides what of a CanteenQueue reading is safe to expose. Resolving
 * {@code canteenId} to a {@link Canteen} and deriving the
 * {@link CanteenQueueStatus} tier are the service's job — the mapper only
 * wires the already-resolved values in.
 */
@Component
public class CanteenQueueMapper {

    public CanteenQueueResponse toResponse(CanteenQueue queue) {
        Canteen canteen = queue.getCanteen();
        Building building = canteen.getBuilding();

        return CanteenQueueResponse.builder()
                .id(queue.getId())
                .canteenId(canteen.getId())
                .canteenName(canteen.getName())
                .buildingId(building.getId())
                .buildingName(building.getName())
                .buildingCode(building.getCode())
                .queueCount(queue.getQueueCount())
                .estimatedWaitMinutes(queue.getEstimatedWaitMinutes())
                .status(queue.getStatus())
                .recordedAt(queue.getRecordedAt())
                .createdAt(queue.getCreatedAt())
                .updatedAt(queue.getUpdatedAt())
                .build();
    }

    public CanteenQueue toEntity(Canteen canteen, Integer queueCount, Integer estimatedWaitMinutes,
                                  CanteenQueueStatus status, Instant recordedAt) {
        return CanteenQueue.builder()
                .canteen(canteen)
                .queueCount(queueCount)
                .estimatedWaitMinutes(estimatedWaitMinutes)
                .status(status)
                .recordedAt(recordedAt)
                .build();
    }

    /**
     * Applies an update onto an already-persisted entity in place, so
     * JPA's dirty-checking picks up the changes on flush.
     */
    public void updateEntity(CanteenQueue queue, Canteen canteen, Integer queueCount, Integer estimatedWaitMinutes,
                              CanteenQueueStatus status, Instant recordedAt) {
        queue.setCanteen(canteen);
        queue.setQueueCount(queueCount);
        queue.setEstimatedWaitMinutes(estimatedWaitMinutes);
        queue.setStatus(status);
        queue.setRecordedAt(recordedAt);
    }

}
