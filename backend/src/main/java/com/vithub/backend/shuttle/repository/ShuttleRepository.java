package com.vithub.backend.shuttle.repository;

import com.vithub.backend.shuttle.entity.Shuttle;
import com.vithub.backend.shuttle.entity.ShuttleStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ShuttleRepository extends JpaRepository<Shuttle, UUID> {

    /** Get all shuttles. */
    List<Shuttle> findAllByOrderByShuttleNumberAsc();

    /** Get shuttle by ID is provided by JpaRepository#findById(UUID). */

    /**
     * Get shuttles by status — also used to get active shuttles by
     * passing {@link ShuttleStatus#ACTIVE}.
     */
    List<Shuttle> findAllByStatusOrderByShuttleNumberAsc(ShuttleStatus status);

    Optional<Shuttle> findByShuttleNumberIgnoreCase(String shuttleNumber);

    boolean existsByShuttleNumberIgnoreCase(String shuttleNumber);

    boolean existsByShuttleNumberIgnoreCaseAndIdNot(String shuttleNumber, UUID id);

}
