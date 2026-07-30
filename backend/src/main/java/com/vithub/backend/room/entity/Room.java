package com.vithub.backend.room.entity;

import com.vithub.backend.building.entity.Building;
import com.vithub.backend.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
 * A room within a campus building (table: {@code rooms}).
 * Every room belongs to exactly one {@link Building} (the "BuildingRoom
 * relationship") via a many-to-one, lazily-fetched association; live
 * occupancy numbers live in the separate occupancy module, not here.
 */
@Entity
@Table(
        name = "rooms",
        uniqueConstraints = @UniqueConstraint(
                name = "uq_rooms_building_id_room_number",
                columnNames = {"building_id", "room_number"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true, exclude = "building")
@EqualsAndHashCode(callSuper = true)
public class Room extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    @Column(name = "room_number", nullable = false, length = 20)
    private String roomNumber;

    @Column(name = "name", length = 150)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 30)
    private RoomType type;

    @Column(name = "floor", nullable = false)
    private Integer floor;

    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @Column(name = "active", nullable = false)
    @Builder.Default
    private boolean active = true;

}
