import { BaseService } from "./core/base.service";
import { API_ENDPOINTS } from "@/constants/api";
import {
  DashboardSummary,
  AnalyticsOverview,
  OccupancyAnalytics,
  LibraryAnalytics,
  CanteenAnalytics,
  ShuttleAnalytics,
  MaintenanceAnalytics,
  EventsAnalytics,
  RoomOccupancy,
  CanteenQueue,
  ShuttleLocation,
  CampusEvent,
  NotificationItem,
} from "@/types/dashboard";

class DashboardService extends BaseService {
  constructor() {
    super("");
  }
  public async getSummary(): Promise<DashboardSummary> {
    return Promise.resolve({
      totalBuildings: 8,
      totalRooms: 120,
      occupiedRooms: 85,
      availableRooms: 35,
      totalLibrarySeats: 300,
      availableLibrarySeats: 120,
      occupiedLibrarySeats: 160,
      activeCanteens: 4,
      averageCanteenQueue: 15,
      activeShuttles: 6,
      openMaintenanceRequests: 12,
      upcomingEvents: 5,
      unreadNotifications: 2,
    });
  }

  public async getAnalyticsOverview(): Promise<AnalyticsOverview> {
    return Promise.resolve({
      totalBuildings: 8,
      totalRooms: 120,
      occupiedRooms: 85,
      availableRooms: 35,
      totalUsers: 5400,
      totalLibraries: 2,
      totalLibrarySeats: 300,
      availableLibrarySeats: 120,
      totalCanteens: 5,
      averageQueueLength: 12,
      activeShuttles: 6,
      openMaintenanceRequests: 12,
      upcomingEvents: 5,
      totalNotifications: 15,
    });
  }

  public async getOccupancyAnalytics(): Promise<OccupancyAnalytics> {
    return Promise.resolve({
      totalRooms: 120,
      occupiedRooms: 85,
      availableRooms: 35,
      occupancyRate: 70.8,
      availableStatusCount: 35,
      moderateStatusCount: 40,
      crowdedStatusCount: 30,
      fullStatusCount: 15,
    });
  }

  public async getLibraryAnalytics(): Promise<LibraryAnalytics> {
    // Return mock data for AB1 and AB2 libraries
    return Promise.resolve({
      totalLibraries: 2,
      totalSeats: 300,
      availableSeats: 120,
      occupiedSeats: 160,
      reservedSeats: 10,
      outOfServiceSeats: 10,
      occupancyRate: 53.3,
      libraries: [
        {
          id: 'AB1',
          name: 'VIT AB1 Library',
          totalSeats: 150,
          availableSeats: 45,
          occupiedSeats: 95,
          reservedSeats: 5,
          outOfServiceSeats: 5,
          occupancyRate: 63.3,
        },
        {
          id: 'AB2',
          name: 'VIT AB2 Library',
          totalSeats: 150,
          availableSeats: 75,
          occupiedSeats: 65,
          reservedSeats: 5,
          outOfServiceSeats: 5,
          occupancyRate: 43.3,
        }
      ]
    });
  }

  public async getCanteenAnalytics(): Promise<CanteenAnalytics> {
    return Promise.resolve({
      totalCanteens: 5,
      activeCanteens: 4,
      averageQueueLength: 15,
      averageEstimatedWaitMinutes: 10,
    });
  }

  public async getShuttleAnalytics(): Promise<ShuttleAnalytics> {
    return Promise.resolve({
      totalShuttles: 8,
      activeShuttles: 6,
      inactiveShuttles: 1,
      maintenanceShuttles: 1,
    });
  }

  public async getMaintenanceAnalytics(): Promise<MaintenanceAnalytics> {
    return Promise.resolve({
      totalRequests: 45,
      openRequests: 12,
      inProgressRequests: 8,
      resolvedRequests: 15,
      closedRequests: 10,
      lowPriorityRequests: 20,
      mediumPriorityRequests: 15,
      highPriorityRequests: 8,
      criticalPriorityRequests: 2,
    });
  }

