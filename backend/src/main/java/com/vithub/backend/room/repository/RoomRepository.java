package com.vithub.backend.room.repository;

import com.vithub.backend.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {

    List<Room> findAllByBuildingIdOrderByRoomNumberAsc(UUID buildingId);

    List<Room> findAllByOrderByRoomNumberAsc();

    boolean existsByBuildingIdAndRoomNumberIgnoreCase(UUID buildingId, String roomNumber);

    boolean existsByBuildingIdAndRoomNumberIgnoreCaseAndIdNot(UUID buildingId, String roomNumber, UUID id);

}
