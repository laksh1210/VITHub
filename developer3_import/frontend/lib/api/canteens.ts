import { apiClient, unwrap } from "./client";
import type { ApiResponse } from "@/lib/types/common";
import type { CanteenResponse } from "@/lib/types/canteen";

/**
 * Consumer for CanteenController. Phase 3 stays on the existing backend
 * contract: GET /canteens, /canteens/{id}, /canteens/search.
 */
export const canteensApi = {
  getAll: (buildingId?: string): Promise<CanteenResponse[]> =>
    unwrap(
      apiClient.get<ApiResponse<CanteenResponse[]>>("/canteens", {
        params: buildingId ? { buildingId } : undefined,
      })
    ),

  getById: (id: string): Promise<CanteenResponse> =>
    unwrap(apiClient.get<ApiResponse<CanteenResponse>>(`/canteens/${id}`)),

  getByName: (name: string): Promise<CanteenResponse> =>
    unwrap(
      apiClient.get<ApiResponse<CanteenResponse>>("/canteens/search", {
        params: { name },
      })
    ),
};
