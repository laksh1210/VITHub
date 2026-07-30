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
    return this.get<LibraryAnalytics>(API_ENDPOINTS.ANALYTICS.LIBRARY);
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
    return this.get<NotificationItem[]>(API_ENDPOINTS.NOTIFICATIONS.LIST);
  }
}

export const dashboardService = new DashboardService();
