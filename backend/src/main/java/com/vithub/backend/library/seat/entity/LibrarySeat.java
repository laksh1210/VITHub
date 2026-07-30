package com.vithub.backend.library.seat.entity;

import com.vithub.backend.entity.BaseEntity;
import com.vithub.backend.library.entity.Library;
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
 * A single seat within a {@link Library} space (table: {@code library_seats}).
 * Individual seats belong to exactly one library (the "LibrarySeat
 * relationship"); the library's aggregate seat counts live separately on
 * {@link Library} and are not recalculated here.
 */
@Entity
@Table(
        name = "library_seats",
        uniqueConstraints = @UniqueConstraint(
                name = "uq_library_seats_library_id_seat_number",
                columnNames = {"library_id", "seat_number"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true, exclude = "library")
@EqualsAndHashCode(callSuper = true)
public class LibrarySeat extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "library_id", nullable = false)
    private Library library;

    @Column(name = "seat_number", nullable = false, length = 20)
    private String seatNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "seat_type", nullable = false, length = 20)
    private SeatType seatType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private SeatStatus status = SeatStatus.AVAILABLE;

}
