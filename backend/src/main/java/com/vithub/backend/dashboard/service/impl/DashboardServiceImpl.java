package com.vithub.backend.dashboard.service.impl;

import com.vithub.backend.building.repository.BuildingRepository;
import com.vithub.backend.canteen.entity.Canteen;
import com.vithub.backend.canteen.queue.entity.CanteenQueue;
import com.vithub.backend.canteen.queue.repository.CanteenQueueRepository;
import com.vithub.backend.canteen.repository.CanteenRepository;
import com.vithub.backend.dashboard.dto.DashboardSummaryDTO;
import com.vithub.backend.dashboard.service.DashboardService;
import com.vithub.backend.events.entity.EventStatus;
import com.vithub.backend.events.repository.EventRepository;
import com.vithub.backend.library.seat.entity.SeatStatus;
import com.vithub.backend.library.seat.repository.LibrarySeatRepository;
import com.vithub.backend.maintenance.entity.MaintenanceStatus;
import com.vithub.backend.maintenance.repository.MaintenanceRequestRepository;
import com.vithub.backend.notifications.entity.NotificationStatus;
import com.vithub.backend.notifications.repository.NotificationRepository;
import com.vithub.backend.occupancy.entity.Occupancy;
import com.vithub.backend.occupancy.entity.OccupancyStatus;
import com.vithub.backend.occupancy.repository.OccupancyRepository;
import com.vithub.backend.room.repository.RoomRepository;
import com.vithub.backend.shuttle.entity.ShuttleStatus;
import com.vithub.backend.shuttle.repository.ShuttleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Default implementation of {@link DashboardService}.
 * Reads existing module data through their existing repositories only —
 * no new query methods, entities or tables are introduced here. Every
 * figure is computed at request time on a single read-only transaction,
 * so the summary is a consistent snapshot rather than a set of
 * independently-timed reads. Nothing here writes to the database.
 */
@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final BuildingRepository buildingRepository;
    private final RoomRepository roomRepository;
    private final OccupancyRepository occupancyRepository;
    private final LibrarySeatRepository librarySeatRepository;
    private final CanteenRepository canteenRepository;
    private final CanteenQueueRepository canteenQueueRepository;
    private final ShuttleRepository shuttleRepository;
    private final MaintenanceRequestRepository maintenanceRequestRepository;
    private final EventRepository eventRepository;
    private final NotificationRepository notificationRepository;

    @Override
    @Transactional(readOnly = true)
    public DashboardSummaryDTO getSummary() {
        long totalBuildings = buildingRepository.count();

        long totalRooms = roomRepository.count();
        long occupiedRooms = countOccupiedRooms();
        long availableRooms = Math.max(0, totalRooms - occupiedRooms);

        long totalLibrarySeats = librarySeatRepository.count();
        long availableLibrarySeats =
                librarySeatRepository.findAllByStatusOrderBySeatNumberAsc(SeatStatus.AVAILABLE).size();
        long occupiedLibrarySeats =
                librarySeatRepository.findAllByStatusOrderBySeatNumberAsc(SeatStatus.OCCUPIED).size();

        long activeCanteens = countActiveCanteens();
        double averageCanteenQueue = averageCanteenQueue();

        long activeShuttles = shuttleRepository.findAllByStatusOrderByShuttleNumberAsc(ShuttleStatus.ACTIVE).size();

        long openMaintenanceRequests =
                maintenanceRequestRepository.findAllByStatusOrderByCreatedAtDesc(MaintenanceStatus.OPEN).size();

        long upcomingEvents = eventRepository.findAllByStatusOrderByStartDateTimeAsc(EventStatus.UPCOMING).size();

        long unreadNotifications = countUnreadNotifications();

        return DashboardSummaryDTO.builder()
                .totalBuildings(totalBuildings)
                .totalRooms(totalRooms)
                .occupiedRooms(occupiedRooms)
                .availableRooms(availableRooms)
                .totalLibrarySeats(totalLibrarySeats)
                .availableLibrarySeats(availableLibrarySeats)
                .occupiedLibrarySeats(occupiedLibrarySeats)
                .activeCanteens(activeCanteens)
                .averageCanteenQueue(averageCanteenQueue)
                .activeShuttles(activeShuttles)
                .openMaintenanceRequests(openMaintenanceRequests)
                .upcomingEvents(upcomingEvents)
                .unreadNotifications(unreadNotifications)
                .build();
    }

    /** A room is considered occupied when its latest occupancy reading is above AVAILABLE. */
    private long countOccupiedRooms() {
        List<Occupancy> occupancyRecords = occupancyRepository.findAllByOrderByRoomRoomNumberAsc();
        return occupancyRecords.stream()
                .filter(occupancy -> occupancy.getStatus() != OccupancyStatus.AVAILABLE)
                .count();
    }

    private long countActiveCanteens() {
        List<Canteen> canteens = canteenRepository.findAllByOrderByNameAsc();
        return canteens.stream()
                .filter(Canteen::isActive)
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

    private long countUnreadNotifications() {
        return notificationRepository.findAll().stream()
                .filter(notification -> notification.getStatus() == NotificationStatus.UNREAD)
                .count();
    }

}
