package com.vithub.backend.shuttle.location.service;

import com.vithub.backend.shuttle.location.dto.ShuttleLocationRequest;
import com.vithub.backend.shuttle.location.dto.ShuttleLocationResponse;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Shuttle Location module. Implemented by
 * {@link com.vithub.backend.shuttle.location.service.impl.ShuttleLocationServiceImpl}.
 */
public interface ShuttleLocationService {

    List<ShuttleLocationResponse> getAllCurrentLocations();

    ShuttleLocationResponse getLocationById(UUID id);

    ShuttleLocationResponse getLatestLocationByShuttleId(UUID shuttleId);

    List<ShuttleLocationResponse> getLocationHistoryByShuttleId(UUID shuttleId);

    ShuttleLocationResponse recordLocation(ShuttleLocationRequest request);

    ShuttleLocationResponse updateLocation(UUID id, ShuttleLocationRequest request);

    void deleteLocation(UUID id);

}
