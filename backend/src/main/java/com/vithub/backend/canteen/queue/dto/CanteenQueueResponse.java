package com.vithub.backend.canteen.queue.dto;

import com.vithub.backend.canteen.queue.entity.CanteenQueueStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of a {@link com.vithub.backend.canteen.queue.entity.CanteenQueue}
 * reading. Returned by every {@code /canteen-queues} endpoint; the entity
 * is never exposed directly. Canteen and building context is flattened in
 * so dashboard and AI assistant consumers don't need a second call per
 * canteen.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CanteenQueueResponse {

    private UUID id;
    private UUID canteenId;
    private String canteenName;
    private UUID buildingId;
    private String buildingName;
    private String buildingCode;
    private Integer queueCount;
    private Integer estimatedWaitMinutes;
    private CanteenQueueStatus status;
    private Instant recordedAt;
    private Instant createdAt;
    private Instant updatedAt;

}
