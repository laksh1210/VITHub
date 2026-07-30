package com.vithub.backend.maintenance.entity;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.entity.BaseEntity;
import com.vithub.backend.entity.User;
import com.vithub.backend.room.entity.Room;
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
 * A maintenance complaint raised on campus (table: {@code maintenance_requests}).
 * Every request is reported by exactly one {@link User} (the "reporter")
 * and may optionally reference the {@link Building} and/or {@link Room}
 * it concerns, and the {@link User} (maintenance staff) it is assigned to.
 * Maintenance images, notifications and chat logs are separate modules
 * and are intentionally not modeled here.
 */
@Entity
@Table(name = "maintenance_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true, exclude = {"reporter", "assignedStaff", "building", "room"})
@EqualsAndHashCode(callSuper = true)
public class MaintenanceRequest extends BaseEntity {

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", nullable = false, length = 2000)
    private String description;

    @Column(name = "category", nullable = false, length = 50)
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false, length = 20)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private MaintenanceStatus status;

    /** The user who reported this complaint. Required — the "ReporterRequest" relationship. */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "reporter_id", nullable = false)
    private User reporter;

    /** The maintenance staff member this complaint is assigned to. Optional. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_staff_id")
    private User assignedStaff;

    /** The building this complaint concerns. Optional. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id")
    private Building building;

    /** The room this complaint concerns. Optional. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

}
