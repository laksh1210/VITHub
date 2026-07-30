import { apiClient, unwrap } from "./client";
import type { ApiResponse } from "@/lib/types/common";
import type { CanteenQueueResponse } from "@/lib/types/canteen-queue";

/**
 * Consumer for CanteenQueueController. Phase 3 uses the existing read APIs
 * only: GET /canteen-queues, /canteen-queues/{id}, /canteen-queues/canteen/{id}.
 */
export const canteenQueuesApi = {
  getAll: (): Promise<CanteenQueueResponse[]> =>
    unwrap(apiClient.get<ApiResponse<CanteenQueueResponse[]>>("/canteen-queues")),

  getById: (id: string): Promise<CanteenQueueResponse> =>
    unwrap(apiClient.get<ApiResponse<CanteenQueueResponse>>(`/canteen-queues/${id}`)),

  getByCanteenId: (canteenId: string): Promise<CanteenQueueResponse> =>
    unwrap(
      apiClient.get<ApiResponse<CanteenQueueResponse>>(
        `/canteen-queues/canteen/${canteenId}`
      )
    ),
};
