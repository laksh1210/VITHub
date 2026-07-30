import { apiClient, unwrap } from "./client";
import type { ApiResponse } from "@/lib/types/common";
import type { ShuttleLocationResponse } from "@/lib/types/shuttle-location";

/**
 * Consumer for ShuttleLocationController. Phase 4 uses only the existing
 * read APIs for current, latest, and history snapshots.
 */
export const shuttleLocationsApi = {
  getAllCurrent: (): Promise<ShuttleLocationResponse[]> =>
    unwrap(
      apiClient.get<ApiResponse<ShuttleLocationResponse[]>>("/shuttle-locations")
    ),

  getById: (id: string): Promise<ShuttleLocationResponse> =>
    unwrap(apiClient.get<ApiResponse<ShuttleLocationResponse>>(`/shuttle-locations/${id}`)),

  getLatestByShuttleId: (shuttleId: string): Promise<ShuttleLocationResponse> =>
    unwrap(
      apiClient.get<ApiResponse<ShuttleLocationResponse>>(
        `/shuttle-locations/shuttle/${shuttleId}/latest`
      )
    ),

  getHistoryByShuttleId: (shuttleId: string): Promise<ShuttleLocationResponse[]> =>
    unwrap(
      apiClient.get<ApiResponse<ShuttleLocationResponse[]>>(
        `/shuttle-locations/shuttle/${shuttleId}/history`
      )
    ),
};
