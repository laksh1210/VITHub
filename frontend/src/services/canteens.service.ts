import { BaseService } from "./core/base.service";
import type { CanteenResponse } from "@/types/canteen";

/**
 * Consumer for CanteenController. Phase 3 stays on the existing backend
 * contract: GET /canteens, /canteens/{id}, /canteens/search.
 */
class CanteensService extends BaseService {
  constructor() {
    super("");
  }
  public async getAll(buildingId?: string): Promise<CanteenResponse[]> {
    return this.get<CanteenResponse[]>("/canteens", {
        params: buildingId ? { buildingId } : undefined,
      });
  }

  public async getById(id: string): Promise<CanteenResponse> {
    return this.get<CanteenResponse>(`/canteens/${id}`);
  }

  public async getByName(name: string): Promise<CanteenResponse> {
    return this.get<CanteenResponse>("/canteens/search", {
        params: { name },
      });
  }
}

export const canteensService = new CanteensService();
