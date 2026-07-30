package com.vithub.backend.shuttle.mapper;

import com.vithub.backend.shuttle.dto.ShuttleRequest;
import com.vithub.backend.shuttle.dto.ShuttleResponse;
import com.vithub.backend.shuttle.entity.Shuttle;
import org.springframework.stereotype.Component;

/**
 * Entity-to-DTO mapping for {@link Shuttle}. Entities must never be
 * returned directly from a controller; this is the single place that
 * decides what of a Shuttle is safe to expose, and how an incoming
 * request is applied to the entity.
 */
@Component
public class ShuttleMapper {

    public ShuttleResponse toResponse(Shuttle shuttle) {
        return ShuttleResponse.builder()
                .id(shuttle.getId())
                .shuttleNumber(shuttle.getShuttleNumber())
                .shuttleName(shuttle.getShuttleName())
                .driverName(shuttle.getDriverName())
                .driverContact(shuttle.getDriverContact())
                .capacity(shuttle.getCapacity())
                .status(shuttle.getStatus())
                .createdAt(shuttle.getCreatedAt())
                .updatedAt(shuttle.getUpdatedAt())
                .build();
    }

    public Shuttle toEntity(ShuttleRequest request) {
        return Shuttle.builder()
                .shuttleNumber(request.getShuttleNumber())
                .shuttleName(request.getShuttleName())
                .driverName(request.getDriverName())
                .driverContact(request.getDriverContact())
                .capacity(request.getCapacity())
                .status(request.getStatus())
                .build();
    }

    /**
     * Applies an update request onto an already-persisted entity in place,
     * so JPA's dirty-checking picks up the changes on flush.
     */
    public void updateEntity(Shuttle shuttle, ShuttleRequest request) {
        shuttle.setShuttleNumber(request.getShuttleNumber());
        shuttle.setShuttleName(request.getShuttleName());
        shuttle.setDriverName(request.getDriverName());
        shuttle.setDriverContact(request.getDriverContact());
        shuttle.setCapacity(request.getCapacity());
        shuttle.setStatus(request.getStatus());
    }

}
