package com.vithub.backend.events.service.impl;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.building.repository.BuildingRepository;
import com.vithub.backend.common.exception.BadRequestException;
import com.vithub.backend.common.exception.ResourceNotFoundException;
import com.vithub.backend.entity.User;
import com.vithub.backend.events.dto.EventCreateRequest;
import com.vithub.backend.events.dto.EventResponse;
import com.vithub.backend.events.dto.EventStatusUpdateRequest;
import com.vithub.backend.events.dto.EventUpdateRequest;
import com.vithub.backend.events.entity.Event;
import com.vithub.backend.events.entity.EventStatus;
import com.vithub.backend.events.mapper.EventMapper;
import com.vithub.backend.events.repository.EventRepository;
import com.vithub.backend.events.service.EventService;
import com.vithub.backend.repository.UserRepository;
import com.vithub.backend.room.entity.Room;
import com.vithub.backend.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link EventService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * The optional building/room and the creating user are always resolved
 * from their ids (never trusted blindly) before being handed to the
 * mapper, mirroring how {@code MaintenanceRequestServiceImpl} resolves
 * its optional references.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final UserRepository userRepository;
    private final BuildingRepository buildingRepository;
    private final RoomRepository roomRepository;

    @Override
    @Transactional(readOnly = true)
    public List<EventResponse> getAllEvents() {
        return eventRepository.findAllByOrderByStartDateTimeAsc().stream()
                .map(eventMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public EventResponse getEventById(UUID id) {
        return eventMapper.toResponse(findEventOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventResponse> getUpcomingEvents() {
        return getEventsByStatus(EventStatus.UPCOMING);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventResponse> getEventsByStatus(EventStatus status) {
        return eventRepository.findAllByStatusOrderByStartDateTimeAsc(status).stream()
                .map(eventMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventResponse> getEventsByCategory(String category) {
        return eventRepository.findAllByCategoryIgnoreCaseOrderByStartDateTimeAsc(category).stream()
                .map(eventMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventResponse> getEventsByBuilding(UUID buildingId) {
        return eventRepository.findAllByBuildingIdOrderByStartDateTimeAsc(buildingId).stream()
                .map(eventMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventResponse> getEventsByRoom(UUID roomId) {
        return eventRepository.findAllByRoomIdOrderByStartDateTimeAsc(roomId).stream()
                .map(eventMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventResponse> getEventsByDateRange(Instant start, Instant end) {
        if (start == null || end == null) {
            throw new BadRequestException("Both start and end date/time are required");
        }
        if (end.isBefore(start)) {
            throw new BadRequestException("End date/time must not be before start date/time");
        }
        return eventRepository.findAllByStartDateTimeBetweenOrderByStartDateTimeAsc(start, end).stream()
                .map(eventMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public EventResponse createEvent(UUID createdById, EventCreateRequest request) {
        validateSchedule(request.getStartDateTime(), request.getEndDateTime());

        User createdBy = findUserOrThrow(createdById);
        Building building = resolveBuilding(request.getBuildingId());
        Room room = resolveRoom(request.getRoomId());

        Event event = eventMapper.toEntity(request, createdBy, building, room);
        Event saved = eventRepository.save(event);
        log.info("Created event '{}' by '{}'", saved.getTitle(), createdBy.getUsername());
        return eventMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public EventResponse updateEvent(UUID id, EventUpdateRequest request) {
        validateSchedule(request.getStartDateTime(), request.getEndDateTime());

        Event event = findEventOrThrow(id);
        Building building = resolveBuilding(request.getBuildingId());
        Room room = resolveRoom(request.getRoomId());

        eventMapper.updateEntity(event, request, building, room);
        Event saved = eventRepository.save(event);
        log.info("Updated event '{}' ({})", saved.getTitle(), saved.getId());
        return eventMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public EventResponse updateEventStatus(UUID id, EventStatusUpdateRequest request) {
        Event event = findEventOrThrow(id);
        event.setStatus(request.getStatus());
        Event saved = eventRepository.save(event);
        log.info("Updated event '{}' status to {}", saved.getId(), saved.getStatus());
        return eventMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteEvent(UUID id) {
        Event event = findEventOrThrow(id);
        eventRepository.delete(event);
        log.info("Deleted event '{}' ({})", event.getTitle(), event.getId());
    }

    private void validateSchedule(Instant startDateTime, Instant endDateTime) {
        if (startDateTime != null && endDateTime != null && !endDateTime.isAfter(startDateTime)) {
            throw new BadRequestException("End date/time must be after start date/time");
        }
    }

    private Event findEventOrThrow(UUID id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
    }

    private User findUserOrThrow(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    private Building resolveBuilding(UUID buildingId) {
        if (buildingId == null) {
            return null;
        }
        return buildingRepository.findById(buildingId)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + buildingId));
    }

    private Room resolveRoom(UUID roomId) {
        if (roomId == null) {
            return null;
        }
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + roomId));
    }

}
