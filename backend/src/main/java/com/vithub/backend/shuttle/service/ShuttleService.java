package com.vithub.backend.shuttle.service;

import com.vithub.backend.shuttle.dto.ShuttleRequest;
import com.vithub.backend.shuttle.dto.ShuttleResponse;
import com.vithub.backend.shuttle.dto.ShuttleStatusUpdateRequest;
import com.vithub.backend.shuttle.entity.ShuttleStatus;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Shuttle module. Implemented by
 * {@link com.vithub.backend.shuttle.service.impl.ShuttleServiceImpl}.
 */
public interface ShuttleService {

    List<ShuttleResponse> getAllShuttles();

    ShuttleResponse getShuttleById(UUID id);

    List<ShuttleResponse> getActiveShuttles();

    List<ShuttleResponse> getShuttlesByStatus(ShuttleStatus status);

    ShuttleResponse createShuttle(ShuttleRequest request);

    ShuttleResponse updateShuttle(UUID id, ShuttleRequest request);

    ShuttleResponse updateShuttleStatus(UUID id, ShuttleStatusUpdateRequest request);

    void deleteShuttle(UUID id);

}
