package com.vithub.backend.events.dto;

import com.vithub.backend.events.entity.EventStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Payload for {@code PATCH /events/{id}/status}.
 * A focused, high-frequency operation (move an event through its
 * lifecycle, or cancel it) kept separate from the full
 * {@link EventUpdateRequest} update, mirroring the shuttle/library-seat/
 * maintenance-request status-update pattern.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private EventStatus status;

}