  public async getEventsAnalytics(): Promise<EventsAnalytics> {
    return Promise.resolve({
      totalEvents: 24,
      upcomingEvents: 5,
      ongoingEvents: 2,
      completedEvents: 15,
      cancelledEvents: 2,
    });
  }

  public async getRoomOccupancies(): Promise<RoomOccupancy[]> {
    return Promise.resolve([
      {
        id: "room_1",
        roomId: "room_1",
        roomNumber: "AB1-401",
        roomName: "Data Science Lab",
        buildingId: "AB1",
        buildingName: "Academic Block 1",
        buildingCode: "AB1",
        capacity: 60,
        currentCount: 45,
        availableCapacity: 15,
        occupancyPercentage: 75,
        status: "MODERATE",
        recordedAt: new Date().toISOString()
      },
      {
        id: "room_2",
        roomId: "room_2",
        roomNumber: "AB1-402",
        roomName: "IoT Lab",
        buildingId: "AB1",
        buildingName: "Academic Block 1",
        buildingCode: "AB1",
        capacity: 60,
        currentCount: 58,
        availableCapacity: 2,
        occupancyPercentage: 96.6,
        status: "FULL",
        recordedAt: new Date().toISOString()
      }
    ]);
  }

  public async getCanteenQueues(): Promise<CanteenQueue[]> {
    return Promise.resolve([
      {
        id: "q_1",
        canteenId: "FC1",
        canteenName: "Main Food Court",
        buildingId: "FC",
        buildingName: "Food Court",
        buildingCode: "FC",
        queueCount: 25,
        estimatedWaitMinutes: 15,
        status: "CROWDED",
        recordedAt: new Date().toISOString()
      },
      {
        id: "q_2",
        canteenId: "FC2",
        canteenName: "UnderBelly",
        buildingId: "AB1",
        buildingName: "Academic Block 1",
        buildingCode: "AB1",
        queueCount: 8,
        estimatedWaitMinutes: 5,
        status: "MODERATE",
        recordedAt: new Date().toISOString()
      }
    ]);
  }

  public async getShuttleLocations(): Promise<ShuttleLocation[]> {
    return Promise.resolve([
      {
        id: "shut_1",
        shuttleId: "S1",
        shuttleNumber: "Bus 12 (Campus Loop)",
        shuttleName: "Campus Loop A",
        latitude: 23.078,
        longitude: 76.852,
        speed: 15,
        direction: "North",
        currentStopName: "Academic Block 1",
        lastUpdatedAt: new Date().toISOString()
      },
      {
        id: "shut_2",
        shuttleId: "S2",
        shuttleNumber: "Bus 15 (Hostel Express)",
        shuttleName: "Hostel Express",
        latitude: 23.079,
        longitude: 76.855,
        speed: 25,
        direction: "East",
        currentStopName: "Boys Hostel Block A",
        lastUpdatedAt: new Date().toISOString()
      }
    ]);
  }

  public async getCampusEvents(): Promise<CampusEvent[]> {
    return Promise.resolve([
      {
        id: "ev_1",
        title: "Advitya 2026",
        description: "Annual Tech Fest",
        category: "Festival",
        eventType: "Cultural",
        organizer: "Student Council",
        startDateTime: new Date().toISOString(),
        endDateTime: new Date(Date.now() + 86400000).toISOString(), // + 1 day
        venue: "Main Auditorium",
        buildingId: "AUD",
        buildingName: "Auditorium",
        capacity: 1000,
        registrationRequired: true,
        status: "UPCOMING"
      }
    ]);
  }

  public async getNotifications(): Promise<NotificationItem[]> {
    // Return mock data because the backend /notifications endpoint is missing
    return Promise.resolve([
      {
        id: "1",
        title: "System Update",
        message: "Campus Map Digital Twin has been successfully integrated.",
        type: "SYSTEM",
        status: "UNREAD",
        createdAt: new Date().toISOString()
      },
      {
        id: "2",
        title: "Maintenance Alert",
        message: "AB-1 Elevators will be under maintenance tomorrow from 10 AM to 12 PM.",
        type: "MAINTENANCE",
        status: "UNREAD",
        createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
      }
    ]);
  }
}

export const dashboardService = new DashboardService();
