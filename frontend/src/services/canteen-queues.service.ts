import { BaseService } from "./core/base.service";
import type { CanteenQueueResponse } from "@/types/canteen-queue";
import { MOCK_CANTEEN_QUEUES } from "./mocks/mock-canteen-db";

class CanteenQueuesService extends BaseService {
  constructor() {
    super("");
  }

  public async getAll(): Promise<CanteenQueueResponse[]> {
    return Promise.resolve(MOCK_CANTEEN_QUEUES);
  }

  public async getById(id: string): Promise<CanteenQueueResponse> {
    const queue = MOCK_CANTEEN_QUEUES.find(q => q.id === id);
    if (!queue) throw new Error("Queue not found");
    return Promise.resolve(queue);
  }

  public async getByCanteenId(canteenId: string): Promise<CanteenQueueResponse> {
    const queue = MOCK_CANTEEN_QUEUES.find(q => q.canteenId === canteenId);
    if (!queue) throw new Error("Queue not found");
    return Promise.resolve(queue);
  }

  public async getHistoryByCanteenId(canteenId: string): Promise<CanteenQueueResponse[]> {
    const queue = MOCK_CANTEEN_QUEUES.find(q => q.canteenId === canteenId);
    return Promise.resolve(queue ? [queue] : []);
  }
}

export const canteenQueuesService = new CanteenQueuesService();
