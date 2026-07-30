package com.vithub.backend.shuttle.location.service.impl;

import com.vithub.backend.common.exception.ResourceNotFoundException;
import com.vithub.backend.shuttle.entity.Shuttle;
import com.vithub.backend.shuttle.location.dto.ShuttleLocationRequest;
import com.vithub.backend.shuttle.location.dto.ShuttleLocationResponse;
import com.vithub.backend.shuttle.location.entity.ShuttleLocation;
import com.vithub.backend.shuttle.location.mapper.ShuttleLocationMapper;
import com.vithub.backend.shuttle.location.repository.ShuttleLocationRepository;
import com.vithub.backend.shuttle.location.service.ShuttleLocationService;
import com.vithub.backend.shuttle.repository.ShuttleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link ShuttleLocationService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * The parent shuttle is always re-resolved from {@code shuttleId} on
 * record/update so a location ping can never reference one that doesn't
 * exist. Unlike Occupancy or CanteenQueue, this is a history log rather
 * than a one-per-parent snapshot, so every {@link #recordLocation} call
 * inserts a new row instead of upserting.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ShuttleLocationServiceImpl implements ShuttleLocationService {

    private final ShuttleLocationRepository shuttleLocationRepository;
    private final ShuttleRepository shuttleRepository;
    private final ShuttleLocationMapper shuttleLocationMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ShuttleLocationResponse> getAllCurrentLocations() {
        return shuttleLocationRepository.findAllCurrentLocations().stream()
                .map(shuttleLocationMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ShuttleLocationResponse getLocationById(UUID id) {
        return shuttleLocationMapper.toResponse(findLocationOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public ShuttleLocationResponse getLatestLocationByShuttleId(UUID shuttleId) {
        ShuttleLocation location = shuttleLocationRepository.findTopByShuttleIdOrderByLastUpdatedAtDesc(shuttleId)
                .orElseThrow(() -> new ResourceNotFoundException("No location record found for shuttle id: " + shuttleId));
        return shuttleLocationMapper.toResponse(location);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShuttleLocationResponse> getLocationHistoryByShuttleId(UUID shuttleId) {
        return shuttleLocationRepository.findAllByShuttleIdOrderByLastUpdatedAtDesc(shuttleId).stream()
                .map(shuttleLocationMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public ShuttleLocationResponse recordLocation(ShuttleLocationRequest request) {
        Shuttle shuttle = findShuttleOrThrow(request.getShuttleId());

        ShuttleLocation location = shuttleLocationMapper.toEntity(
                shuttle, request.getLatitude(), request.getLongitude(), request.getSpeed(),
                request.getDirection(), request.getCurrentStopName(), Instant.now());
        ShuttleLocation saved = shuttleLocationRepository.save(location);
        log.info("Recorded location for shuttle '{}': ({}, {})",
                shuttle.getShuttleNumber(), saved.getLatitude(), saved.getLongitude());
        return shuttleLocationMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public ShuttleLocationResponse updateLocation(UUID id, ShuttleLocationRequest request) {
        ShuttleLocation location = findLocationOrThrow(id);
        Shuttle shuttle = findShuttleOrThrow(request.getShuttleId());

        shuttleLocationMapper.updateEntity(
                location, shuttle, request.getLatitude(), request.getLongitude(), request.getSpeed(),
                request.getDirection(), request.getCurrentStopName(), Instant.now());
        ShuttleLocation saved = shuttleLocationRepository.save(location);
        log.info("Updated location record '{}' for shuttle '{}'", saved.getId(), shuttle.getShuttleNumber());
        return shuttleLocationMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteLocation(UUID id) {
        ShuttleLocation location = findLocationOrThrow(id);
        shuttleLocationRepository.delete(location);
        log.info("Deleted location record '{}' for shuttle '{}'", id, location.getShuttle().getShuttleNumber());
    }

    private ShuttleLocation findLocationOrThrow(UUID id) {
        return shuttleLocationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Location record not found with id: " + id));
    }

    private Shuttle findShuttleOrThrow(UUID shuttleId) {
        return shuttleRepository.findById(shuttleId)
                .orElseThrow(() -> new ResourceNotFoundException("Shuttle not found with id: " + shuttleId));
    }

}
