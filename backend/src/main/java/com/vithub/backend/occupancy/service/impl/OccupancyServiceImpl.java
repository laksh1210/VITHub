package com.vithub.backend.occupancy.service.impl;

import com.vithub.backend.common.exception.ConflictException;
import com.vithub.backend.common.exception.ResourceNotFoundException;
import com.vithub.backend.occupancy.dto.OccupancyRequest;
import com.vithub.backend.occupancy.dto.OccupancyResponse;
import com.vithub.backend.occupancy.entity.Occupancy;
import com.vithub.backend.occupancy.entity.OccupancyStatus;
import com.vithub.backend.occupancy.mapper.OccupancyMapper;
import com.vithub.backend.occupancy.repository.OccupancyRepository;
import com.vithub.backend.occupancy.service.OccupancyService;
import com.vithub.backend.room.entity.Room;
import com.vithub.backend.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link OccupancyService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * The parent room is always re-resolved from {@code roomId} on
 * create/update so an occupancy reading can never reference one that
 * doesn't exist, and the {@link OccupancyStatus} heatmap tier is derived
 * here from the room's capacity rather than trusted from the caller.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class OccupancyServiceImpl implements OccupancyService {

    /** Occupancy percentage below which a room is considered AVAILABLE. */
    private static final double AVAILABLE_THRESHOLD = 40.0;
    /** Occupancy percentage below which a room is considered MODERATE (otherwise CROWDED). */
    private static final double MODERATE_THRESHOLD = 75.0;
    /** Occupancy percentage at or above which a room is considered FULL. */
    private static final double FULL_THRESHOLD = 100.0;

    private final OccupancyRepository occupancyRepository;
    private final RoomRepository roomRepository;
    private final OccupancyMapper occupancyMapper;

    @Override
    @Transactional(readOnly = true)
    public List<OccupancyResponse> getAllOccupancy(UUID buildingId) {
        List<Occupancy> readings = buildingId != null
                ? occupancyRepository.findAllByRoomBuildingIdOrderByRoomRoomNumberAsc(buildingId)
                : occupancyRepository.findAllByOrderByRoomRoomNumberAsc();
        return readings.stream()
                .map(occupancyMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public OccupancyResponse getOccupancyById(UUID id) {
        return occupancyMapper.toResponse(findOccupancyOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public OccupancyResponse getOccupancyByRoomId(UUID roomId) {
        Occupancy occupancy = occupancyRepository.findByRoomId(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("No occupancy record found for room id: " + roomId));
        return occupancyMapper.toResponse(occupancy);
    }

    @Override
    @Transactional
    public OccupancyResponse createOccupancy(OccupancyRequest request) {
        Room room = findRoomOrThrow(request.getRoomId());

        if (occupancyRepository.existsByRoomId(room.getId())) {
            throw new ConflictException("An occupancy record already exists for room: " + room.getRoomNumber());
        }

        OccupancyStatus status = resolveStatus(request.getCurrentCount(), room.getCapacity());
        Occupancy occupancy = occupancyMapper.toEntity(room, request.getCurrentCount(), status, Instant.now());
        Occupancy saved = occupancyRepository.save(occupancy);
        log.info("Created occupancy record for room '{}': {} / {}", room.getRoomNumber(), saved.getCurrentCount(), room.getCapacity());
        return occupancyMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public OccupancyResponse updateOccupancy(UUID id, OccupancyRequest request) {
        Occupancy occupancy = findOccupancyOrThrow(id);
        Room room = findRoomOrThrow(request.getRoomId());

        if (occupancyRepository.existsByRoomIdAndIdNot(room.getId(), id)) {
            throw new ConflictException("An occupancy record already exists for room: " + room.getRoomNumber());
        }

        OccupancyStatus status = resolveStatus(request.getCurrentCount(), room.getCapacity());
        occupancyMapper.updateEntity(occupancy, room, request.getCurrentCount(), status, Instant.now());
        Occupancy saved = occupancyRepository.save(occupancy);
        log.info("Updated occupancy record for room '{}': {} / {}", room.getRoomNumber(), saved.getCurrentCount(), room.getCapacity());
        return occupancyMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteOccupancy(UUID id) {
        Occupancy occupancy = findOccupancyOrThrow(id);
        occupancyRepository.delete(occupancy);
        log.info("Deleted occupancy record for room '{}'", occupancy.getRoom().getRoomNumber());
    }

    private Occupancy findOccupancyOrThrow(UUID id) {
        return occupancyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Occupancy record not found with id: " + id));
    }

    private Room findRoomOrThrow(UUID roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + roomId));
    }

    private OccupancyStatus resolveStatus(int currentCount, int capacity) {
        if (capacity <= 0) {
            return OccupancyStatus.FULL;
        }
        double percentage = (currentCount * 100.0) / capacity;
        if (percentage >= FULL_THRESHOLD) {
            return OccupancyStatus.FULL;
        }
        if (percentage >= MODERATE_THRESHOLD) {
            return OccupancyStatus.CROWDED;
        }
        if (percentage >= AVAILABLE_THRESHOLD) {
            return OccupancyStatus.MODERATE;
        }
        return OccupancyStatus.AVAILABLE;
    }

}
