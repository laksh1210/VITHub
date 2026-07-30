package com.vithub.backend.room.service;

import com.vithub.backend.room.dto.RoomRequest;
import com.vithub.backend.room.dto.RoomResponse;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Room module. Implemented by
 * {@link com.vithub.backend.room.service.impl.RoomServiceImpl}.
 */
public interface RoomService {

    List<RoomResponse> getAllRooms(UUID buildingId);

    RoomResponse getRoomById(UUID id);

    RoomResponse createRoom(RoomRequest request);

    RoomResponse updateRoom(UUID id, RoomRequest request);

    void deleteRoom(UUID id);

}
