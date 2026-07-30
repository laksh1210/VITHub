package com.vithub.backend.library.seat.mapper;

import com.vithub.backend.library.entity.Library;
import com.vithub.backend.library.seat.dto.LibrarySeatRequest;
import com.vithub.backend.library.seat.dto.LibrarySeatResponse;
import com.vithub.backend.library.seat.entity.LibrarySeat;
import com.vithub.backend.library.seat.entity.SeatStatus;
import org.springframework.stereotype.Component;

/**
 * Entity-to-DTO mapping for {@link LibrarySeat}. Entities must never be
 * returned directly from a controller; this is the single place that
 * decides what of a LibrarySeat is safe to expose, and how an incoming
 * request is applied to the entity. Resolving {@code libraryId} to a
 * {@link Library} is the service's job — the mapper only wires the
 * already-resolved entity in.
 */
@Component
public class LibrarySeatMapper {

    public LibrarySeatResponse toResponse(LibrarySeat seat) {
        Library library = seat.getLibrary();
        return LibrarySeatResponse.builder()
                .id(seat.getId())
                .libraryId(library.getId())
                .libraryName(library.getName())
                .buildingId(library.getBuilding().getId())
                .buildingName(library.getBuilding().getName())
                .seatNumber(seat.getSeatNumber())
                .seatType(seat.getSeatType())
                .status(seat.getStatus())
                .createdAt(seat.getCreatedAt())
                .updatedAt(seat.getUpdatedAt())
                .build();
    }

    public LibrarySeat toEntity(LibrarySeatRequest request, Library library) {
        return LibrarySeat.builder()
                .library(library)
                .seatNumber(request.getSeatNumber())
                .seatType(request.getSeatType())
                .status(request.getStatus() == null ? SeatStatus.AVAILABLE : request.getStatus())
                .build();
    }

    /**
     * Applies an update request onto an already-persisted entity in place,
     * so JPA's dirty-checking picks up the changes on flush.
     */
    public void updateEntity(LibrarySeat seat, LibrarySeatRequest request, Library library) {
        seat.setLibrary(library);
        seat.setSeatNumber(request.getSeatNumber());
        seat.setSeatType(request.getSeatType());
        if (request.getStatus() != null) {
            seat.setStatus(request.getStatus());
        }
    }

}
