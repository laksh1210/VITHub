package com.vithub.backend.maintenance.image.dto;

import com.vithub.backend.maintenance.image.entity.ImageType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * Payload for {@code POST /maintenance-images}.
 * Records a photo already uploaded elsewhere by URL — this module never
 * performs the file/cloud upload itself. The uploader is never taken
 * from this payload — it is always resolved from the authenticated
 * principal, so a user can never attribute an image to someone else.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceImageUploadRequest {

    @NotNull(message = "Maintenance request id is required")
    private UUID maintenanceRequestId;

    @NotBlank(message = "Image URL is required")
    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    @NotNull(message = "Image type is required")
    private ImageType imageType;

    @Size(max = 500, message = "Caption must not exceed 500 characters")
    private String caption;

}
