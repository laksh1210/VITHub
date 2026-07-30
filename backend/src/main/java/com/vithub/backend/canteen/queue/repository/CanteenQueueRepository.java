package com.vithub.backend.canteen.queue.repository;

import com.vithub.backend.canteen.queue.entity.CanteenQueue;
import com.vithub.backend.canteen.queue.entity.CanteenQueueStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CanteenQueueRepository extends JpaRepository<CanteenQueue, UUID> {

    List<CanteenQueue> findAllByOrderByCanteenNameAsc();

    /** Get queue by canteen. */
    Optional<CanteenQueue> findByCanteenId(UUID canteenId);

    boolean existsByCanteenId(UUID canteenId);

    boolean existsByCanteenIdAndIdNot(UUID canteenId, UUID id);

    /** Get current queue size for a canteen, without loading the full entity. */
    @Query("SELECT cq.queueCount FROM CanteenQueue cq WHERE cq.canteen.id = :canteenId")
    Optional<Integer> findCurrentQueueSizeByCanteenId(@Param("canteenId") UUID canteenId);

    /** Update estimated waiting time for a queue record in place. */
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE CanteenQueue cq SET cq.estimatedWaitMinutes = :estimatedWaitMinutes, cq.recordedAt = :recordedAt " +
            "WHERE cq.id = :id")
    int updateEstimatedWaitMinutes(@Param("id") UUID id,
                                    @Param("estimatedWaitMinutes") Integer estimatedWaitMinutes,
                                    @Param("recordedAt") Instant recordedAt);

    /** Update queue count (and its derived crowding status) for a queue record in place. */
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE CanteenQueue cq SET cq.queueCount = :queueCount, cq.status = :status, cq.recordedAt = :recordedAt " +
            "WHERE cq.id = :id")
    int updateQueueCount(@Param("id") UUID id,
                          @Param("queueCount") Integer queueCount,
                          @Param("status") CanteenQueueStatus status,
                          @Param("recordedAt") Instant recordedAt);

}
