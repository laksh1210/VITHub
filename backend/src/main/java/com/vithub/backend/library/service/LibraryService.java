package com.vithub.backend.library.service;

import com.vithub.backend.library.dto.LibraryRequest;
import com.vithub.backend.library.dto.LibraryResponse;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Library module. Implemented by
 * {@link com.vithub.backend.library.service.impl.LibraryServiceImpl}.
 */
public interface LibraryService {

    List<LibraryResponse> getAllLibraries(UUID buildingId);

    LibraryResponse getLibraryById(UUID id);

    LibraryResponse createLibrary(LibraryRequest request);

    LibraryResponse updateLibrary(UUID id, LibraryRequest request);

    void deleteLibrary(UUID id);

}
