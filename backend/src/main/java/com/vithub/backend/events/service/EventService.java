package com.vithub.backend.events.service;

import com.vithub.backend.events.dto.EventCreateRequest;
import com.vithub.backend.events.dto.EventResponse;
import com.vithub.backend.events.dto.EventStatusUpdateRequest;
import com.vithub.backend.events.dto.EventUpdateRequest;
import com.vithub.backend.events.entity.EventStatus;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Event module. Implemented by
 * {@link com.vithub.backend.events.service.impl.EventServiceImpl}.
 */
public interface EventService {

    List<EventResponse> getAllEvents();

    EventResponse getEventById(UUID id);

    List<EventResponse> getUpcomingEvents();

    List<EventResponse> getEventsByStatus(EventStatus status);

    List<EventResponse> getEventsByCategory(String category);

    List<EventResponse> getEventsByBuilding(UUID buildingId);

    List<EventResponse> getEventsByRoom(UUID roomId);

    List<EventResponse> getEventsByDateRange(Instant start, Instant end);

    EventResponse createEvent(UUID createdById, EventCreateRequest request);

    EventResponse updateEvent(UUID id, EventUpdateRequest request);

    EventResponse updateEventStatus(UUID id, EventStatusUpdateRequest request);

    void deleteEvent(UUID id);

}
