package com.vithub.backend.shuttle.dto;

import com.vithub.backend.shuttle.entity.ShuttleStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of a {@link com.vithub.backend.shuttle.entity.Shuttle}.
 * Returned by every {@code /shuttles} endpoint; the entity is never
 * exposed directly. Live position is not part of this response — it
 * belongs to the separate shuttle_locations module.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShuttleResponse {

    private UUID id;
    private String shuttleNumber;
    private String shuttleName;
    private String driverName;
    private String driverContact;
    private Integer capacity;
    private ShuttleStatus status;
    private Instant createdAt;
    private Instant updatedAt;

}
