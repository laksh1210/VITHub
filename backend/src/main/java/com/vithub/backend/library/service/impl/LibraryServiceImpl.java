package com.vithub.backend.library.service.impl;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.building.repository.BuildingRepository;
import com.vithub.backend.common.exception.ConflictException;
import com.vithub.backend.common.exception.ResourceNotFoundException;
import com.vithub.backend.library.dto.LibraryRequest;
import com.vithub.backend.library.dto.LibraryResponse;
import com.vithub.backend.library.entity.Library;
import com.vithub.backend.library.mapper.LibraryMapper;
import com.vithub.backend.library.repository.LibraryRepository;
import com.vithub.backend.library.service.LibraryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link LibraryService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * The parent building is always re-resolved from {@code buildingId} on
 * create/update so a library space can never reference one that doesn't
 * exist.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LibraryServiceImpl implements LibraryService {

    private final LibraryRepository libraryRepository;
    private final BuildingRepository buildingRepository;
    private final LibraryMapper libraryMapper;

    @Override
    @Transactional(readOnly = true)
    public List<LibraryResponse> getAllLibraries(UUID buildingId) {
        List<Library> libraries = buildingId != null
                ? libraryRepository.findAllByBuildingIdOrderByNameAsc(buildingId)
                : libraryRepository.findAllByOrderByNameAsc();
        return libraries.stream()
                .map(libraryMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public LibraryResponse getLibraryById(UUID id) {
        return libraryMapper.toResponse(findLibraryOrThrow(id));
    }

    @Override
    @Transactional
    public LibraryResponse createLibrary(LibraryRequest request) {
        Building building = findBuildingOrThrow(request.getBuildingId());

        if (libraryRepository.existsByBuildingIdAndNameIgnoreCase(building.getId(), request.getName())) {
            throw new ConflictException(
                    "A library named '" + request.getName() + "' already exists in building '" + building.getCode() + "'");
        }

        Library library = libraryMapper.toEntity(request, building);
        Library saved = libraryRepository.save(library);
        log.info("Created library '{}' in building '{}'", saved.getName(), building.getCode());
        return libraryMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public LibraryResponse updateLibrary(UUID id, LibraryRequest request) {
        Library library = findLibraryOrThrow(id);
        Building building = findBuildingOrThrow(request.getBuildingId());

        if (libraryRepository.existsByBuildingIdAndNameIgnoreCaseAndIdNot(
                building.getId(), request.getName(), id)) {
            throw new ConflictException(
                    "A library named '" + request.getName() + "' already exists in building '" + building.getCode() + "'");
        }

        libraryMapper.updateEntity(library, request, building);
        Library saved = libraryRepository.save(library);
        log.info("Updated library '{}' in building '{}'", saved.getName(), building.getCode());
        return libraryMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteLibrary(UUID id) {
        Library library = findLibraryOrThrow(id);
        libraryRepository.delete(library);
        log.info("Deleted library '{}' from building '{}'", library.getName(), library.getBuilding().getCode());
    }

    private Library findLibraryOrThrow(UUID id) {
        return libraryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Library not found with id: " + id));
    }

    private Building findBuildingOrThrow(UUID buildingId) {
        return buildingRepository.findById(buildingId)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + buildingId));
    }

}
