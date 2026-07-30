package com.vithub.backend.shuttle.dto;

import com.vithub.backend.shuttle.entity.ShuttleStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Payload for {@code POST /shuttles} and {@code PUT /shuttles/{id}}.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShuttleRequest {

    @NotBlank(message = "Shuttle number is required")
    @Size(max = 20, message = "Shuttle number must not exceed 20 characters")
    private String shuttleNumber;

    @NotBlank(message = "Shuttle name is required")
    @Size(max = 150, message = "Shuttle name must not exceed 150 characters")
    private String shuttleName;

    @NotBlank(message = "Driver name is required")
    @Size(max = 150, message = "Driver name must not exceed 150 characters")
    private String driverName;

    @NotBlank(message = "Driver contact is required")
    @Pattern(regexp = "^[0-9+\\-\\s]{7,20}$", message = "Driver contact must be a valid phone number")
    private String driverContact;

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;

    @NotNull(message = "Status is required")
    private ShuttleStatus status;

}
