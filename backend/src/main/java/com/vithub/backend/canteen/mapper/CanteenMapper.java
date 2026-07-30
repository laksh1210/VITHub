package com.vithub.backend.canteen.mapper;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.canteen.dto.CanteenRequest;
import com.vithub.backend.canteen.dto.CanteenResponse;
import com.vithub.backend.canteen.entity.Canteen;
import org.springframework.stereotype.Component;

/**
 * Entity-to-DTO mapping for {@link Canteen}. Entities must never be
 * returned directly from a controller; this is the single place that
 * decides what of a Canteen is safe to expose, and how an incoming
 * request is applied to the entity. Resolving {@code buildingId} to a
 * {@link Building} is the service's job — the mapper only wires the
 * already-resolved entity in.
 */
@Component
public class CanteenMapper {

    public CanteenResponse toResponse(Canteen canteen) {
        Building building = canteen.getBuilding();

        return CanteenResponse.builder()
                .id(canteen.getId())
                .buildingId(building.getId())
                .buildingName(building.getName())
                .buildingCode(building.getCode())
                .name(canteen.getName())
                .description(canteen.getDescription())
                .floor(canteen.getFloor())
                .seatingCapacity(canteen.getSeatingCapacity())
                .openingTime(canteen.getOpeningTime())
                .closingTime(canteen.getClosingTime())
                .contactNumber(canteen.getContactNumber())
                .imageUrl(canteen.getImageUrl())
                .active(canteen.isActive())
                .createdAt(canteen.getCreatedAt())
                .updatedAt(canteen.getUpdatedAt())
                .build();
    }

    public Canteen toEntity(CanteenRequest request, Building building) {
        return Canteen.builder()
                .building(building)
                .name(request.getName())
                .description(request.getDescription())
                .floor(request.getFloor())
                .seatingCapacity(request.getSeatingCapacity())
                .openingTime(request.getOpeningTime())
                .closingTime(request.getClosingTime())
                .contactNumber(request.getContactNumber())
                .imageUrl(request.getImageUrl())
                .active(request.getActive() == null || request.getActive())
                .build();
    }

    /**
     * Applies an update request onto an already-persisted entity in place,
     * so JPA's dirty-checking picks up the changes on flush.
     */
    public void updateEntity(Canteen canteen, CanteenRequest request, Building building) {
        canteen.setBuilding(building);
        canteen.setName(request.getName());
        canteen.setDescription(request.getDescription());
        canteen.setFloor(request.getFloor());
        canteen.setSeatingCapacity(request.getSeatingCapacity());
        canteen.setOpeningTime(request.getOpeningTime());
        canteen.setClosingTime(request.getClosingTime());
        canteen.setContactNumber(request.getContactNumber());
        canteen.setImageUrl(request.getImageUrl());
        if (request.getActive() != null) {
            canteen.setActive(request.getActive());
        }
    }

}
