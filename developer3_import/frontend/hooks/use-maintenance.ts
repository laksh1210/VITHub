import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { maintenanceApi } from "@/lib/api/maintenance";
import { queryKeys } from "@/lib/query-keys";
import type {
  MaintenanceRequestCreateRequest,
  MaintenanceStatus,
  Priority,
} from "@/lib/types/maintenance";

export function useAllMaintenanceRequests() {
  return useQuery({
    queryKey: queryKeys.maintenance.all,
    queryFn: maintenanceApi.getAll,
  });
}

export function useMyMaintenanceRequests() {
  return useQuery({
    queryKey: queryKeys.maintenance.my,
    queryFn: maintenanceApi.getMy,
  });
}

export function useMaintenanceRequestsByStatus(status: MaintenanceStatus) {
  return useQuery({
    queryKey: queryKeys.maintenance.byStatus(status),
    queryFn: () => maintenanceApi.getByStatus(status),
    enabled: Boolean(status),
  });
}

export function useMaintenanceRequestsByPriority(priority: Priority) {
  return useQuery({
    queryKey: queryKeys.maintenance.byPriority(priority),
    queryFn: () => maintenanceApi.getByPriority(priority),
    enabled: Boolean(priority),
  });
}

export function useMaintenanceRequestsByBuilding(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.maintenance.byBuilding(buildingId),
    queryFn: () => maintenanceApi.getByBuilding(buildingId),
    enabled: Boolean(buildingId),
  });
}

export function useMaintenanceRequestsByRoom(roomId: string) {
  return useQuery({
    queryKey: queryKeys.maintenance.byRoom(roomId),
    queryFn: () => maintenanceApi.getByRoom(roomId),
    enabled: Boolean(roomId),
  });
}

export function useMaintenanceRequest(id: string) {
  return useQuery({
    queryKey: queryKeys.maintenance.detail(id),
    queryFn: () => maintenanceApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreateMaintenanceRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MaintenanceRequestCreateRequest) => maintenanceApi.create(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["maintenance"],
      }),
  });
}
