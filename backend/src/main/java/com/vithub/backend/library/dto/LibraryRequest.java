package com.vithub.backend.library.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Min;
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
 * Payload for {@code POST /library} and {@code PUT /library/{id}}.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibraryRequest {

    @NotNull(message = "Building id is required")
    private UUID buildingId;

    @NotBlank(message = "Name is required")
    @Size(max = 150, message = "Name must not exceed 150 characters")
    private String name;

    @Min(value = 0, message = "Floor cannot be negative")
    private Integer floor;

    @NotNull(message = "Total seats is required")
    @Min(value = 0, message = "Total seats cannot be negative")
    private Integer totalSeats;

    @NotNull(message = "Occupied seats is required")
    @Min(value = 0, message = "Occupied seats cannot be negative")
    private Integer occupiedSeats;

    @Min(value = 0, message = "Silent room count cannot be negative")
    private Integer silentRoomCount;

    @Min(value = 0, message = "Discussion room count cannot be negative")
    private Integer discussionRoomCount;

    private Boolean active;

    @AssertTrue(message = "Occupied seats cannot exceed total seats")
    private boolean isOccupiedWithinTotal() {
        return totalSeats == null || occupiedSeats == null || occupiedSeats <= totalSeats;
    }

}
