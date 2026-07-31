import { useQuery } from "@tanstack/react-query";
import { eventsService } from "@/services/events.service";
import { queryKeys } from "@/lib/query/query-keys";
import type { EventStatus } from "@/types/event";

export function useEvents() {
  return useQuery({
    queryKey: queryKeys.events.all,
    queryFn: () => eventsService.getAll(),
  });
}

export function useUpcomingEvents() {
  return useQuery({
    queryKey: queryKeys.events.upcoming(),
    queryFn: () => eventsService.getUpcoming(),
  });
}

export function useEventsByStatus(status: EventStatus) {
  return useQuery({
    queryKey: queryKeys.events.byStatus(status),
    queryFn: () => eventsService.getByStatus(status),
    enabled: Boolean(status),
  });
}

export function useEventsByCategory(category: string) {
  return useQuery({
    queryKey: queryKeys.events.byCategory(category),
    queryFn: () => eventsService.getByCategory(category),
    enabled: Boolean(category),
  });
}

export function useEventsByBuilding(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.events.byBuilding(buildingId),
    queryFn: () => eventsService.getByBuildingId(buildingId),
    enabled: Boolean(buildingId),
  });
}

export function useEventsByRoom(roomId: string) {
  return useQuery({
    queryKey: queryKeys.events.byRoom(roomId),
    queryFn: () => eventsService.getByRoom(roomId),
    enabled: Boolean(roomId),
  });
}

export function useEventsByDateRange(start: string, end: string) {
  return useQuery({
    queryKey: queryKeys.events.byRange(start, end),
    queryFn: () => eventsService.getByDateRange(start, end),
    enabled: Boolean(start) && Boolean(end),
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: () => eventsService.getById(id),
    enabled: Boolean(id),
  });
}
