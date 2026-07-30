package com.vithub.backend.canteen.queue.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Payload for {@code PATCH /canteen-queues/{id}/count}.
 * A focused, high-frequency operation (report a new headcount) kept
 * separate from the full {@link CanteenQueueRequest} update, mirroring
 * the library seat status-update pattern.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CanteenQueueCountUpdateRequest {

    @NotNull(message = "Queue count is required")
    @Min(value = 0, message = "Queue count cannot be negative")
    private Integer queueCount;

}
