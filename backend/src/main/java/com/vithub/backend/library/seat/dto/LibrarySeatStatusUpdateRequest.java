package com.vithub.backend.library.seat.dto;

import com.vithub.backend.library.seat.entity.SeatStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Payload for {@code PATCH /library-seats/{id}/status}.
 * A focused, high-frequency operation (check in/out a seat) kept separate
 * from the full {@link LibrarySeatRequest} update.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibrarySeatStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private SeatStatus status;

}
