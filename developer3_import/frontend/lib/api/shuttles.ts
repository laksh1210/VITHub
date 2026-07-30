import { apiClient, unwrap } from "./client";
import type { ApiResponse } from "@/lib/types/common";
import type { ShuttleResponse, ShuttleStatus } from "@/lib/types/shuttle";

/**
 * Consumer for ShuttleController. Phase 4 uses only the existing read APIs.
 */
export const shuttlesApi = {
  getAll: (): Promise<ShuttleResponse[]> =>
    unwrap(apiClient.get<ApiResponse<ShuttleResponse[]>>("/shuttle")),

  getActive: (): Promise<ShuttleResponse[]> =>
    unwrap(apiClient.get<ApiResponse<ShuttleResponse[]>>("/shuttle/active")),

  getByStatus: (status: ShuttleStatus): Promise<ShuttleResponse[]> =>
    unwrap(apiClient.get<ApiResponse<ShuttleResponse[]>>(`/shuttle/status/${status}`)),

  getById: (id: string): Promise<ShuttleResponse> =>
    unwrap(apiClient.get<ApiResponse<ShuttleResponse>>(`/shuttle/${id}`)),
};
