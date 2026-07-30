package com.vithub.backend.library.seat.dto;

import com.vithub.backend.library.seat.entity.SeatStatus;
import com.vithub.backend.library.seat.entity.SeatType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * Payload for {@code POST /library-seats} and {@code PUT /library-seats/{id}}.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibrarySeatRequest {

    @NotNull(message = "Library id is required")
    private UUID libraryId;

    @NotBlank(message = "Seat number is required")
    @Size(max = 20, message = "Seat number must not exceed 20 characters")
    private String seatNumber;

    @NotNull(message = "Seat type is required")
    private SeatType seatType;

    private SeatStatus status;

}
