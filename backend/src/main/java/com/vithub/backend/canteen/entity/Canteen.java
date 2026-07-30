package com.vithub.backend.canteen.entity;

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

import java.time.LocalTime;

/**
 * A canteen / food outlet within a campus building (table: {@code canteens}).
 * Holds the canteen's static profile and operating details. Live queue
 * length belongs to the separate {@code canteen_queue} module and is out
 * of scope here.
 */
@Entity
@Table(
        name = "canteens",
        uniqueConstraints = @UniqueConstraint(
                name = "uq_canteens_building_id_name",
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
public class Canteen extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "floor")
    private Integer floor;

    @Column(name = "seating_capacity")
    private Integer seatingCapacity;

    @Column(name = "opening_time")
    private LocalTime openingTime;

    @Column(name = "closing_time")
    private LocalTime closingTime;

    @Column(name = "contact_number", length = 20)
    private String contactNumber;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "active", nullable = false)
    @Builder.Default
    private boolean active = true;

}
