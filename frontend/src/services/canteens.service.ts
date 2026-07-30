import { BaseService } from "./core/base.service";
import type { CanteenResponse } from "@/types/canteen";
import { MOCK_CANTEENS } from "./mocks/mock-canteen-db";

/**
 * Consumer for CanteenController. Phase 3 stays on the existing backend
 * contract: GET /canteens, /canteens/{id}, /canteens/search.
 */
class CanteensService extends BaseService {
  constructor() {
    super("");
  }

  public async getAll(buildingId?: string): Promise<CanteenResponse[]> {
    if (buildingId && buildingId !== "NONE") {
      return Promise.resolve(MOCK_CANTEENS.filter(c => c.buildingId === buildingId));
    }
    return Promise.resolve(MOCK_CANTEENS);
  }

  public async getById(id: string): Promise<CanteenResponse> {
    const canteen = MOCK_CANTEENS.find(c => c.id === id);
    if (!canteen) throw new Error("Canteen not found");
    return Promise.resolve(canteen);
  }

  public async getActive(): Promise<CanteenResponse[]> {
    return Promise.resolve(MOCK_CANTEENS.filter(c => c.active));
  }
}

export const canteensService = new CanteensService();
