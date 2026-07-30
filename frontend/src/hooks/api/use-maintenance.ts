import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { maintenanceService } from "@/services/maintenance.service";
import { queryKeys } from "@/lib/query/query-keys";
import type {
  MaintenanceRequestCreateRequest,
  MaintenanceStatus,
  Priority,
} from "@/types/maintenance";

export function useAllMaintenanceRequests() {
  return useQuery({
    queryKey: queryKeys.maintenance.all,
    queryFn: maintenanceService.getAll,
  });
}

export function useMyMaintenanceRequests() {
  return useQuery({
    queryKey: queryKeys.maintenance.my,
    queryFn: maintenanceService.getMy,
  });
}

export function useMaintenanceRequestsByStatus(status: MaintenanceStatus) {
  return useQuery({
    queryKey: queryKeys.maintenance.byStatus(status),
    queryFn: () => maintenanceService.getByStatus(status),
    enabled: Boolean(status),
  });
}

export function useMaintenanceRequestsByPriority(priority: Priority) {
  return useQuery({
    queryKey: queryKeys.maintenance.byPriority(priority),
    queryFn: () => maintenanceService.getByPriority(priority),
    enabled: Boolean(priority),
  });
}

export function useMaintenanceRequestsByBuilding(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.maintenance.byBuilding(buildingId),
    queryFn: () => maintenanceService.getByBuilding(buildingId),
    enabled: Boolean(buildingId),
  });
}

export function useMaintenanceRequestsByRoom(roomId: string) {
  return useQuery({
    queryKey: queryKeys.maintenance.byRoom(roomId),
    queryFn: () => maintenanceService.getByRoom(roomId),
    enabled: Boolean(roomId),
  });
}

export function useMaintenanceRequest(id: string) {
  return useQuery({
    queryKey: queryKeys.maintenance.detail(id),
    queryFn: () => maintenanceService.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreateMaintenanceRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MaintenanceRequestCreateRequest) => maintenanceService.create(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["maintenance"],
      }),
  });
}
