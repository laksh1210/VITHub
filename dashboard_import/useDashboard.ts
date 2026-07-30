'use client';

import { useQuery } from '@tanstack/react-query';
import {
  fetchDashboardSummary,
  fetchAnalyticsOverview,
  fetchOccupancyAnalytics,
  fetchLibraryAnalytics,
  fetchCanteenAnalytics,
  fetchShuttleAnalytics,
  fetchMaintenanceAnalytics,
  fetchEventsAnalytics,
  fetchRoomOccupancies,
  fetchCanteenQueues,
  fetchShuttleLocations,
  fetchCampusEvents,
  fetchNotifications,
} from '@/lib/dashboard-api';

export function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: fetchDashboardSummary,
    staleTime: 30000, // 30 seconds
    retry: 1,
  });
}

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: fetchAnalyticsOverview,
    staleTime: 30000,
    retry: 1,
  });
}

export function useOccupancyAnalytics() {
  return useQuery({
    queryKey: ['analytics', 'occupancy'],
    queryFn: fetchOccupancyAnalytics,
    staleTime: 15000,
    retry: 1,
  });
}

export function useLibraryAnalytics() {
  return useQuery({
    queryKey: ['analytics', 'library'],
    queryFn: fetchLibraryAnalytics,
    staleTime: 15000,
    retry: 1,
  });
}

export function useCanteenAnalytics() {
  return useQuery({
    queryKey: ['analytics', 'canteen'],
    queryFn: fetchCanteenAnalytics,
    staleTime: 15000,
    retry: 1,
  });
}

export function useShuttleAnalytics() {
  return useQuery({
    queryKey: ['analytics', 'shuttle'],
    queryFn: fetchShuttleAnalytics,
    staleTime: 15000,
    retry: 1,
  });
}

export function useMaintenanceAnalytics() {
  return useQuery({
    queryKey: ['analytics', 'maintenance'],
    queryFn: fetchMaintenanceAnalytics,
    staleTime: 30000,
    retry: 1,
  });
}

export function useEventsAnalytics() {
  return useQuery({
    queryKey: ['analytics', 'events'],
    queryFn: fetchEventsAnalytics,
    staleTime: 30000,
    retry: 1,
  });
}

export function useRoomOccupancies() {
  return useQuery({
    queryKey: ['occupancy', 'rooms'],
    queryFn: fetchRoomOccupancies,
    staleTime: 15000,
    retry: 1,
  });
}

export function useCanteenQueues() {
  return useQuery({
    queryKey: ['canteen', 'queues'],
    queryFn: fetchCanteenQueues,
    staleTime: 15000,
    retry: 1,
  });
}

export function useShuttleLocations() {
  return useQuery({
    queryKey: ['shuttle', 'locations'],
    queryFn: fetchShuttleLocations,
    staleTime: 10000,
    retry: 1,
  });
}

export function useCampusEvents() {
  return useQuery({
    queryKey: ['events', 'list'],
    queryFn: fetchCampusEvents,
    staleTime: 30000,
    retry: 1,
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications', 'list'],
    queryFn: fetchNotifications,
    staleTime: 15000,
    retry: 1,
  });
}
