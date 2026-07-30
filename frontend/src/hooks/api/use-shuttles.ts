import { useQuery } from "@tanstack/react-query";
import { shuttlesService } from "@/services/shuttles.service";
import { queryKeys } from "@/lib/query/query-keys";
import type { ShuttleStatus } from "@/types/shuttle";

export function useShuttles() {
  return useQuery({
    queryKey: queryKeys.shuttles.all,
    queryFn: shuttlesService.getAll,
  });
}

export function useActiveShuttles() {
  return useQuery({
    queryKey: queryKeys.shuttles.active,
    queryFn: shuttlesService.getActive,
  });
}

export function useShuttlesByStatus(status: ShuttleStatus) {
  return useQuery({
    queryKey: queryKeys.shuttles.byStatus(status),
    queryFn: () => shuttlesService.getByStatus(status),
    enabled: Boolean(status),
  });
}

export function useShuttle(id: string) {
  return useQuery({
    queryKey: queryKeys.shuttles.detail(id),
    queryFn: () => shuttlesService.getById(id),
    enabled: Boolean(id),
  });
}
