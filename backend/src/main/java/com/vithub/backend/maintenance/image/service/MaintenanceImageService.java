package com.vithub.backend.maintenance.image.service;

import com.vithub.backend.maintenance.image.dto.MaintenanceImageResponse;
import com.vithub.backend.maintenance.image.dto.MaintenanceImageUploadRequest;

import java.util.List;
import java.util.UUID;

/**
 * Business operations for the Maintenance Image module. Implemented by
 * {@link com.vithub.backend.maintenance.image.service.impl.MaintenanceImageServiceImpl}.
 */
public interface MaintenanceImageService {

    List<MaintenanceImageResponse> getImagesByMaintenanceRequest(UUID maintenanceRequestId);

    MaintenanceImageResponse getImageById(UUID id);

    MaintenanceImageResponse uploadImage(UUID uploadedById, MaintenanceImageUploadRequest request);

    void deleteImage(UUID id);

}
