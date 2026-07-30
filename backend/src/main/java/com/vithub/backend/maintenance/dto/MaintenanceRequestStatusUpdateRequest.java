package com.vithub.backend.maintenance.dto;

import com.vithub.backend.maintenance.entity.MaintenanceStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Payload for {@code PATCH /maintenance/{id}/status}.
 * A focused, high-frequency operation (move a complaint through its
 * lifecycle) kept separate from the full {@link MaintenanceRequestUpdateRequest}
 * update, mirroring the shuttle/library-seat status-update pattern.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceRequestStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private MaintenanceStatus status;

}
