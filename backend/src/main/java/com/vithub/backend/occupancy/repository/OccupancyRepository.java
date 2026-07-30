package com.vithub.backend.occupancy.repository;

import com.vithub.backend.occupancy.entity.Occupancy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OccupancyRepository extends JpaRepository<Occupancy, UUID> {

    Optional<Occupancy> findByRoomId(UUID roomId);

    boolean existsByRoomId(UUID roomId);

    boolean existsByRoomIdAndIdNot(UUID roomId, UUID id);

    List<Occupancy> findAllByRoomBuildingIdOrderByRoomRoomNumberAsc(UUID buildingId);

    List<Occupancy> findAllByOrderByRoomRoomNumberAsc();

}
