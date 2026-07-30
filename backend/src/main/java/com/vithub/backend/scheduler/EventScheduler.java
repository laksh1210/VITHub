package com.vithub.backend.scheduler;

import com.vithub.backend.events.dto.EventResponse;
import com.vithub.backend.events.dto.EventStatusUpdateRequest;
import com.vithub.backend.events.entity.Event;
import com.vithub.backend.events.entity.EventStatus;
import com.vithub.backend.events.repository.EventRepository;
import com.vithub.backend.events.service.EventService;
import com.vithub.backend.websocket.service.NotificationPublisherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/**
 * Automatically transitions campus event status based on wall-clock time,
 * every 5 minutes.
 * <p>
 * An event's status is purely a function of {@code now} relative to its
 * {@code startDateTime}/{@code endDateTime}: {@code UPCOMING} before it
 * starts, {@code ONGOING} while it's running, {@code COMPLETED} once it
 * ends. {@link EventStatus#CANCELLED} is a deliberate, staff-driven state
 * and is never touched here. Only events whose derived status actually
 * differs from their stored one are written, via
 * {@link EventService#updateEventStatus}, and broadcast over
 * {@link NotificationPublisherService#publishEventUpdate}.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class EventScheduler {

    private final EventRepository eventRepository;
    private final EventService eventService;
    private final NotificationPublisherService notificationPublisherService;

    @Scheduled(fixedRate = 300_000)
    public void simulateEventStatusTransitions() {
        List<Event> events = eventRepository.findAllByOrderByStartDateTimeAsc();
        if (events.isEmpty()) {
            return;
        }

        Instant now = Instant.now();
        List<EventResponse> updated = new ArrayList<>();

        for (Event event : events) {
            if (event.getStatus() == EventStatus.CANCELLED) {
                continue;
            }

            EventStatus resolved = resolveStatus(event, now);
            if (resolved != event.getStatus()) {
                EventResponse response = eventService.updateEventStatus(
                        event.getId(),
                        EventStatusUpdateRequest.builder().status(resolved).build());
                updated.add(response);
            }
        }

        if (!updated.isEmpty()) {
            notificationPublisherService.publishEventUpdate("UPDATED", updated);
        }
        log.debug("Simulated status transitions for {} event(s)", updated.size());
    }

    private EventStatus resolveStatus(Event event, Instant now) {
        if (now.isBefore(event.getStartDateTime())) {
            return EventStatus.UPCOMING;
        }
        if (!now.isAfter(event.getEndDateTime())) {
            return EventStatus.ONGOING;
        }
        return EventStatus.COMPLETED;
    }

}
