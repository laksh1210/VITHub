import { BaseService } from "./core/base.service";
import type { ShuttleResponse, ShuttleStatus } from "@/types/shuttle";

/**
 * Consumer for ShuttleController. Phase 4 uses only the existing read APIs.
 */
class ShuttlesService extends BaseService {
  constructor() {
    super("");
  }
  public async getAll(): Promise<ShuttleResponse[]> {
    return this.get<ShuttleResponse[]>("/shuttle");
  }

  public async getActive(): Promise<ShuttleResponse[]> {
    return this.get<ShuttleResponse[]>("/shuttle/active");
  }

  public async getByStatus(status: ShuttleStatus): Promise<ShuttleResponse[]> {
    return this.get<ShuttleResponse[]>(`/shuttle/status/${status}`);
  }

  public async getById(id: string): Promise<ShuttleResponse> {
    return this.get<ShuttleResponse>(`/shuttle/${id}`);
  }
}

export const shuttlesService = new ShuttlesService();
