package com.vithub.backend.library.mapper;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.library.dto.LibraryRequest;
import com.vithub.backend.library.dto.LibraryResponse;
import com.vithub.backend.library.entity.Library;
import org.springframework.stereotype.Component;

/**
 * Entity-to-DTO mapping for {@link Library}. Entities must never be
 * returned directly from a controller; this is the single place that
 * decides what of a Library space is safe to expose, and how an incoming
 * request is applied to the entity. Resolving {@code buildingId} to a
 * {@link Building} is the service's job — the mapper only wires the
 * already-resolved entity in.
 */
@Component
public class LibraryMapper {

    public LibraryResponse toResponse(Library library) {
        Building building = library.getBuilding();
        int totalSeats = library.getTotalSeats();
        int occupiedSeats = library.getOccupiedSeats();
        int availableSeats = Math.max(totalSeats - occupiedSeats, 0);
        double occupancyPercentage = totalSeats > 0
                ? Math.round((occupiedSeats * 10000.0) / totalSeats) / 100.0
                : 0.0;

        return LibraryResponse.builder()
                .id(library.getId())
                .buildingId(building.getId())
                .buildingName(building.getName())
                .buildingCode(building.getCode())
                .name(library.getName())
                .floor(library.getFloor())
                .totalSeats(totalSeats)
                .occupiedSeats(occupiedSeats)
                .availableSeats(availableSeats)
                .occupancyPercentage(occupancyPercentage)
                .silentRoomCount(library.getSilentRoomCount())
                .discussionRoomCount(library.getDiscussionRoomCount())
                .active(library.isActive())
                .createdAt(library.getCreatedAt())
                .updatedAt(library.getUpdatedAt())
                .build();
    }

    public Library toEntity(LibraryRequest request, Building building) {
        return Library.builder()
                .building(building)
                .name(request.getName())
                .floor(request.getFloor())
                .totalSeats(request.getTotalSeats())
                .occupiedSeats(request.getOccupiedSeats())
                .silentRoomCount(request.getSilentRoomCount() == null ? 0 : request.getSilentRoomCount())
                .discussionRoomCount(request.getDiscussionRoomCount() == null ? 0 : request.getDiscussionRoomCount())
                .active(request.getActive() == null || request.getActive())
                .build();
    }

    /**
     * Applies an update request onto an already-persisted entity in place,
     * so JPA's dirty-checking picks up the changes on flush.
     */
    public void updateEntity(Library library, LibraryRequest request, Building building) {
        library.setBuilding(building);
        library.setName(request.getName());
        library.setFloor(request.getFloor());
        library.setTotalSeats(request.getTotalSeats());
        library.setOccupiedSeats(request.getOccupiedSeats());
        library.setSilentRoomCount(request.getSilentRoomCount() == null ? 0 : request.getSilentRoomCount());
        library.setDiscussionRoomCount(request.getDiscussionRoomCount() == null ? 0 : request.getDiscussionRoomCount());
        if (request.getActive() != null) {
            library.setActive(request.getActive());
        }
    }

}
