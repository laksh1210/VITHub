import { useQuery } from "@tanstack/react-query";
import { shuttlesApi } from "@/lib/api/shuttles";
import { queryKeys } from "@/lib/query-keys";
import type { ShuttleStatus } from "@/lib/types/shuttle";

export function useShuttles() {
  return useQuery({
    queryKey: queryKeys.shuttles.all,
    queryFn: shuttlesApi.getAll,
  });
}

export function useActiveShuttles() {
  return useQuery({
    queryKey: queryKeys.shuttles.active,
    queryFn: shuttlesApi.getActive,
  });
}

export function useShuttlesByStatus(status: ShuttleStatus) {
  return useQuery({
    queryKey: queryKeys.shuttles.byStatus(status),
    queryFn: () => shuttlesApi.getByStatus(status),
    enabled: Boolean(status),
  });
}

export function useShuttle(id: string) {
  return useQuery({
    queryKey: queryKeys.shuttles.detail(id),
    queryFn: () => shuttlesApi.getById(id),
    enabled: Boolean(id),
  });
}
