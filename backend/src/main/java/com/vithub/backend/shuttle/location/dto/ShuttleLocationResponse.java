package com.vithub.backend.shuttle.location.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of a {@link com.vithub.backend.shuttle.location.entity.ShuttleLocation}
 * ping. Returned by every {@code /shuttle-locations} endpoint; the entity
 * is never exposed directly. Shuttle context is flattened in so campus
 * map and AI assistant consumers don't need a second call per shuttle.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShuttleLocationResponse {

    private UUID id;
    private UUID shuttleId;
    private String shuttleNumber;
    private String shuttleName;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private Double speed;
    private String direction;
    private String currentStopName;
    private Instant lastUpdatedAt;
    private Instant createdAt;
    private Instant updatedAt;

}
