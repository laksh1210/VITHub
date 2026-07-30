package com.vithub.backend.scheduler;

import com.vithub.backend.maintenance.dto.MaintenanceRequestResponse;
import com.vithub.backend.maintenance.dto.MaintenanceRequestStatusUpdateRequest;
import com.vithub.backend.maintenance.entity.MaintenanceRequest;
import com.vithub.backend.maintenance.entity.MaintenanceStatus;
import com.vithub.backend.maintenance.repository.MaintenanceRequestRepository;
import com.vithub.backend.maintenance.service.MaintenanceRequestService;
import com.vithub.backend.websocket.service.NotificationPublisherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Simulates maintenance complaints progressing through their lifecycle
 * every 90 seconds.
 * <p>
 * Each non-terminal request has a chance to advance one step —
 * {@code OPEN -> IN_PROGRESS -> RESOLVED -> CLOSED} — via
 * {@link MaintenanceRequestService#updateMaintenanceRequestStatus}, the
 * same focused operation a staff member's status update would call.
 * {@code CLOSED} requests are left alone. Every advance is broadcast over
 * {@link NotificationPublisherService#publishMaintenanceUpdate}.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class MaintenanceScheduler {

    /** Chance that an eligible request advances a step on any given tick. */
    private static final double ADVANCE_PROBABILITY = 0.35;

    private final MaintenanceRequestRepository maintenanceRequestRepository;
    private final MaintenanceRequestService maintenanceRequestService;
    private final NotificationPublisherService notificationPublisherService;
    private final Random random = new Random();

    @Scheduled(fixedRate = 90_000)
    public void simulateMaintenanceStatus() {
        List<MaintenanceRequest> requests = maintenanceRequestRepository.findAllByOrderByCreatedAtDesc();
        if (requests.isEmpty()) {
            return;
        }

        List<MaintenanceRequestResponse> updated = new ArrayList<>();
        for (MaintenanceRequest request : requests) {
            MaintenanceStatus next = nextStatus(request.getStatus());
            if (next == null || random.nextDouble() > ADVANCE_PROBABILITY) {
                continue;
            }

            MaintenanceRequestResponse response = maintenanceRequestService.updateMaintenanceRequestStatus(
                    request.getId(),
                    MaintenanceRequestStatusUpdateRequest.builder().status(next).build());
            updated.add(response);
        }

        if (!updated.isEmpty()) {
            notificationPublisherService.publishMaintenanceUpdate("UPDATED", updated);
        }
        log.debug("Simulated status progression for {} maintenance request(s)", updated.size());
    }

    private MaintenanceStatus nextStatus(MaintenanceStatus current) {
        return switch (current) {
            case OPEN -> MaintenanceStatus.IN_PROGRESS;
            case IN_PROGRESS -> MaintenanceStatus.RESOLVED;
            case RESOLVED -> MaintenanceStatus.CLOSED;
            case CLOSED -> null;
        };
    }

}
