package com.vithub.backend.building.dto;

import com.vithub.backend.building.entity.BuildingCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of a {@link com.vithub.backend.building.entity.Building}.
 * Returned by every {@code /buildings} endpoint; the entity is never
 * exposed directly.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BuildingResponse {

    private UUID id;
    private String name;
    private String code;
    private String description;
    private BuildingCategory category;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private Integer totalFloors;
    private String address;
    private String imageUrl;
    private boolean active;
    private Instant createdAt;
    private Instant updatedAt;

}
