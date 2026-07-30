package com.vithub.backend.library.seat.service;

import com.vithub.backend.library.seat.dto.LibrarySeatRequest;
import com.vithub.backend.library.seat.dto.LibrarySeatResponse;
import com.vithub.backend.library.seat.dto.LibrarySeatStatusUpdateRequest;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Library Seats module. Implemented by
 * {@link com.vithub.backend.library.seat.service.impl.LibrarySeatServiceImpl}.
 */
public interface LibrarySeatService {

    List<LibrarySeatResponse> getAllSeats(UUID libraryId);

    LibrarySeatResponse getSeatById(UUID id);

    List<LibrarySeatResponse> getAvailableSeats(UUID libraryId);

    List<LibrarySeatResponse> getOccupiedSeats(UUID libraryId);

    LibrarySeatResponse createSeat(LibrarySeatRequest request);

    LibrarySeatResponse updateSeat(UUID id, LibrarySeatRequest request);

    LibrarySeatResponse updateSeatStatus(UUID id, LibrarySeatStatusUpdateRequest request);

    void deleteSeat(UUID id);

}
