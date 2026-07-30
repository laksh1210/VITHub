package com.vithub.backend.maintenance.dto;

import com.vithub.backend.maintenance.entity.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * Payload for {@code PUT /maintenance/{id}}.
 * Updates the descriptive fields of a complaint (title, description,
 * category, priority, and the building/room it concerns). Status and
 * staff assignment are deliberately excluded — they are updated through
 * their own dedicated endpoints.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceRequestUpdateRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category must not exceed 50 characters")
    private String category;

    @NotNull(message = "Priority is required")
    private Priority priority;

    /** Optional — the building this complaint concerns. */
    private UUID buildingId;

    /** Optional — the room this complaint concerns. */
    private UUID roomId;

}
