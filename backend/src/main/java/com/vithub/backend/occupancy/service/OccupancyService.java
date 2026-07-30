package com.vithub.backend.occupancy.service;

import com.vithub.backend.occupancy.dto.OccupancyRequest;
import com.vithub.backend.occupancy.dto.OccupancyResponse;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Classroom Occupancy module. Implemented by
 * {@link com.vithub.backend.occupancy.service.impl.OccupancyServiceImpl}.
 */
public interface OccupancyService {

    List<OccupancyResponse> getAllOccupancy(UUID buildingId);

    OccupancyResponse getOccupancyById(UUID id);

    OccupancyResponse getOccupancyByRoomId(UUID roomId);

    OccupancyResponse createOccupancy(OccupancyRequest request);

    OccupancyResponse updateOccupancy(UUID id, OccupancyRequest request);

    void deleteOccupancy(UUID id);

}
