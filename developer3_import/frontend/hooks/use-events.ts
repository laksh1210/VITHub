import { useQuery } from "@tanstack/react-query";
import { eventsApi } from "@/lib/api/events";
import { queryKeys } from "@/lib/query-keys";
import type { EventStatus } from "@/lib/types/event";

export function useEvents() {
  return useQuery({
    queryKey: queryKeys.events.all,
    queryFn: eventsApi.getAll,
  });
}

export function useUpcomingEvents() {
  return useQuery({
    queryKey: queryKeys.events.upcoming,
    queryFn: eventsApi.getUpcoming,
  });
}

export function useEventsByStatus(status: EventStatus) {
  return useQuery({
    queryKey: queryKeys.events.byStatus(status),
    queryFn: () => eventsApi.getByStatus(status),
    enabled: Boolean(status),
  });
}

export function useEventsByCategory(category: string) {
  return useQuery({
    queryKey: queryKeys.events.byCategory(category),
    queryFn: () => eventsApi.getByCategory(category),
    enabled: Boolean(category),
  });
}

export function useEventsByBuilding(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.events.byBuilding(buildingId),
    queryFn: () => eventsApi.getByBuilding(buildingId),
    enabled: Boolean(buildingId),
  });
}

export function useEventsByRoom(roomId: string) {
  return useQuery({
    queryKey: queryKeys.events.byRoom(roomId),
    queryFn: () => eventsApi.getByRoom(roomId),
    enabled: Boolean(roomId),
  });
}

export function useEventsByDateRange(start: string, end: string) {
  return useQuery({
    queryKey: queryKeys.events.byRange(start, end),
    queryFn: () => eventsApi.getByDateRange(start, end),
    enabled: Boolean(start) && Boolean(end),
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: () => eventsApi.getById(id),
    enabled: Boolean(id),
  });
}
