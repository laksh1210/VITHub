package com.vithub.backend.canteen.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.UUID;

/**
 * Payload for {@code POST /canteens} and {@code PUT /canteens/{id}}.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CanteenRequest {

    @NotNull(message = "Building id is required")
    private UUID buildingId;

    @NotBlank(message = "Name is required")
    @Size(max = 150, message = "Name must not exceed 150 characters")
    private String name;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    @Min(value = 0, message = "Floor cannot be negative")
    private Integer floor;

    @Min(value = 0, message = "Seating capacity cannot be negative")
    private Integer seatingCapacity;

    private LocalTime openingTime;

    private LocalTime closingTime;

    @Size(max = 20, message = "Contact number must not exceed 20 characters")
    private String contactNumber;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    private Boolean active;

}
