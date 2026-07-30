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
 * Payload for {@code POST /maintenance}.
 * The reporter is never taken from this payload — it is always resolved
 * from the authenticated principal, so a user can never file a complaint
 * on someone else's behalf.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceRequestCreateRequest {

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
