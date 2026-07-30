package com.vithub.backend.shuttle.location.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Payload for {@code POST /shuttle-locations} and
 * {@code PUT /shuttle-locations/{id}}. Each submission records a new GPS
 * ping; the timestamp is stamped server-side rather than trusted from the
 * caller.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShuttleLocationRequest {

    @NotNull(message = "Shuttle id is required")
    private UUID shuttleId;

    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private BigDecimal latitude;

    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private BigDecimal longitude;

    @NotNull(message = "Speed is required")
    @DecimalMin(value = "0.0", message = "Speed cannot be negative")
    private Double speed;

    @NotBlank(message = "Direction is required")
    @Size(max = 50, message = "Direction must not exceed 50 characters")
    private String direction;

    @Size(max = 150, message = "Current stop name must not exceed 150 characters")
    private String currentStopName;

}
