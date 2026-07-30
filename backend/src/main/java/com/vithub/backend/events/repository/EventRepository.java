package com.vithub.backend.events.repository;

import com.vithub.backend.events.entity.Event;
import com.vithub.backend.events.entity.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {

    /** Get all events, ordered by start date/time. */
    List<Event> findAllByOrderByStartDateTimeAsc();

    /** Find upcoming events — also used to find events by status by passing {@link EventStatus#UPCOMING}. */
    List<Event> findAllByStatusOrderByStartDateTimeAsc(EventStatus status);

    /** Find events by category. */
    List<Event> findAllByCategoryIgnoreCaseOrderByStartDateTimeAsc(String category);

    /** Find events by building. */
    List<Event> findAllByBuildingIdOrderByStartDateTimeAsc(UUID buildingId);

    /** Find events by room. */
    List<Event> findAllByRoomIdOrderByStartDateTimeAsc(UUID roomId);

    /** Find events whose start date/time falls within the given range (inclusive). */
    List<Event> findAllByStartDateTimeBetweenOrderByStartDateTimeAsc(Instant startInclusive, Instant endInclusive);

}
