package com.vithub.backend.canteen.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalTime;
import java.util.UUID;

/**
 * Public representation of a {@link com.vithub.backend.canteen.entity.Canteen}.
 * Returned by every {@code /canteens} endpoint; the entity is never exposed
 * directly. Building context is flattened in, mirroring the Library
 * module's read model. Live queue length is not part of this response —
 * it belongs to the separate canteen_queue module.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CanteenResponse {

    private UUID id;
    private UUID buildingId;
    private String buildingName;
    private String buildingCode;
    private String name;
    private String description;
    private Integer floor;
    private Integer seatingCapacity;
    private LocalTime openingTime;
    private LocalTime closingTime;
    private String contactNumber;
    private String imageUrl;
    private boolean active;
    private Instant createdAt;
    private Instant updatedAt;

}
