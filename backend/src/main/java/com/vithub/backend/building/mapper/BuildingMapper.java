package com.vithub.backend.building.mapper;

import com.vithub.backend.building.dto.BuildingRequest;
import com.vithub.backend.building.dto.BuildingResponse;
import com.vithub.backend.building.entity.Building;
import org.springframework.stereotype.Component;

/**
 * Entity-to-DTO mapping for {@link Building}. Entities must never be
 * returned directly from a controller; this is the single place that
 * decides what of a Building is safe to expose, and how an incoming
 * request is applied to the entity.
 */
@Component
public class BuildingMapper {

    public BuildingResponse toResponse(Building building) {
        return BuildingResponse.builder()
                .id(building.getId())
                .name(building.getName())
                .code(building.getCode())
                .description(building.getDescription())
                .category(building.getCategory())
                .latitude(building.getLatitude())
                .longitude(building.getLongitude())
                .totalFloors(building.getTotalFloors())
                .address(building.getAddress())
                .imageUrl(building.getImageUrl())
                .active(building.isActive())
                .createdAt(building.getCreatedAt())
                .updatedAt(building.getUpdatedAt())
                .build();
    }

    public Building toEntity(BuildingRequest request) {
        return Building.builder()
                .name(request.getName())
                .code(request.getCode())
                .description(request.getDescription())
                .category(request.getCategory())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .totalFloors(request.getTotalFloors())
                .address(request.getAddress())
                .imageUrl(request.getImageUrl())
                .active(request.getActive() == null || request.getActive())
                .build();
    }

    /**
     * Applies an update request onto an already-persisted entity in place,
     * so JPA's dirty-checking picks up the changes on flush.
     */
    public void updateEntity(Building building, BuildingRequest request) {
        building.setName(request.getName());
        building.setCode(request.getCode());
        building.setDescription(request.getDescription());
        building.setCategory(request.getCategory());
        building.setLatitude(request.getLatitude());
        building.setLongitude(request.getLongitude());
        building.setTotalFloors(request.getTotalFloors());
        building.setAddress(request.getAddress());
        building.setImageUrl(request.getImageUrl());
        if (request.getActive() != null) {
            building.setActive(request.getActive());
        }
    }

}
