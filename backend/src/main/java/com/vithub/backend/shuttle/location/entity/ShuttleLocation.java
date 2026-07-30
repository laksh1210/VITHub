package com.vithub.backend.shuttle.location.entity;

import com.vithub.backend.entity.BaseEntity;
import com.vithub.backend.shuttle.entity.Shuttle;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

import java.math.BigDecimal;
import java.time.Instant;

/**
 * A single GPS ping for a shuttle (table: {@code shuttle_locations}).
 * Unlike {@code occupancy} or {@code canteen_queue}, a shuttle has many
 * location rows over time — this is a history log, not a one-per-parent
 * snapshot, so the "current" position is simply the most recent row for
 * a given shuttle.
 */
@Entity
@Table(name = "shuttle_locations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true, exclude = "shuttle")
@EqualsAndHashCode(callSuper = true)
public class ShuttleLocation extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "shuttle_id", nullable = false)
    private Shuttle shuttle;

    @Column(name = "latitude", nullable = false, precision = 10, scale = 7)
    private BigDecimal latitude;

    @Column(name = "longitude", nullable = false, precision = 10, scale = 7)
    private BigDecimal longitude;

    @Column(name = "speed", nullable = false)
    private Double speed;

    @Column(name = "direction", nullable = false, length = 50)
    private String direction;

    @Column(name = "last_updated_at", nullable = false)
    private Instant lastUpdatedAt;

    @Column(name = "current_stop_name", length = 150)
    private String currentStopName;

}
