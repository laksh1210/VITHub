package com.vithub.backend.building.service;

import com.vithub.backend.building.dto.BuildingRequest;
import com.vithub.backend.building.dto.BuildingResponse;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Building module. Implemented by
 * {@link com.vithub.backend.building.service.impl.BuildingServiceImpl}.
 */
public interface BuildingService {

    List<BuildingResponse> getAllBuildings();

    BuildingResponse getBuildingById(UUID id);

    BuildingResponse createBuilding(BuildingRequest request);

    BuildingResponse updateBuilding(UUID id, BuildingRequest request);

    void deleteBuilding(UUID id);

}
