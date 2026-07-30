import { useQuery } from "@tanstack/react-query";
import { shuttleLocationsApi } from "@/lib/api/shuttle-locations";
import { queryKeys } from "@/lib/query-keys";

export function useAllCurrentShuttleLocations() {
  return useQuery({
    queryKey: queryKeys.shuttleLocations.allCurrent,
    queryFn: shuttleLocationsApi.getAllCurrent,
  });
}

export function useShuttleLocation(id: string) {
  return useQuery({
    queryKey: queryKeys.shuttleLocations.detail(id),
    queryFn: () => shuttleLocationsApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useLatestShuttleLocation(shuttleId: string) {
  return useQuery({
    queryKey: queryKeys.shuttleLocations.latest(shuttleId),
    queryFn: () => shuttleLocationsApi.getLatestByShuttleId(shuttleId),
    enabled: Boolean(shuttleId),
  });
}

export function useShuttleLocationHistory(shuttleId: string) {
  return useQuery({
    queryKey: queryKeys.shuttleLocations.history(shuttleId),
    queryFn: () => shuttleLocationsApi.getHistoryByShuttleId(shuttleId),
    enabled: Boolean(shuttleId),
  });
}
