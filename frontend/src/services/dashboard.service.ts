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
    return this.get<DashboardSummary>(API_ENDPOINTS.DASHBOARD.SUMMARY);
  }

  public async getAnalyticsOverview(): Promise<AnalyticsOverview> {
    return this.get<AnalyticsOverview>(API_ENDPOINTS.ANALYTICS.OVERVIEW);
  }

  public async getOccupancyAnalytics(): Promise<OccupancyAnalytics> {
    return this.get<OccupancyAnalytics>(API_ENDPOINTS.ANALYTICS.OCCUPANCY);
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
    return this.get<CanteenAnalytics>(API_ENDPOINTS.ANALYTICS.CANTEEN);
  }

  public async getShuttleAnalytics(): Promise<ShuttleAnalytics> {
    return this.get<ShuttleAnalytics>(API_ENDPOINTS.ANALYTICS.SHUTTLE);
  }

  public async getMaintenanceAnalytics(): Promise<MaintenanceAnalytics> {
    return this.get<MaintenanceAnalytics>(API_ENDPOINTS.ANALYTICS.MAINTENANCE);
  }

  public async getEventsAnalytics(): Promise<EventsAnalytics> {
    return this.get<EventsAnalytics>(API_ENDPOINTS.ANALYTICS.EVENTS);
  }

  public async getRoomOccupancies(): Promise<RoomOccupancy[]> {
    return this.get<RoomOccupancy[]>(API_ENDPOINTS.ROOMS.OCCUPANCY);
  }

  public async getCanteenQueues(): Promise<CanteenQueue[]> {
    return this.get<CanteenQueue[]>(API_ENDPOINTS.CANTEEN.QUEUES);
  }

  public async getShuttleLocations(): Promise<ShuttleLocation[]> {
    return this.get<ShuttleLocation[]>(API_ENDPOINTS.SHUTTLE.LOCATIONS);
  }

  public async getCampusEvents(): Promise<CampusEvent[]> {
    return this.get<CampusEvent[]>(API_ENDPOINTS.EVENTS.LIST);
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
