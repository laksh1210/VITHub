package com.vithub.backend.building.service.impl;

import com.vithub.backend.building.dto.BuildingRequest;
import com.vithub.backend.building.dto.BuildingResponse;
import com.vithub.backend.building.entity.Building;
import com.vithub.backend.building.mapper.BuildingMapper;
import com.vithub.backend.building.repository.BuildingRepository;
import com.vithub.backend.building.service.BuildingService;
import com.vithub.backend.common.exception.ConflictException;
import com.vithub.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link BuildingService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class BuildingServiceImpl implements BuildingService {

    private final BuildingRepository buildingRepository;
    private final BuildingMapper buildingMapper;

    @Override
    @Transactional(readOnly = true)
    public List<BuildingResponse> getAllBuildings() {
        return buildingRepository.findAllByOrderByNameAsc().stream()
                .map(buildingMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public BuildingResponse getBuildingById(UUID id) {
        return buildingMapper.toResponse(findBuildingOrThrow(id));
    }

    @Override
    @Transactional
    public BuildingResponse createBuilding(BuildingRequest request) {
        String normalizedCode = normalizeCode(request.getCode());
        if (buildingRepository.existsByCode(normalizedCode)) {
            throw new ConflictException("A building with code '" + normalizedCode + "' already exists");
        }

        request.setCode(normalizedCode);
        Building building = buildingMapper.toEntity(request);
        Building saved = buildingRepository.save(building);
        log.info("Created building '{}' ({})", saved.getName(), saved.getCode());
        return buildingMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public BuildingResponse updateBuilding(UUID id, BuildingRequest request) {
        Building building = findBuildingOrThrow(id);

        String normalizedCode = normalizeCode(request.getCode());
        if (buildingRepository.existsByCodeAndIdNot(normalizedCode, id)) {
            throw new ConflictException("A building with code '" + normalizedCode + "' already exists");
        }

        request.setCode(normalizedCode);
        buildingMapper.updateEntity(building, request);
        Building saved = buildingRepository.save(building);
        log.info("Updated building '{}' ({})", saved.getName(), saved.getCode());
        return buildingMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteBuilding(UUID id) {
        Building building = findBuildingOrThrow(id);
        buildingRepository.delete(building);
        log.info("Deleted building '{}' ({})", building.getName(), building.getCode());
    }

    private Building findBuildingOrThrow(UUID id) {
        return buildingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + id));
    }

    private String normalizeCode(String code) {
        return code == null ? null : code.trim().toUpperCase();
    }

}
