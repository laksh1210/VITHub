package com.vithub.backend.library.seat.service.impl;

import com.vithub.backend.common.exception.ConflictException;
import com.vithub.backend.common.exception.ResourceNotFoundException;
import com.vithub.backend.library.entity.Library;
import com.vithub.backend.library.repository.LibraryRepository;
import com.vithub.backend.library.seat.dto.LibrarySeatRequest;
import com.vithub.backend.library.seat.dto.LibrarySeatResponse;
import com.vithub.backend.library.seat.dto.LibrarySeatStatusUpdateRequest;
import com.vithub.backend.library.seat.entity.LibrarySeat;
import com.vithub.backend.library.seat.entity.SeatStatus;
import com.vithub.backend.library.seat.mapper.LibrarySeatMapper;
import com.vithub.backend.library.seat.repository.LibrarySeatRepository;
import com.vithub.backend.library.seat.service.LibrarySeatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link LibrarySeatService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * The parent library is always re-resolved from {@code libraryId} on
 * create/update so a seat can never reference one that doesn't exist.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LibrarySeatServiceImpl implements LibrarySeatService {

    private final LibrarySeatRepository librarySeatRepository;
    private final LibraryRepository libraryRepository;
    private final LibrarySeatMapper librarySeatMapper;

    @Override
    @Transactional(readOnly = true)
    public List<LibrarySeatResponse> getAllSeats(UUID libraryId) {
        List<LibrarySeat> seats = libraryId != null
                ? librarySeatRepository.findAllByLibraryIdOrderBySeatNumberAsc(libraryId)
                : librarySeatRepository.findAllByOrderBySeatNumberAsc();
        return seats.stream()
                .map(librarySeatMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public LibrarySeatResponse getSeatById(UUID id) {
        return librarySeatMapper.toResponse(findSeatOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<LibrarySeatResponse> getAvailableSeats(UUID libraryId) {
        return getSeatsByStatus(libraryId, SeatStatus.AVAILABLE);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LibrarySeatResponse> getOccupiedSeats(UUID libraryId) {
        return getSeatsByStatus(libraryId, SeatStatus.OCCUPIED);
    }

    @Override
    @Transactional
    public LibrarySeatResponse createSeat(LibrarySeatRequest request) {
        Library library = findLibraryOrThrow(request.getLibraryId());

        if (librarySeatRepository.existsByLibraryIdAndSeatNumberIgnoreCase(library.getId(), request.getSeatNumber())) {
            throw new ConflictException(
                    "A seat numbered '" + request.getSeatNumber() + "' already exists in library '" + library.getName() + "'");
        }

        LibrarySeat seat = librarySeatMapper.toEntity(request, library);
        LibrarySeat saved = librarySeatRepository.save(seat);
        log.info("Created seat '{}' in library '{}'", saved.getSeatNumber(), library.getName());
        return librarySeatMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public LibrarySeatResponse updateSeat(UUID id, LibrarySeatRequest request) {
        LibrarySeat seat = findSeatOrThrow(id);
        Library library = findLibraryOrThrow(request.getLibraryId());

        if (librarySeatRepository.existsByLibraryIdAndSeatNumberIgnoreCaseAndIdNot(
                library.getId(), request.getSeatNumber(), id)) {
            throw new ConflictException(
                    "A seat numbered '" + request.getSeatNumber() + "' already exists in library '" + library.getName() + "'");
        }

        librarySeatMapper.updateEntity(seat, request, library);
        LibrarySeat saved = librarySeatRepository.save(seat);
        log.info("Updated seat '{}' in library '{}'", saved.getSeatNumber(), library.getName());
        return librarySeatMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public LibrarySeatResponse updateSeatStatus(UUID id, LibrarySeatStatusUpdateRequest request) {
        LibrarySeat seat = findSeatOrThrow(id);
        seat.setStatus(request.getStatus());
        LibrarySeat saved = librarySeatRepository.save(seat);
        log.info("Updated status of seat '{}' to {}", saved.getSeatNumber(), saved.getStatus());
        return librarySeatMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteSeat(UUID id) {
        LibrarySeat seat = findSeatOrThrow(id);
        librarySeatRepository.delete(seat);
        log.info("Deleted seat '{}' from library '{}'", seat.getSeatNumber(), seat.getLibrary().getName());
    }

    private List<LibrarySeatResponse> getSeatsByStatus(UUID libraryId, SeatStatus status) {
        List<LibrarySeat> seats = libraryId != null
                ? librarySeatRepository.findAllByLibraryIdAndStatusOrderBySeatNumberAsc(libraryId, status)
                : librarySeatRepository.findAllByStatusOrderBySeatNumberAsc(status);
        return seats.stream()
                .map(librarySeatMapper::toResponse)
                .toList();
    }

    private LibrarySeat findSeatOrThrow(UUID id) {
        return librarySeatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Library seat not found with id: " + id));
    }

    private Library findLibraryOrThrow(UUID libraryId) {
        return libraryRepository.findById(libraryId)
                .orElseThrow(() -> new ResourceNotFoundException("Library not found with id: " + libraryId));
    }

}
