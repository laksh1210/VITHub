package com.vithub.backend.canteen.service.impl;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.building.repository.BuildingRepository;
import com.vithub.backend.canteen.dto.CanteenRequest;
import com.vithub.backend.canteen.dto.CanteenResponse;
import com.vithub.backend.canteen.entity.Canteen;
import com.vithub.backend.canteen.mapper.CanteenMapper;
import com.vithub.backend.canteen.repository.CanteenRepository;
import com.vithub.backend.canteen.service.CanteenService;
import com.vithub.backend.common.exception.ConflictException;
import com.vithub.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link CanteenService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * The parent building is always re-resolved from {@code buildingId} on
 * create/update so a canteen can never reference one that doesn't exist.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CanteenServiceImpl implements CanteenService {

    private final CanteenRepository canteenRepository;
    private final BuildingRepository buildingRepository;
    private final CanteenMapper canteenMapper;

    @Override
    @Transactional(readOnly = true)
    public List<CanteenResponse> getAllCanteens(UUID buildingId) {
        List<Canteen> canteens = buildingId != null
                ? canteenRepository.findAllByBuildingIdOrderByNameAsc(buildingId)
                : canteenRepository.findAllByOrderByNameAsc();
        return canteens.stream()
                .map(canteenMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CanteenResponse getCanteenById(UUID id) {
        return canteenMapper.toResponse(findCanteenOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public CanteenResponse getCanteenByName(String name) {
        Canteen canteen = canteenRepository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new ResourceNotFoundException("Canteen not found with name: " + name));
        return canteenMapper.toResponse(canteen);
    }

    @Override
    @Transactional
    public CanteenResponse createCanteen(CanteenRequest request) {
        Building building = findBuildingOrThrow(request.getBuildingId());

        if (canteenRepository.existsByBuildingIdAndNameIgnoreCase(building.getId(), request.getName())) {
            throw new ConflictException(
                    "A canteen named '" + request.getName() + "' already exists in building '" + building.getCode() + "'");
        }

        Canteen canteen = canteenMapper.toEntity(request, building);
        Canteen saved = canteenRepository.save(canteen);
        log.info("Created canteen '{}' in building '{}'", saved.getName(), building.getCode());
        return canteenMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public CanteenResponse updateCanteen(UUID id, CanteenRequest request) {
        Canteen canteen = findCanteenOrThrow(id);
        Building building = findBuildingOrThrow(request.getBuildingId());

        if (canteenRepository.existsByBuildingIdAndNameIgnoreCaseAndIdNot(
                building.getId(), request.getName(), id)) {
            throw new ConflictException(
                    "A canteen named '" + request.getName() + "' already exists in building '" + building.getCode() + "'");
        }

        canteenMapper.updateEntity(canteen, request, building);
        Canteen saved = canteenRepository.save(canteen);
        log.info("Updated canteen '{}' in building '{}'", saved.getName(), building.getCode());
        return canteenMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteCanteen(UUID id) {
        Canteen canteen = findCanteenOrThrow(id);
        canteenRepository.delete(canteen);
        log.info("Deleted canteen '{}' from building '{}'", canteen.getName(), canteen.getBuilding().getCode());
    }

    private Canteen findCanteenOrThrow(UUID id) {
        return canteenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Canteen not found with id: " + id));
    }

    private Building findBuildingOrThrow(UUID buildingId) {
        return buildingRepository.findById(buildingId)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + buildingId));
    }

}
