package com.vithub.backend.scheduler;

import com.vithub.backend.library.entity.Library;
import com.vithub.backend.library.repository.LibraryRepository;
import com.vithub.backend.library.seat.dto.LibrarySeatResponse;
import com.vithub.backend.library.seat.entity.LibrarySeat;
import com.vithub.backend.library.seat.entity.SeatStatus;
import com.vithub.backend.library.seat.mapper.LibrarySeatMapper;
import com.vithub.backend.library.seat.repository.LibrarySeatRepository;
import com.vithub.backend.websocket.service.NotificationPublisherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

/**
 * Simulates library seat availability every 45 seconds.
 * <p>
 * Each tick flips roughly a fifth of a library's AVAILABLE/OCCUPIED seats
 * to the other state (RESERVED and OUT_OF_SERVICE seats are left alone —
 * those are deliberate states, not something a headcount feed would
 * touch), then recomputes the parent {@link Library#getOccupiedSeats()}
 * aggregate from the resulting seats so the two stay consistent. Every
 * update is broadcast over {@link NotificationPublisherService#publishLibraryUpdate}.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class LibraryScheduler {

    /** Roughly this fraction of a library's seats change state per tick. */
    private static final double TOGGLE_FRACTION = 0.2;

    private final LibraryRepository libraryRepository;
    private final LibrarySeatRepository librarySeatRepository;
    private final LibrarySeatMapper librarySeatMapper;
    private final NotificationPublisherService notificationPublisherService;
    private final Random random = new Random();

    @Scheduled(fixedRate = 45_000)
    @Transactional
    public void simulateLibrarySeats() {
        List<Library> libraries = libraryRepository.findAllByOrderByNameAsc();
        if (libraries.isEmpty()) {
            return;
        }

        List<LibrarySeatResponse> updatedSeats = new ArrayList<>();

        for (Library library : libraries) {
            List<LibrarySeat> seats = librarySeatRepository.findAllByLibraryIdOrderBySeatNumberAsc(library.getId());
            if (seats.isEmpty()) {
                continue;
            }

            List<LibrarySeat> shuffled = new ArrayList<>(seats);
            Collections.shuffle(shuffled, random);
            int toggles = Math.max(1, (int) Math.round(seats.size() * TOGGLE_FRACTION));

            int flipped = 0;
            for (LibrarySeat seat : shuffled) {
                if (flipped >= toggles) {
                    break;
                }
                if (seat.getStatus() == SeatStatus.AVAILABLE) {
                    seat.setStatus(SeatStatus.OCCUPIED);
                    flipped++;
                } else if (seat.getStatus() == SeatStatus.OCCUPIED) {
                    seat.setStatus(SeatStatus.AVAILABLE);
                    flipped++;
                }
                // RESERVED / OUT_OF_SERVICE seats are intentionally left untouched.
            }

            librarySeatRepository.saveAll(seats);

            long occupiedCount = seats.stream().filter(s -> s.getStatus() == SeatStatus.OCCUPIED).count();
            library.setOccupiedSeats((int) occupiedCount);
            libraryRepository.save(library);

            seats.forEach(seat -> updatedSeats.add(librarySeatMapper.toResponse(seat)));
        }

        if (!updatedSeats.isEmpty()) {
            notificationPublisherService.publishLibraryUpdate("UPDATED", updatedSeats);
        }
        log.debug("Simulated seat availability across {} library(ies)", libraries.size());
    }

}
