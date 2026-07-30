package com.vithub.backend.library.seat.dto;

import com.vithub.backend.library.seat.entity.SeatStatus;
import com.vithub.backend.library.seat.entity.SeatType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of a {@link com.vithub.backend.library.seat.entity.LibrarySeat}.
 * Returned by every {@code /library-seats} endpoint; the entity is never
 * exposed directly. Library context is flattened in so consumers don't
 * need a second call per seat.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibrarySeatResponse {

    private UUID id;
    private UUID libraryId;
    private String libraryName;
    private UUID buildingId;
    private String buildingName;
    private String seatNumber;
    private SeatType seatType;
    private SeatStatus status;
    private Instant createdAt;
    private Instant updatedAt;

}
