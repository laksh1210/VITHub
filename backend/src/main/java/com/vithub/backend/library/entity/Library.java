package com.vithub.backend.library.entity;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * A library space within a campus building (table: {@code library}).
 * Holds aggregate seat/room counts for the space (the "BuildingLibrary
 * relationship"); individual seat-level records belong to the separate
 * library_seats module and are out of scope here.
 */
@Entity
@Table(
        name = "library",
        uniqueConstraints = @UniqueConstraint(
                name = "uq_library_building_id_name",
                columnNames = {"building_id", "name"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true, exclude = "building")
@EqualsAndHashCode(callSuper = true)
public class Library extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "floor")
    private Integer floor;

    @Column(name = "total_seats", nullable = false)
    private Integer totalSeats;

    @Column(name = "occupied_seats", nullable = false)
    @Builder.Default
    private Integer occupiedSeats = 0;

    @Column(name = "silent_room_count", nullable = false)
    @Builder.Default
    private Integer silentRoomCount = 0;

    @Column(name = "discussion_room_count", nullable = false)
    @Builder.Default
    private Integer discussionRoomCount = 0;

    @Column(name = "active", nullable = false)
    @Builder.Default
    private boolean active = true;

}
