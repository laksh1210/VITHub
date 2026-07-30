import { BaseService } from "./core/base.service";
import type { CanteenQueueResponse } from "@/types/canteen-queue";

/**
 * Consumer for CanteenQueueController. Phase 3 uses the existing read APIs
 * only: GET /canteen-queues, /canteen-queues/{id}, /canteen-queues/canteen/{id}.
 */
class CanteenQueuesService extends BaseService {
  constructor() {
    super("");
  }
  public async getAll(): Promise<CanteenQueueResponse[]> {
    return this.get<CanteenQueueResponse[]>("/canteen-queues");
  }

  public async getById(id: string): Promise<CanteenQueueResponse> {
    return this.get<CanteenQueueResponse>(`/canteen-queues/${id}`);
  }

  public async getByCanteenId(canteenId: string): Promise<CanteenQueueResponse> {
    return this.get<CanteenQueueResponse>(
        `/canteen-queues/canteen/${canteenId}`
      );
  }
}

export const canteenQueuesService = new CanteenQueuesService();
