import { apiClient } from './api';
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
} from '@/types/dashboard';

/**
 * Dashboard & Analytics API Service module.
 * Strictly consumes frozen backend endpoints without hardcoded mock data.
 * Errors propagate directly to React Query to trigger Error States.
 */

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  return apiClient.get('/dashboard/summary');
}

export async function fetchAnalyticsOverview(): Promise<AnalyticsOverview> {
  return apiClient.get('/api/analytics/overview');
}

export async function fetchOccupancyAnalytics(): Promise<OccupancyAnalytics> {
  return apiClient.get('/api/analytics/occupancy');
}

export async function fetchLibraryAnalytics(): Promise<LibraryAnalytics> {
  return apiClient.get('/api/analytics/library');
}

export async function fetchCanteenAnalytics(): Promise<CanteenAnalytics> {
  return apiClient.get('/api/analytics/canteen');
}

export async function fetchShuttleAnalytics(): Promise<ShuttleAnalytics> {
  return apiClient.get('/api/analytics/shuttle');
}

export async function fetchMaintenanceAnalytics(): Promise<MaintenanceAnalytics> {
  return apiClient.get('/api/analytics/maintenance');
}

export async function fetchEventsAnalytics(): Promise<EventsAnalytics> {
  return apiClient.get('/api/analytics/events');
}

export async function fetchRoomOccupancies(): Promise<RoomOccupancy[]> {
  return apiClient.get('/occupancy');
}

export async function fetchCanteenQueues(): Promise<CanteenQueue[]> {
  return apiClient.get('/canteen-queues');
}

export async function fetchShuttleLocations(): Promise<ShuttleLocation[]> {
  return apiClient.get('/shuttle-locations');
}

export async function fetchCampusEvents(): Promise<CampusEvent[]> {
  return apiClient.get('/events');
}

export async function fetchNotifications(): Promise<NotificationItem[]> {
  return apiClient.get('/notifications');
}
