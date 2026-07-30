package com.vithub.backend.shuttle.entity;

import com.vithub.backend.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * A campus shuttle (table: {@code shuttles}). Holds the shuttle's static
 * profile — number, driver, capacity, and operational status. Live
 * position tracking belongs to the separate shuttle_locations module and
 * is out of scope here.
 */
@Entity
@Table(name = "shuttles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class Shuttle extends BaseEntity {

    @Column(name = "shuttle_number", nullable = false, unique = true, length = 20)
    private String shuttleNumber;

    @Column(name = "shuttle_name", nullable = false, length = 150)
    private String shuttleName;

    @Column(name = "driver_name", nullable = false, length = 150)
    private String driverName;

    @Column(name = "driver_contact", nullable = false, length = 20)
    private String driverContact;

    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private ShuttleStatus status;

}
