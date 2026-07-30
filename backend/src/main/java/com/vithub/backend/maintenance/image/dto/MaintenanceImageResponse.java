package com.vithub.backend.maintenance.image.dto;

import com.vithub.backend.maintenance.image.entity.ImageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

/**
 * Public representation of a {@link com.vithub.backend.maintenance.image.entity.MaintenanceImage}.
 * Returned by every {@code /maintenance-images} endpoint; the entity is
 * never exposed directly. The parent complaint and uploader are
 * flattened in so consumers don't have to make a second call for the
 * common case.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceImageResponse {

    private UUID id;

    private UUID maintenanceRequestId;
    private String maintenanceRequestTitle;

    private String imageUrl;
    private ImageType imageType;
    private String caption;

    private UUID uploadedById;
    private String uploadedByUsername;
    private String uploadedByFullName;

    private Instant createdAt;

}
