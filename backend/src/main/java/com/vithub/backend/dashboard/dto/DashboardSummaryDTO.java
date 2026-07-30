package com.vithub.backend.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Aggregated, campus-wide snapshot returned by {@code GET /dashboard/summary}.
 * Every figure is derived at request time from existing module data —
 * this DTO holds no state of its own and no entity is ever exposed
 * through it.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryDTO {

    private long totalBuildings;

    private long totalRooms;
    private long occupiedRooms;
    private long availableRooms;

    private long totalLibrarySeats;
    private long availableLibrarySeats;
    private long occupiedLibrarySeats;

    private long activeCanteens;
    private double averageCanteenQueue;

    private long activeShuttles;

    private long openMaintenanceRequests;

    private long upcomingEvents;

    private long unreadNotifications;

}
