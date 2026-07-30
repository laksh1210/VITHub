package com.vithub.backend.library.controller;

import com.vithub.backend.common.response.ApiResponse;
import com.vithub.backend.library.dto.LibraryRequest;
import com.vithub.backend.library.dto.LibraryResponse;
import com.vithub.backend.library.service.LibraryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Library endpoints. {@code GET /library} matches the Project Bible's API
 * contract exactly, with an optional {@code buildingId} filter for the
 * campus map and AI assistant ("which library is least crowded?"). Every
 * endpoint is a thin pass-through to {@link LibraryService} — no business
 * logic lives here. Write endpoints are additive (mirrors Building/Room/
 * Occupancy) and restricted to Admins.
 */
@RestController
@RequestMapping("/library")
@RequiredArgsConstructor
@Tag(name = "Library", description = "Library spaces and seat availability")
public class LibraryController {

    private final LibraryService libraryService;

    @GetMapping
    @Operation(summary = "List library spaces", description = "Returns every library space, or only those in a given building when buildingId is provided.")
    public ResponseEntity<ApiResponse<List<LibraryResponse>>> getAllLibraries(
            @Parameter(description = "Optional building id to filter by")
            @RequestParam(required = false) UUID buildingId) {
        List<LibraryResponse> libraries = libraryService.getAllLibraries(buildingId);
        return ResponseEntity.ok(ApiResponse.success(libraries));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a library space by id", description = "Returns a single library space's full details, including seat availability.")
    public ResponseEntity<ApiResponse<LibraryResponse>> getLibraryById(
            @Parameter(description = "Library id") @PathVariable UUID id) {
        LibraryResponse library = libraryService.getLibraryById(id);
        return ResponseEntity.ok(ApiResponse.success(library));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a library space", description = "Admin-only. Creates a new library space within an existing building.")
    public ResponseEntity<ApiResponse<LibraryResponse>> createLibrary(
            @Valid @RequestBody LibraryRequest request) {
        LibraryResponse library = libraryService.createLibrary(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Library created successfully", library));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a library space", description = "Admin-only. Updates an existing library space, including its seat counts.")
    public ResponseEntity<ApiResponse<LibraryResponse>> updateLibrary(
            @Parameter(description = "Library id") @PathVariable UUID id,
            @Valid @RequestBody LibraryRequest request) {
        LibraryResponse library = libraryService.updateLibrary(id, request);
        return ResponseEntity.ok(ApiResponse.success("Library updated successfully", library));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a library space", description = "Admin-only. Removes a library space.")
    public ResponseEntity<ApiResponse<Void>> deleteLibrary(
            @Parameter(description = "Library id") @PathVariable UUID id) {
        libraryService.deleteLibrary(id);
        return ResponseEntity.ok(ApiResponse.success("Library deleted successfully", null));
    }

}
