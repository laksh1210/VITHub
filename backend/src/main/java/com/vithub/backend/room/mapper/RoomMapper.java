package com.vithub.backend.room.mapper;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.room.dto.RoomRequest;
import com.vithub.backend.room.dto.RoomResponse;
import com.vithub.backend.room.entity.Room;
import org.springframework.stereotype.Component;

/**
 * Entity-to-DTO mapping for {@link Room}. Entities must never be returned
 * directly from a controller; this is the single place that decides what
 * of a Room is safe to expose, and how an incoming request is applied to
 * the entity. Resolving {@code buildingId} to a {@link Building} is the
 * service's job — the mapper only wires the already-resolved entity in.
 */
@Component
public class RoomMapper {

    public RoomResponse toResponse(Room room) {
        Building building = room.getBuilding();
        return RoomResponse.builder()
                .id(room.getId())
                .buildingId(building.getId())
                .buildingName(building.getName())
                .buildingCode(building.getCode())
                .roomNumber(room.getRoomNumber())
                .name(room.getName())
                .type(room.getType())
                .floor(room.getFloor())
                .capacity(room.getCapacity())
                .active(room.isActive())
                .createdAt(room.getCreatedAt())
                .updatedAt(room.getUpdatedAt())
                .build();
    }

    public Room toEntity(RoomRequest request, Building building) {
        return Room.builder()
                .building(building)
                .roomNumber(request.getRoomNumber())
                .name(request.getName())
                .type(request.getType())
                .floor(request.getFloor())
                .capacity(request.getCapacity())
                .active(request.getActive() == null || request.getActive())
                .build();
    }

    /**
     * Applies an update request onto an already-persisted entity in place,
     * so JPA's dirty-checking picks up the changes on flush.
     */
    public void updateEntity(Room room, RoomRequest request, Building building) {
        room.setBuilding(building);
        room.setRoomNumber(request.getRoomNumber());
        room.setName(request.getName());
        room.setType(request.getType());
        room.setFloor(request.getFloor());
        room.setCapacity(request.getCapacity());
        if (request.getActive() != null) {
            room.setActive(request.getActive());
        }
    }

}
