package com.vithub.backend.maintenance.image.entity;

import com.vithub.backend.entity.BaseEntity;
import com.vithub.backend.entity.User;
import com.vithub.backend.maintenance.entity.MaintenanceRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * A photo attached to a {@link MaintenanceRequest} (table:
 * {@code maintenance_images}) — e.g. a "before" photo of the issue or an
 * "after" photo once resolved. Every image belongs to exactly one
 * complaint and was uploaded by exactly one user; actual file/cloud
 * storage is out of scope for this module — only the resulting URL and
 * its metadata are modeled here.
 */
@Entity
@Table(name = "maintenance_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true, exclude = {"maintenanceRequest", "uploadedBy"})
@EqualsAndHashCode(callSuper = true)
public class MaintenanceImage extends BaseEntity {

    /** The complaint this image belongs to. Required. */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "maintenance_request_id", nullable = false)
    private MaintenanceRequest maintenanceRequest;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "image_type", nullable = false, length = 20)
    private ImageType imageType;

    @Column(name = "caption", length = 500)
    private String caption;

    /** The user who uploaded this image. Required. */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "uploaded_by", nullable = false)
    private User uploadedBy;

}
