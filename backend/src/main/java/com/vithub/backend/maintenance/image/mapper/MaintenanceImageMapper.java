package com.vithub.backend.maintenance.image.mapper;

import com.vithub.backend.entity.User;
import com.vithub.backend.maintenance.entity.MaintenanceRequest;
import com.vithub.backend.maintenance.image.dto.MaintenanceImageResponse;
import com.vithub.backend.maintenance.image.dto.MaintenanceImageUploadRequest;
import com.vithub.backend.maintenance.image.entity.MaintenanceImage;
import org.springframework.stereotype.Component;

/**
 * Entity-to-DTO mapping for {@link MaintenanceImage}. Entities must
 * never be returned directly from a controller; this is the single place
 * that decides what of a MaintenanceImage is safe to expose. Resolving
 * the parent {@link MaintenanceRequest} and the uploading {@link User}
 * from their ids is the service layer's job — this mapper only assembles
 * or flattens what it is given.
 */
@Component
public class MaintenanceImageMapper {

    public MaintenanceImageResponse toResponse(MaintenanceImage image) {
        MaintenanceRequest maintenanceRequest = image.getMaintenanceRequest();
        User uploadedBy = image.getUploadedBy();

        return MaintenanceImageResponse.builder()
                .id(image.getId())
                .maintenanceRequestId(maintenanceRequest.getId())
                .maintenanceRequestTitle(maintenanceRequest.getTitle())
                .imageUrl(image.getImageUrl())
                .imageType(image.getImageType())
                .caption(image.getCaption())
                .uploadedById(uploadedBy.getId())
                .uploadedByUsername(uploadedBy.getUsername())
                .uploadedByFullName(uploadedBy.getFullName())
                .createdAt(image.getCreatedAt())
                .build();
    }

    public MaintenanceImage toEntity(MaintenanceImageUploadRequest request, MaintenanceRequest maintenanceRequest,
                                      User uploadedBy) {
        return MaintenanceImage.builder()
                .maintenanceRequest(maintenanceRequest)
                .imageUrl(request.getImageUrl())
                .imageType(request.getImageType())
                .caption(request.getCaption())
                .uploadedBy(uploadedBy)
                .build();
    }

}
