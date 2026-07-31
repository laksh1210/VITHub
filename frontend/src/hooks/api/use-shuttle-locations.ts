import { useQuery } from "@tanstack/react-query";
import { shuttleLocationsService } from "@/services/shuttle-locations.service";
import { queryKeys } from "@/lib/query/query-keys";

export function useAllCurrentShuttleLocations() {
  return useQuery({
    queryKey: queryKeys.shuttleLocations.allCurrent,
    queryFn: () => shuttleLocationsService.getAllCurrent(),
    refetchInterval: 1000,
  });
}

export function useShuttleLocation(id: string) {
  return useQuery({
    queryKey: queryKeys.shuttleLocations.detail(id),
    queryFn: () => shuttleLocationsService.getById(id),
    enabled: Boolean(id),
  });
}

export function useLatestShuttleLocation(shuttleId: string) {
  return useQuery({
    queryKey: queryKeys.shuttleLocations.latest(shuttleId),
    queryFn: () => shuttleLocationsService.getLatestByShuttleId(shuttleId),
    enabled: Boolean(shuttleId),
  });
}

export function useShuttleLocationHistory(shuttleId: string) {
  return useQuery({
    queryKey: queryKeys.shuttleLocations.history(shuttleId),
    queryFn: () => shuttleLocationsService.getHistoryByShuttleId(shuttleId),
    enabled: Boolean(shuttleId),
  });
}
