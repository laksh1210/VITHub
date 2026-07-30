import { apiClient, unwrap } from "./client";
import type { ApiResponse } from "@/lib/types/common";
import type {
  MaintenanceRequestCreateRequest,
  MaintenanceRequestResponse,
} from "@/lib/types/maintenance";

/**
 * Consumer for MaintenanceRequestController. The frontend uses only the
 * existing read/create APIs and does not invent any backend workflow.
 */
export const maintenanceApi = {
  getAll: (): Promise<MaintenanceRequestResponse[]> =>
    unwrap(apiClient.get<ApiResponse<MaintenanceRequestResponse[]>>("/maintenance")),

  getMy: (): Promise<MaintenanceRequestResponse[]> =>
    unwrap(apiClient.get<ApiResponse<MaintenanceRequestResponse[]>>("/maintenance/my")),

  getByStatus: (status: string): Promise<MaintenanceRequestResponse[]> =>
    unwrap(
      apiClient.get<ApiResponse<MaintenanceRequestResponse[]>>(
        `/maintenance/status/${status}`
      )
    ),

  getByPriority: (priority: string): Promise<MaintenanceRequestResponse[]> =>
    unwrap(
      apiClient.get<ApiResponse<MaintenanceRequestResponse[]>>(
        `/maintenance/priority/${priority}`
      )
    ),

  getByBuilding: (buildingId: string): Promise<MaintenanceRequestResponse[]> =>
    unwrap(
      apiClient.get<ApiResponse<MaintenanceRequestResponse[]>>(
        `/maintenance/building/${buildingId}`
      )
    ),

  getByRoom: (roomId: string): Promise<MaintenanceRequestResponse[]> =>
    unwrap(
      apiClient.get<ApiResponse<MaintenanceRequestResponse[]>>(`/maintenance/room/${roomId}`)
    ),

  getById: (id: string): Promise<MaintenanceRequestResponse> =>
    unwrap(apiClient.get<ApiResponse<MaintenanceRequestResponse>>(`/maintenance/${id}`)),

  create: (
    payload: MaintenanceRequestCreateRequest
  ): Promise<MaintenanceRequestResponse> =>
    unwrap(apiClient.post<ApiResponse<MaintenanceRequestResponse>>("/maintenance", payload)),
};
