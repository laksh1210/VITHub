package com.vithub.backend.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Aggregated analytics figures returned by the Analytics module
 * ({@code GET /api/analytics/**}). Every figure is derived at request
 * time from existing module data — this DTO (and its nested per-module
 * breakdowns) holds no state of its own and no entity is ever exposed
 * through it.
 * <p>
 * The outer class is the payload for {@code GET /api/analytics/overview};
 * the static nested classes are the payloads for the corresponding
 * per-module endpoints ({@code /occupancy}, {@code /library},
 * {@code /canteen}, {@code /shuttle}, {@code /maintenance}, {@code /events}).
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsSummaryDTO {

    private long totalBuildings;
    private long totalRooms;
    private long occupiedRooms;
    private long availableRooms;

    private long totalUsers;

    private long totalLibraries;
    private long totalLibrarySeats;
    private long availableLibrarySeats;

    private long totalCanteens;
    private double averageQueueLength;

    private long activeShuttles;

    private long openMaintenanceRequests;

    private long upcomingEvents;

    private long totalNotifications;

    /** Payload for {@code GET /api/analytics/occupancy}. */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OccupancyAnalytics {
        private long totalRooms;
        private long occupiedRooms;
        private long availableRooms;
        private double occupancyRate;
        private long availableStatusCount;
        private long moderateStatusCount;
        private long crowdedStatusCount;
        private long fullStatusCount;
    }

    /** Payload for {@code GET /api/analytics/library}. */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LibraryAnalytics {
        private long totalLibraries;
        private long totalSeats;
        private long availableSeats;
        private long occupiedSeats;
        private long reservedSeats;
        private long outOfServiceSeats;
        private double occupancyRate;
        private List<IndividualLibraryStats> libraries;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class IndividualLibraryStats {
        private String id;
        private String name;
        private long totalSeats;
        private long availableSeats;
        private long occupiedSeats;
        private long reservedSeats;
        private long outOfServiceSeats;
        private double occupancyRate;
    }

    /** Payload for {@code GET /api/analytics/canteen}. */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CanteenAnalytics {
        private long totalCanteens;
        private long activeCanteens;
        private double averageQueueLength;
        private double averageEstimatedWaitMinutes;
    }

    /** Payload for {@code GET /api/analytics/shuttle}. */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ShuttleAnalytics {
        private long totalShuttles;
        private long activeShuttles;
        private long inactiveShuttles;
        private long maintenanceShuttles;
    }

    /** Payload for {@code GET /api/analytics/maintenance}. */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MaintenanceAnalytics {
        private long totalRequests;
        private long openRequests;
        private long inProgressRequests;
        private long resolvedRequests;
        private long closedRequests;
        private long lowPriorityRequests;
        private long mediumPriorityRequests;
        private long highPriorityRequests;
        private long criticalPriorityRequests;
    }

    /** Payload for {@code GET /api/analytics/events}. */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EventsAnalytics {
        private long totalEvents;
        private long upcomingEvents;
        private long ongoingEvents;
        private long completedEvents;
        private long cancelledEvents;
    }

}
