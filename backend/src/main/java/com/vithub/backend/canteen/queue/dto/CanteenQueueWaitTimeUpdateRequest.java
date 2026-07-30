package com.vithub.backend.canteen.queue.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Payload for {@code PATCH /canteen-queues/{id}/wait-time}.
 * A focused, high-frequency operation (report a new ETA) kept separate
 * from the full {@link CanteenQueueRequest} update.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CanteenQueueWaitTimeUpdateRequest {

    @NotNull(message = "Estimated wait minutes is required")
    @Min(value = 0, message = "Estimated wait minutes cannot be negative")
    private Integer estimatedWaitMinutes;

}
