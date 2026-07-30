package com.vithub.backend.occupancy.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * Payload for {@code POST /occupancy} and {@code PUT /occupancy/{id}}.
 * The occupancy status is derived server-side from the room's capacity —
 * callers only ever report a headcount.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OccupancyRequest {

    @NotNull(message = "Room id is required")
    private UUID roomId;

    @NotNull(message = "Current count is required")
    @Min(value = 0, message = "Current count cannot be negative")
    private Integer currentCount;

}
