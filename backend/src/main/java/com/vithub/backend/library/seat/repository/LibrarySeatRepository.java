package com.vithub.backend.library.seat.repository;

import com.vithub.backend.library.seat.entity.LibrarySeat;
import com.vithub.backend.library.seat.entity.SeatStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LibrarySeatRepository extends JpaRepository<LibrarySeat, UUID> {

    /** All seats belonging to a given library. */
    List<LibrarySeat> findAllByLibraryIdOrderBySeatNumberAsc(UUID libraryId);

    /** All seats across every library. */
    List<LibrarySeat> findAllByOrderBySeatNumberAsc();

    /** Seats in a given library filtered by status (used for available/occupied lookups). */
    List<LibrarySeat> findAllByLibraryIdAndStatusOrderBySeatNumberAsc(UUID libraryId, SeatStatus status);

    /** Seats across every library filtered by status. */
    List<LibrarySeat> findAllByStatusOrderBySeatNumberAsc(SeatStatus status);

    boolean existsByLibraryIdAndSeatNumberIgnoreCase(UUID libraryId, String seatNumber);

    boolean existsByLibraryIdAndSeatNumberIgnoreCaseAndIdNot(UUID libraryId, String seatNumber, UUID id);

}
