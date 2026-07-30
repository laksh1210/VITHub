package com.vithub.backend.events.mapper;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.entity.User;
import com.vithub.backend.events.dto.EventCreateRequest;
import com.vithub.backend.events.dto.EventResponse;
import com.vithub.backend.events.dto.EventUpdateRequest;
import com.vithub.backend.events.entity.Event;
import com.vithub.backend.events.entity.EventStatus;
import com.vithub.backend.room.entity.Room;
import org.springframework.stereotype.Component;

/**
 * Entity-to-DTO mapping for {@link Event}. Entities must never be
 * returned directly from a controller; this is the single place that
 * decides what of an Event is safe to expose, and how an incoming
 * request is applied to the entity. Resolving the creator, building and
 * room entities from their ids is the caller's (service layer's)
 * responsibility — this mapper only assembles or flattens what it is
 * given.
 */
@Component
public class EventMapper {

    public EventResponse toResponse(Event event) {
        Building building = event.getBuilding();
        Room room = event.getRoom();
        User createdBy = event.getCreatedBy();

        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .category(event.getCategory())
                .eventType(event.getEventType())
                .organizer(event.getOrganizer())
                .startDateTime(event.getStartDateTime())
                .endDateTime(event.getEndDateTime())
                .venue(event.getVenue())
                .buildingId(building != null ? building.getId() : null)
                .buildingName(building != null ? building.getName() : null)
                .roomId(room != null ? room.getId() : null)
                .roomNumber(room != null ? room.getRoomNumber() : null)
                .capacity(event.getCapacity())
                .registrationRequired(event.isRegistrationRequired())
                .status(event.getStatus())
                .createdById(createdBy != null ? createdBy.getId() : null)
                .createdByUsername(createdBy != null ? createdBy.getUsername() : null)
                .createdByFullName(createdBy != null ? createdBy.getFullName() : null)
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .build();
    }

    /**
     * Builds a new entity from a create request. Defaults status to
     * {@link EventStatus#UPCOMING} — every new event listing starts out
     * upcoming.
     */
    public Event toEntity(EventCreateRequest request, User createdBy, Building building, Room room) {
        return Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .eventType(request.getEventType())
                .organizer(request.getOrganizer())
                .startDateTime(request.getStartDateTime())
                .endDateTime(request.getEndDateTime())
                .venue(request.getVenue())
                .building(building)
                .room(room)
                .capacity(request.getCapacity())
                .registrationRequired(Boolean.TRUE.equals(request.getRegistrationRequired()))
                .status(EventStatus.UPCOMING)
                .createdBy(createdBy)
                .build();
    }

    /**
     * Applies an update request onto an already-persisted entity in
     * place, so JPA's dirty-checking picks up the changes on flush.
     * Status and creator are untouched — they are updated through their
     * own dedicated operations.
     */
    public void updateEntity(Event event, EventUpdateRequest request, Building building, Room room) {
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setCategory(request.getCategory());
        event.setEventType(request.getEventType());
        event.setOrganizer(request.getOrganizer());
        event.setStartDateTime(request.getStartDateTime());
        event.setEndDateTime(request.getEndDateTime());
        event.setVenue(request.getVenue());
        event.setBuilding(building);
        event.setRoom(room);
        event.setCapacity(request.getCapacity());
        event.setRegistrationRequired(Boolean.TRUE.equals(request.getRegistrationRequired()));
    }

}
