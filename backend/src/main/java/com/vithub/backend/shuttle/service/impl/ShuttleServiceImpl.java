package com.vithub.backend.shuttle.service.impl;

import com.vithub.backend.common.exception.ConflictException;
import com.vithub.backend.common.exception.ResourceNotFoundException;
import com.vithub.backend.shuttle.dto.ShuttleRequest;
import com.vithub.backend.shuttle.dto.ShuttleResponse;
import com.vithub.backend.shuttle.dto.ShuttleStatusUpdateRequest;
import com.vithub.backend.shuttle.entity.Shuttle;
import com.vithub.backend.shuttle.entity.ShuttleStatus;
import com.vithub.backend.shuttle.mapper.ShuttleMapper;
import com.vithub.backend.shuttle.repository.ShuttleRepository;
import com.vithub.backend.shuttle.service.ShuttleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link ShuttleService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * The shuttle number is normalized (trimmed, uppercased) and checked for
 * uniqueness on create/update, mirroring {@code BuildingServiceImpl}'s
 * handling of building codes.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ShuttleServiceImpl implements ShuttleService {

    private final ShuttleRepository shuttleRepository;
    private final ShuttleMapper shuttleMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ShuttleResponse> getAllShuttles() {
        return shuttleRepository.findAllByOrderByShuttleNumberAsc().stream()
                .map(shuttleMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ShuttleResponse getShuttleById(UUID id) {
        return shuttleMapper.toResponse(findShuttleOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShuttleResponse> getActiveShuttles() {
        return getShuttlesByStatus(ShuttleStatus.ACTIVE);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShuttleResponse> getShuttlesByStatus(ShuttleStatus status) {
        return shuttleRepository.findAllByStatusOrderByShuttleNumberAsc(status).stream()
                .map(shuttleMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public ShuttleResponse createShuttle(ShuttleRequest request) {
        String normalizedNumber = normalizeShuttleNumber(request.getShuttleNumber());
        if (shuttleRepository.existsByShuttleNumberIgnoreCase(normalizedNumber)) {
            throw new ConflictException("A shuttle with number '" + normalizedNumber + "' already exists");
        }

        request.setShuttleNumber(normalizedNumber);
        Shuttle shuttle = shuttleMapper.toEntity(request);
        Shuttle saved = shuttleRepository.save(shuttle);
        log.info("Created shuttle '{}' ({})", saved.getShuttleName(), saved.getShuttleNumber());
        return shuttleMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public ShuttleResponse updateShuttle(UUID id, ShuttleRequest request) {
        Shuttle shuttle = findShuttleOrThrow(id);

        String normalizedNumber = normalizeShuttleNumber(request.getShuttleNumber());
        if (shuttleRepository.existsByShuttleNumberIgnoreCaseAndIdNot(normalizedNumber, id)) {
            throw new ConflictException("A shuttle with number '" + normalizedNumber + "' already exists");
        }

        request.setShuttleNumber(normalizedNumber);
        shuttleMapper.updateEntity(shuttle, request);
        Shuttle saved = shuttleRepository.save(shuttle);
        log.info("Updated shuttle '{}' ({})", saved.getShuttleName(), saved.getShuttleNumber());
        return shuttleMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public ShuttleResponse updateShuttleStatus(UUID id, ShuttleStatusUpdateRequest request) {
        Shuttle shuttle = findShuttleOrThrow(id);
        shuttle.setStatus(request.getStatus());
        Shuttle saved = shuttleRepository.save(shuttle);
        log.info("Updated shuttle '{}' status to {}", saved.getShuttleNumber(), saved.getStatus());
        return shuttleMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteShuttle(UUID id) {
        Shuttle shuttle = findShuttleOrThrow(id);
        shuttleRepository.delete(shuttle);
        log.info("Deleted shuttle '{}' ({})", shuttle.getShuttleName(), shuttle.getShuttleNumber());
    }

    private Shuttle findShuttleOrThrow(UUID id) {
        return shuttleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shuttle not found with id: " + id));
    }

    private String normalizeShuttleNumber(String shuttleNumber) {
        return shuttleNumber == null ? null : shuttleNumber.trim().toUpperCase();
    }

}
