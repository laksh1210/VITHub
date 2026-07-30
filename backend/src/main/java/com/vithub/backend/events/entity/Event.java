package com.vithub.backend.events.entity;

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

import java.time.Instant;

/**
 * A campus event (table: {@code events}), surfaced on the dashboard's
 * "Upcoming Events" widget and the campus map/AI assistant for venue and
 * timing lookups. May optionally be scoped to a {@link Building} and/or
 * {@link Room}; {@code venue} always carries a human-readable location
 * even when no structured building/room is set. Event registration, QR
 * codes, notifications and chat logs are separate modules and are
 * intentionally not modeled here.
 */
@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true, exclude = {"building", "room", "createdBy"})
@EqualsAndHashCode(callSuper = true)
public class Event extends BaseEntity {

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", nullable = false, length = 2000)
    private String description;

    @Column(name = "category", nullable = false, length = 50)
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false, length = 30)
    private EventType eventType;

    @Column(name = "organizer", nullable = false, length = 150)
    private String organizer;

    @Column(name = "start_date_time", nullable = false)
    private Instant startDateTime;

    @Column(name = "end_date_time", nullable = false)
    private Instant endDateTime;

    @Column(name = "venue", nullable = false, length = 200)
    private String venue;

    /** The building this event takes place in. Optional. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id")
    private Building building;

    /** The room this event takes place in. Optional. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "registration_required", nullable = false)
    @Builder.Default
    private boolean registrationRequired = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private EventStatus status;

    /** The user who created this event listing. Required. */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

}
