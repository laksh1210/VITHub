package com.vithub.backend.maintenance.image.service.impl;

import com.vithub.backend.common.exception.ResourceNotFoundException;
import com.vithub.backend.entity.User;
import com.vithub.backend.maintenance.entity.MaintenanceRequest;
import com.vithub.backend.maintenance.image.dto.MaintenanceImageResponse;
import com.vithub.backend.maintenance.image.dto.MaintenanceImageUploadRequest;
import com.vithub.backend.maintenance.image.entity.MaintenanceImage;
import com.vithub.backend.maintenance.image.mapper.MaintenanceImageMapper;
import com.vithub.backend.maintenance.image.repository.MaintenanceImageRepository;
import com.vithub.backend.maintenance.image.service.MaintenanceImageService;
import com.vithub.backend.maintenance.repository.MaintenanceRequestRepository;
import com.vithub.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Default implementation of {@link MaintenanceImageService}.
 * Reads run on a read-only transaction; writes are individually
 * transactional so a failure never leaves a partial update committed.
 * The parent maintenance request and the uploading user are always
 * re-resolved from their ids on upload (never trusted blindly), mirroring
 * how {@code ShuttleLocationServiceImpl} resolves its parent shuttle.
 * Images are an append-only log tied to a complaint — there is no update
 * operation, only upload and delete.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MaintenanceImageServiceImpl implements MaintenanceImageService {

    private final MaintenanceImageRepository maintenanceImageRepository;
    private final MaintenanceImageMapper maintenanceImageMapper;
    private final MaintenanceRequestRepository maintenanceRequestRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceImageResponse> getImagesByMaintenanceRequest(UUID maintenanceRequestId) {
        return maintenanceImageRepository.findAllByMaintenanceRequestIdOrderByCreatedAtAsc(maintenanceRequestId).stream()
                .map(maintenanceImageMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public MaintenanceImageResponse getImageById(UUID id) {
        return maintenanceImageMapper.toResponse(findImageOrThrow(id));
    }

    @Override
    @Transactional
    public MaintenanceImageResponse uploadImage(UUID uploadedById, MaintenanceImageUploadRequest request) {
        MaintenanceRequest maintenanceRequest = findMaintenanceRequestOrThrow(request.getMaintenanceRequestId());
        User uploadedBy = findUserOrThrow(uploadedById);

        MaintenanceImage image = maintenanceImageMapper.toEntity(request, maintenanceRequest, uploadedBy);
        MaintenanceImage saved = maintenanceImageRepository.save(image);
        log.info("Uploaded {} image for maintenance request '{}' by '{}'",
                saved.getImageType(), maintenanceRequest.getId(), uploadedBy.getUsername());
        return maintenanceImageMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteImage(UUID id) {
        MaintenanceImage image = findImageOrThrow(id);
        maintenanceImageRepository.delete(image);
        log.info("Deleted maintenance image '{}' for maintenance request '{}'",
                id, image.getMaintenanceRequest().getId());
    }

    private MaintenanceImage findImageOrThrow(UUID id) {
        return maintenanceImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance image not found with id: " + id));
    }

    private MaintenanceRequest findMaintenanceRequestOrThrow(UUID maintenanceRequestId) {
        return maintenanceRequestRepository.findById(maintenanceRequestId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Maintenance request not found with id: " + maintenanceRequestId));
    }

    private User findUserOrThrow(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

}
