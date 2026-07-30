package com.vithub.backend.canteen.queue.entity;

import com.vithub.backend.canteen.entity.Canteen;
import com.vithub.backend.entity.BaseEntity;
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
 * The current queue reading for a canteen (table: {@code canteen_queue}).
 * Each canteen has at most one queue record — a live snapshot, not a
 * history log — kept current by whoever/whatever reports a new count
 * (mock schedulers are a later phase; this module only stores the value),
 * mirroring how {@code occupancy} relates to {@code rooms}.
 */
@Entity
@Table(name = "canteen_queue")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true, exclude = "canteen")
@EqualsAndHashCode(callSuper = true)
public class CanteenQueue extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "canteen_id", nullable = false, unique = true)
    private Canteen canteen;

    @Column(name = "queue_count", nullable = false)
    private Integer queueCount;

    @Column(name = "estimated_wait_minutes")
    private Integer estimatedWaitMinutes;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private CanteenQueueStatus status;

    @Column(name = "recorded_at", nullable = false)
    private Instant recordedAt;

}
