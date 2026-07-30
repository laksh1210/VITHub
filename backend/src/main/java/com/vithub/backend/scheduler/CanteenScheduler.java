package com.vithub.backend.scheduler;

import com.vithub.backend.canteen.queue.dto.CanteenQueueCountUpdateRequest;
import com.vithub.backend.canteen.queue.dto.CanteenQueueResponse;
import com.vithub.backend.canteen.queue.dto.CanteenQueueWaitTimeUpdateRequest;
import com.vithub.backend.canteen.queue.entity.CanteenQueue;
import com.vithub.backend.canteen.queue.repository.CanteenQueueRepository;
import com.vithub.backend.canteen.queue.service.CanteenQueueService;
import com.vithub.backend.websocket.service.NotificationPublisherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Simulates canteen queue length and estimated wait time every 60 seconds.
 * <p>
 * Goes through {@link CanteenQueueService#updateQueueCount} and
 * {@link CanteenQueueService#updateEstimatedWaitTime} — the same
 * focused, high-frequency operations a real headcount feed would call —
 * rather than touching the repository directly, so the crowding-tier
 * derivation in {@code CanteenQueueServiceImpl} stays the single source
 * of truth. Every update is broadcast over
 * {@link NotificationPublisherService#publishCanteenUpdate}.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class CanteenScheduler {

    /** Upper bound (exclusive) on the simulated queue headcount. */
    private static final int MAX_QUEUE_COUNT = 40;
    /** Minimum simulated service time per person waiting, in minutes. */
    private static final int MIN_MINUTES_PER_PERSON = 2;
    /** Additional random spread on service time per person, in minutes. */
    private static final int MINUTES_PER_PERSON_SPREAD = 3;

    private final CanteenQueueRepository canteenQueueRepository;
    private final CanteenQueueService canteenQueueService;
    private final NotificationPublisherService notificationPublisherService;
    private final Random random = new Random();

    @Scheduled(fixedRate = 60_000)
    public void simulateCanteenQueues() {
        List<CanteenQueue> queues = canteenQueueRepository.findAllByOrderByCanteenNameAsc();
        if (queues.isEmpty()) {
            return;
        }

        List<CanteenQueueResponse> updated = new ArrayList<>();
        for (CanteenQueue queue : queues) {
            int newQueueCount = random.nextInt(MAX_QUEUE_COUNT + 1);
            int minutesPerPerson = MIN_MINUTES_PER_PERSON + random.nextInt(MINUTES_PER_PERSON_SPREAD);
            int estimatedWaitMinutes = Math.max(0, newQueueCount * minutesPerPerson);

            canteenQueueService.updateQueueCount(queue.getId(),
                    CanteenQueueCountUpdateRequest.builder()
                            .queueCount(newQueueCount)
                            .build());
            CanteenQueueResponse response = canteenQueueService.updateEstimatedWaitTime(queue.getId(),
                    CanteenQueueWaitTimeUpdateRequest.builder()
                            .estimatedWaitMinutes(estimatedWaitMinutes)
                            .build());
            updated.add(response);
        }

        notificationPublisherService.publishCanteenUpdate("UPDATED", updated);
        log.debug("Simulated queue readings for {} canteen(s)", queues.size());
    }

}
