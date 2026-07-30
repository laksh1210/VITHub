import { useApiQuery } from "./use-api-query";
import { dashboardService } from "@/services";
import { queryKeys } from "@/lib/query/query-keys";

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

export function useDashboardSummary() {
  return useApiQuery<DashboardSummary>(
    queryKeys.dashboard.summary(),
    () => dashboardService.getSummary(),
    { type: "volatile" }
  );
}

export function useAnalyticsOverview() {
  return useApiQuery<AnalyticsOverview>(
    queryKeys.analytics.overview(),
    () => dashboardService.getAnalyticsOverview(),
    { type: "volatile" }
  );
}

export function useOccupancyAnalytics() {
  return useApiQuery<OccupancyAnalytics>(
    queryKeys.analytics.occupancy(),
    () => dashboardService.getOccupancyAnalytics(),
    { type: "volatile" }
  );
}

export function useLibraryAnalytics() {
  return useApiQuery<LibraryAnalytics>(
    queryKeys.analytics.library(),
    () => dashboardService.getLibraryAnalytics(),
    { type: "volatile" }
  );
}

export function useCanteenAnalytics() {
  return useApiQuery<CanteenAnalytics>(
    queryKeys.analytics.canteen(),
    () => dashboardService.getCanteenAnalytics(),
    { type: "volatile" }
  );
}

export function useShuttleAnalytics() {
  return useApiQuery<ShuttleAnalytics>(
    queryKeys.analytics.shuttle(),
    () => dashboardService.getShuttleAnalytics(),
    { type: "volatile" }
  );
}

export function useMaintenanceAnalytics() {
  return useApiQuery<MaintenanceAnalytics>(
    queryKeys.analytics.maintenance(),
    () => dashboardService.getMaintenanceAnalytics(),
    { type: "standard" }
  );
}

export function useEventsAnalytics() {
  return useApiQuery<EventsAnalytics>(
    queryKeys.analytics.events(),
    () => dashboardService.getEventsAnalytics(),
    { type: "standard" }
  );
}

export function useRoomOccupancies() {
  return useApiQuery<RoomOccupancy[]>(
    queryKeys.rooms.occupancy(),
    () => dashboardService.getRoomOccupancies(),
    { type: "volatile" }
  );
}

export function useCanteenQueues() {
  return useApiQuery<CanteenQueue[]>(
    queryKeys.canteen.queues(),
    () => dashboardService.getCanteenQueues(),
    { type: "volatile" }
  );
}

export function useShuttleLocations() {
  return useApiQuery<ShuttleLocation[]>(
    queryKeys.shuttle.locations(),
    () => dashboardService.getShuttleLocations(),
    { type: "volatile" }
  );
}

export function useCampusEvents() {
  return useApiQuery<CampusEvent[]>(
    queryKeys.events.list(),
    () => dashboardService.getCampusEvents(),
    { type: "standard" }
  );
}

export function useNotifications() {
  return useApiQuery<NotificationItem[]>(
    queryKeys.notifications.list(),
    () => dashboardService.getNotifications(),
    { type: "volatile" }
  );
}
