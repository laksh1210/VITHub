package com.vithub.backend.shuttle.dto;

import com.vithub.backend.shuttle.entity.ShuttleStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Payload for {@code PATCH /shuttles/{id}/status}.
 * A focused, high-frequency operation (take a shuttle in/out of service)
 * kept separate from the full {@link ShuttleRequest} update, mirroring
 * the library seat status-update pattern.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShuttleStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private ShuttleStatus status;

}
