package com.vithub.backend.analytics.service.impl;

import com.vithub.backend.analytics.dto.AnalyticsSummaryDTO;
import com.vithub.backend.analytics.service.AnalyticsService;
import com.vithub.backend.building.repository.BuildingRepository;
import com.vithub.backend.canteen.entity.Canteen;
import com.vithub.backend.canteen.queue.entity.CanteenQueue;
import com.vithub.backend.canteen.queue.repository.CanteenQueueRepository;
import com.vithub.backend.canteen.repository.CanteenRepository;
import com.vithub.backend.events.entity.EventStatus;
import com.vithub.backend.events.repository.EventRepository;
import com.vithub.backend.library.repository.LibraryRepository;
import com.vithub.backend.library.seat.entity.SeatStatus;
import com.vithub.backend.library.seat.repository.LibrarySeatRepository;
import com.vithub.backend.maintenance.entity.MaintenanceStatus;
import com.vithub.backend.maintenance.entity.Priority;
import com.vithub.backend.maintenance.repository.MaintenanceRequestRepository;
import com.vithub.backend.notifications.repository.NotificationRepository;
import com.vithub.backend.occupancy.entity.Occupancy;
import com.vithub.backend.occupancy.entity.OccupancyStatus;
import com.vithub.backend.occupancy.repository.OccupancyRepository;
import com.vithub.backend.repository.UserRepository;
import com.vithub.backend.room.repository.RoomRepository;
import com.vithub.backend.shuttle.entity.ShuttleStatus;
import com.vithub.backend.shuttle.repository.ShuttleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Default implementation of {@link AnalyticsService}.
 * Reads existing module data through their existing repositories only —
 * no new query methods, entities or tables are introduced here. Every
 * figure is computed at request time on a single read-only transaction,
 * mirroring how {@link com.vithub.backend.dashboard.service.impl.DashboardServiceImpl}
 * derives the dashboard snapshot. Nothing here writes to the database.
 */
