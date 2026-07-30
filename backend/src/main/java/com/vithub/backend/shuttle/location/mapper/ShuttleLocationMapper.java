package com.vithub.backend.shuttle.location.mapper;

import com.vithub.backend.shuttle.entity.Shuttle;
import com.vithub.backend.shuttle.location.dto.ShuttleLocationResponse;
import com.vithub.backend.shuttle.location.entity.ShuttleLocation;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;

/**
 * Entity-to-DTO mapping for {@link ShuttleLocation}. Entities must never
 * be returned directly from a controller; this is the single place that
 * decides what of a ShuttleLocation ping is safe to expose. Resolving
 * {@code shuttleId} to a {@link Shuttle} is the service's job — the
 * mapper only wires the already-resolved entity in.
 */
@Component
public class ShuttleLocationMapper {

    public ShuttleLocationResponse toResponse(ShuttleLocation location) {
        Shuttle shuttle = location.getShuttle();

        return ShuttleLocationResponse.builder()
                .id(location.getId())
                .shuttleId(shuttle.getId())
                .shuttleNumber(shuttle.getShuttleNumber())
                .shuttleName(shuttle.getShuttleName())
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .speed(location.getSpeed())
                .direction(location.getDirection())
                .currentStopName(location.getCurrentStopName())
                .lastUpdatedAt(location.getLastUpdatedAt())
                .createdAt(location.getCreatedAt())
                .updatedAt(location.getUpdatedAt())
                .build();
    }

    public ShuttleLocation toEntity(Shuttle shuttle, BigDecimal latitude, BigDecimal longitude, Double speed,
                                     String direction, String currentStopName, Instant lastUpdatedAt) {
        return ShuttleLocation.builder()
                .shuttle(shuttle)
                .latitude(latitude)
                .longitude(longitude)
                .speed(speed)
                .direction(direction)
                .currentStopName(currentStopName)
                .lastUpdatedAt(lastUpdatedAt)
                .build();
    }

    /**
     * Applies an update onto an already-persisted entity in place, so
     * JPA's dirty-checking picks up the changes on flush.
     */
    public void updateEntity(ShuttleLocation location, Shuttle shuttle, BigDecimal latitude, BigDecimal longitude,
                              Double speed, String direction, String currentStopName, Instant lastUpdatedAt) {
        location.setShuttle(shuttle);
        location.setLatitude(latitude);
        location.setLongitude(longitude);
        location.setSpeed(speed);
        location.setDirection(direction);
        location.setCurrentStopName(currentStopName);
        location.setLastUpdatedAt(lastUpdatedAt);
    }

}
