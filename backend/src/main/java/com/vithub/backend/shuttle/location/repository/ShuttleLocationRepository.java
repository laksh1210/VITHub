package com.vithub.backend.shuttle.location.repository;

import com.vithub.backend.shuttle.location.entity.ShuttleLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ShuttleLocationRepository extends JpaRepository<ShuttleLocation, UUID> {

    /** Find latest location by shuttle. */
    Optional<ShuttleLocation> findTopByShuttleIdOrderByLastUpdatedAtDesc(UUID shuttleId);

    /** Find location history by shuttle, most recent first. */
    List<ShuttleLocation> findAllByShuttleIdOrderByLastUpdatedAtDesc(UUID shuttleId);

    /**
     * Find all current shuttle locations — the single most recent ping
     * for every shuttle that has reported one. A shuttle with no location
     * rows simply won't appear.
     */
    @Query("SELECT sl FROM ShuttleLocation sl " +
            "WHERE sl.lastUpdatedAt = (" +
            "   SELECT MAX(sl2.lastUpdatedAt) FROM ShuttleLocation sl2 WHERE sl2.shuttle.id = sl.shuttle.id" +
            ") " +
            "ORDER BY sl.shuttle.shuttleNumber ASC")
    List<ShuttleLocation> findAllCurrentLocations();

}
