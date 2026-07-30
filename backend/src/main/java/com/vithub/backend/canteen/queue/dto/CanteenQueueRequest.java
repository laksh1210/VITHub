package com.vithub.backend.canteen.queue.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * Payload for {@code POST /canteen-queues} and {@code PUT /canteen-queues/{id}}.
 * The crowding status is derived server-side from the reported queue
 * count — callers only ever report a headcount and, optionally, a wait
 * estimate.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CanteenQueueRequest {

    @NotNull(message = "Canteen id is required")
    private UUID canteenId;

    @NotNull(message = "Queue count is required")
    @Min(value = 0, message = "Queue count cannot be negative")
    private Integer queueCount;

    @Min(value = 0, message = "Estimated wait minutes cannot be negative")
    private Integer estimatedWaitMinutes;

}