@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final BuildingRepository buildingRepository;
    private final RoomRepository roomRepository;
    private final OccupancyRepository occupancyRepository;
    private final UserRepository userRepository;
    private final LibraryRepository libraryRepository;
    private final LibrarySeatRepository librarySeatRepository;
    private final CanteenRepository canteenRepository;
    private final CanteenQueueRepository canteenQueueRepository;
    private final ShuttleRepository shuttleRepository;
    private final MaintenanceRequestRepository maintenanceRequestRepository;
    private final EventRepository eventRepository;
    private final NotificationRepository notificationRepository;

    @Override
    @Transactional(readOnly = true)
    public AnalyticsSummaryDTO getOverview() {
        long totalRooms = roomRepository.count();
        long occupiedRooms = countRoomsByStatus(occupancy -> occupancy.getStatus() != OccupancyStatus.AVAILABLE);
        long availableRooms = Math.max(0, totalRooms - occupiedRooms);

        long totalLibrarySeats = librarySeatRepository.count();
        long availableLibrarySeats = librarySeatRepository.findAllByStatusOrderBySeatNumberAsc(SeatStatus.AVAILABLE).size();

        return AnalyticsSummaryDTO.builder()
                .totalBuildings(buildingRepository.count())
                .totalRooms(totalRooms)
                .occupiedRooms(occupiedRooms)
                .availableRooms(availableRooms)
                .totalUsers(userRepository.count())
                .totalLibraries(libraryRepository.count())
                .totalLibrarySeats(totalLibrarySeats)
                .availableLibrarySeats(availableLibrarySeats)
                .totalCanteens(canteenRepository.count())
                .averageQueueLength(averageCanteenQueue())
                .activeShuttles(shuttleRepository.findAllByStatusOrderByShuttleNumberAsc(ShuttleStatus.ACTIVE).size())
                .openMaintenanceRequests(
                        maintenanceRequestRepository.findAllByStatusOrderByCreatedAtDesc(MaintenanceStatus.OPEN).size())
                .upcomingEvents(eventRepository.findAllByStatusOrderByStartDateTimeAsc(EventStatus.UPCOMING).size())
                .totalNotifications(notificationRepository.count())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsSummaryDTO.OccupancyAnalytics getOccupancyAnalytics() {
        List<Occupancy> occupancyRecords = occupancyRepository.findAllByOrderByRoomRoomNumberAsc();
        long totalRooms = roomRepository.count();

        long availableCount = occupancyRecords.stream()
                .filter(occupancy -> occupancy.getStatus() == OccupancyStatus.AVAILABLE)
                .count();
        long moderateCount = occupancyRecords.stream()
                .filter(occupancy -> occupancy.getStatus() == OccupancyStatus.MODERATE)
                .count();
        long crowdedCount = occupancyRecords.stream()
                .filter(occupancy -> occupancy.getStatus() == OccupancyStatus.CROWDED)
                .count();
        long fullCount = occupancyRecords.stream()
                .filter(occupancy -> occupancy.getStatus() == OccupancyStatus.FULL)
                .count();

        long occupiedRooms = moderateCount + crowdedCount + fullCount;
        long availableRooms = Math.max(0, totalRooms - occupiedRooms);
        double occupancyRate = totalRooms > 0 ? (occupiedRooms * 100.0) / totalRooms : 0.0;

        return AnalyticsSummaryDTO.OccupancyAnalytics.builder()
                .totalRooms(totalRooms)
                .occupiedRooms(occupiedRooms)
                .availableRooms(availableRooms)
                .occupancyRate(occupancyRate)
                .availableStatusCount(availableCount)
                .moderateStatusCount(moderateCount)
                .crowdedStatusCount(crowdedCount)
                .fullStatusCount(fullCount)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsSummaryDTO.LibraryAnalytics getLibraryAnalytics() {
        long totalSeats = librarySeatRepository.count();
        long availableSeats = librarySeatRepository.findAllByStatusOrderBySeatNumberAsc(SeatStatus.AVAILABLE).size();
        long occupiedSeats = librarySeatRepository.findAllByStatusOrderBySeatNumberAsc(SeatStatus.OCCUPIED).size();
        long reservedSeats = librarySeatRepository.findAllByStatusOrderBySeatNumberAsc(SeatStatus.RESERVED).size();
        long outOfServiceSeats =
                librarySeatRepository.findAllByStatusOrderBySeatNumberAsc(SeatStatus.OUT_OF_SERVICE).size();
        double occupancyRate = totalSeats > 0 ? (occupiedSeats * 100.0) / totalSeats : 0.0;

        return AnalyticsSummaryDTO.LibraryAnalytics.builder()
                .totalLibraries(libraryRepository.count())
                .totalSeats(totalSeats)
                .availableSeats(availableSeats)
                .occupiedSeats(occupiedSeats)
                .reservedSeats(reservedSeats)
                .outOfServiceSeats(outOfServiceSeats)
                .occupancyRate(occupancyRate)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsSummaryDTO.CanteenAnalytics getCanteenAnalytics() {
        List<Canteen> canteens = canteenRepository.findAllByOrderByNameAsc();
        long activeCanteens = canteens.stream().filter(Canteen::isActive).count();

        return AnalyticsSummaryDTO.CanteenAnalytics.builder()
                .totalCanteens(canteens.size())
                .activeCanteens(activeCanteens)
                .averageQueueLength(averageCanteenQueue())
                .averageEstimatedWaitMinutes(averageCanteenWait())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsSummaryDTO.ShuttleAnalytics getShuttleAnalytics() {
        long totalShuttles = shuttleRepository.count();
        long activeShuttles = shuttleRepository.findAllByStatusOrderByShuttleNumberAsc(ShuttleStatus.ACTIVE).size();
        long inactiveShuttles = shuttleRepository.findAllByStatusOrderByShuttleNumberAsc(ShuttleStatus.INACTIVE).size();
        long maintenanceShuttles =
                shuttleRepository.findAllByStatusOrderByShuttleNumberAsc(ShuttleStatus.MAINTENANCE).size();

        return AnalyticsSummaryDTO.ShuttleAnalytics.builder()
                .totalShuttles(totalShuttles)
                .activeShuttles(activeShuttles)
                .inactiveShuttles(inactiveShuttles)
                .maintenanceShuttles(maintenanceShuttles)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsSummaryDTO.MaintenanceAnalytics getMaintenanceAnalytics() {
        return AnalyticsSummaryDTO.MaintenanceAnalytics.builder()
                .totalRequests(maintenanceRequestRepository.count())
                .openRequests(maintenanceRequestRepository.findAllByStatusOrderByCreatedAtDesc(MaintenanceStatus.OPEN).size())
                .inProgressRequests(
                        maintenanceRequestRepository.findAllByStatusOrderByCreatedAtDesc(MaintenanceStatus.IN_PROGRESS).size())
                .resolvedRequests(
                        maintenanceRequestRepository.findAllByStatusOrderByCreatedAtDesc(MaintenanceStatus.RESOLVED).size())
                .closedRequests(maintenanceRequestRepository.findAllByStatusOrderByCreatedAtDesc(MaintenanceStatus.CLOSED).size())
                .lowPriorityRequests(maintenanceRequestRepository.findAllByPriorityOrderByCreatedAtDesc(Priority.LOW).size())
                .mediumPriorityRequests(
                        maintenanceRequestRepository.findAllByPriorityOrderByCreatedAtDesc(Priority.MEDIUM).size())
                .highPriorityRequests(maintenanceRequestRepository.findAllByPriorityOrderByCreatedAtDesc(Priority.HIGH).size())
                .criticalPriorityRequests(
                        maintenanceRequestRepository.findAllByPriorityOrderByCreatedAtDesc(Priority.CRITICAL).size())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsSummaryDTO.EventsAnalytics getEventsAnalytics() {
        return AnalyticsSummaryDTO.EventsAnalytics.builder()
                .totalEvents(eventRepository.count())
                .upcomingEvents(eventRepository.findAllByStatusOrderByStartDateTimeAsc(EventStatus.UPCOMING).size())
                .ongoingEvents(eventRepository.findAllByStatusOrderByStartDateTimeAsc(EventStatus.ONGOING).size())
                .completedEvents(eventRepository.findAllByStatusOrderByStartDateTimeAsc(EventStatus.COMPLETED).size())
                .cancelledEvents(eventRepository.findAllByStatusOrderByStartDateTimeAsc(EventStatus.CANCELLED).size())
                .build();
    }

    /** Counts occupancy records matching the given predicate — shared by overview and occupancy breakdown. */
    private long countRoomsByStatus(java.util.function.Predicate<Occupancy> predicate) {
        return occupancyRepository.findAllByOrderByRoomRoomNumberAsc().stream()
                .filter(predicate)
                .count();
    }

    private double averageCanteenQueue() {
        List<CanteenQueue> queues = canteenQueueRepository.findAllByOrderByCanteenNameAsc();
        if (queues.isEmpty()) {
            return 0.0;
        }
        return queues.stream()
                .mapToInt(CanteenQueue::getQueueCount)
                .average()
                .orElse(0.0);
    }

    private double averageCanteenWait() {
        List<CanteenQueue> queues = canteenQueueRepository.findAllByOrderByCanteenNameAsc();
        return queues.stream()
                .map(CanteenQueue::getEstimatedWaitMinutes)
                .filter(java.util.Objects::nonNull)
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0.0);
    }

}
