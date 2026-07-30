package com.vithub.backend.scheduler;

import com.vithub.backend.occupancy.dto.OccupancyResponse;
import com.vithub.backend.occupancy.entity.Occupancy;
import com.vithub.backend.occupancy.entity.OccupancyStatus;
import com.vithub.backend.occupancy.mapper.OccupancyMapper;
import com.vithub.backend.occupancy.repository.OccupancyRepository;
import com.vithub.backend.websocket.service.NotificationPublisherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Random;

/**
 * Simulates live classroom occupancy readings every 30 seconds.
 * <p>
 * Each room's current headcount is randomized every tick — with a bias
 * toward some rooms simply being reported free — and the
 * {@link OccupancyStatus} heatmap tier is re-derived from the new count
 * exactly as {@link com.vithub.backend.occupancy.service.impl.OccupancyServiceImpl}
 * does for a manually-reported reading, so mock and real data stay on the
 * same rules. Every update is broadcast over
 * {@link NotificationPublisherService#publishOccupancyUpdate}.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class OccupancyScheduler {

    /** Chance that a room is simulated as fully free this tick, mirroring "mark rooms occupied/free". */
    private static final double FREE_PROBABILITY = 0.3;

    /** Occupancy percentage below which a room is considered AVAILABLE. */
    private static final double AVAILABLE_THRESHOLD = 40.0;
    /** Occupancy percentage below which a room is considered MODERATE (otherwise CROWDED). */
    private static final double MODERATE_THRESHOLD = 75.0;
    /** Occupancy percentage at or above which a room is considered FULL. */
    private static final double FULL_THRESHOLD = 100.0;

    private final OccupancyRepository occupancyRepository;
    private final OccupancyMapper occupancyMapper;
    private final NotificationPublisherService notificationPublisherService;
    private final Random random = new Random();

    @Scheduled(fixedRate = 30_000)
    @Transactional
    public void simulateOccupancy() {
        List<Occupancy> readings = occupancyRepository.findAllByOrderByRoomRoomNumberAsc();
        if (readings.isEmpty()) {
            return;
        }

        Instant now = Instant.now();
        for (Occupancy occupancy : readings) {
            int capacity = occupancy.getRoom().getCapacity();
            if (capacity <= 0) {
                continue;
            }

            boolean markFree = random.nextDouble() < FREE_PROBABILITY;
            int newCount = markFree ? 0 : 1 + random.nextInt(capacity);

            occupancy.setCurrentCount(newCount);
            occupancy.setStatus(resolveStatus(newCount, capacity));
            occupancy.setRecordedAt(now);
        }

        occupancyRepository.saveAll(readings);

        List<OccupancyResponse> responses = readings.stream()
                .map(occupancyMapper::toResponse)
                .toList();
        notificationPublisherService.publishOccupancyUpdate("UPDATED", responses);
        log.debug("Simulated occupancy for {} room(s)", readings.size());
    }

    private OccupancyStatus resolveStatus(int currentCount, int capacity) {
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
