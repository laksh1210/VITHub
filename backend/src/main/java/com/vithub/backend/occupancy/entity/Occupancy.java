package com.vithub.backend.occupancy.entity;

import com.vithub.backend.entity.BaseEntity;
import com.vithub.backend.room.entity.Room;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
 * The current occupancy reading for a room (table: {@code occupancy}).
 * Each room has at most one occupancy record — a live snapshot, not a
 * history log — kept current by whoever/whatever reports a new count
 * (mock schedulers are a later phase; this module only stores the value).
 */
@Entity
@Table(name = "occupancy")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true, exclude = "room")
@EqualsAndHashCode(callSuper = true)
public class Occupancy extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "room_id", nullable = false, unique = true)
    private Room room;

    @Column(name = "current_count", nullable = false)
    private Integer currentCount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private OccupancyStatus status;

    @Column(name = "recorded_at", nullable = false)
    private Instant recordedAt;

}
