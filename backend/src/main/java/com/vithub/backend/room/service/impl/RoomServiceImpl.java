package com.vithub.backend.room.service.impl;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.building.repository.BuildingRepository;
import com.vithub.backend.common.exception.ConflictException;
import com.vithub.backend.common.exception.ResourceNotFoundException;
import com.vithub.backend.room.dto.RoomRequest;
import com.vithub.backend.room.dto.RoomResponse;
import com.vithub.backend.room.entity.Room;
import com.vithub.backend.room.mapper.RoomMapper;
import com.vithub.backend.room.repository.RoomRepository;
import com.vithub.backend.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link RoomService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * The parent building is always re-resolved from {@code buildingId} on
 * create/update so a room can never reference one that doesn't exist.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final BuildingRepository buildingRepository;
    private final RoomMapper roomMapper;

    @Override
    @Transactional(readOnly = true)
    public List<RoomResponse> getAllRooms(UUID buildingId) {
        List<Room> rooms = buildingId != null
                ? roomRepository.findAllByBuildingIdOrderByRoomNumberAsc(buildingId)
                : roomRepository.findAllByOrderByRoomNumberAsc();
        return rooms.stream()
                .map(roomMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public RoomResponse getRoomById(UUID id) {
        return roomMapper.toResponse(findRoomOrThrow(id));
    }

    @Override
    @Transactional
    public RoomResponse createRoom(RoomRequest request) {
        Building building = findBuildingOrThrow(request.getBuildingId());

        if (roomRepository.existsByBuildingIdAndRoomNumberIgnoreCase(building.getId(), request.getRoomNumber())) {
            throw new ConflictException(
                    "Room '" + request.getRoomNumber() + "' already exists in building '" + building.getCode() + "'");
        }

        Room room = roomMapper.toEntity(request, building);
        Room saved = roomRepository.save(room);
        log.info("Created room '{}' in building '{}'", saved.getRoomNumber(), building.getCode());
        return roomMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public RoomResponse updateRoom(UUID id, RoomRequest request) {
        Room room = findRoomOrThrow(id);
        Building building = findBuildingOrThrow(request.getBuildingId());

        if (roomRepository.existsByBuildingIdAndRoomNumberIgnoreCaseAndIdNot(
                building.getId(), request.getRoomNumber(), id)) {
            throw new ConflictException(
                    "Room '" + request.getRoomNumber() + "' already exists in building '" + building.getCode() + "'");
        }

        roomMapper.updateEntity(room, request, building);
        Room saved = roomRepository.save(room);
        log.info("Updated room '{}' in building '{}'", saved.getRoomNumber(), building.getCode());
        return roomMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteRoom(UUID id) {
        Room room = findRoomOrThrow(id);
        roomRepository.delete(room);
        log.info("Deleted room '{}' from building '{}'", room.getRoomNumber(), room.getBuilding().getCode());
    }

    private Room findRoomOrThrow(UUID id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
    }

    private Building findBuildingOrThrow(UUID buildingId) {
        return buildingRepository.findById(buildingId)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + buildingId));
    }

}
