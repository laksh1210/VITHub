import { BaseService } from "./core/base.service";
import type { ShuttleResponse, ShuttleStatus } from "@/types/shuttle";
import { MOCK_SHUTTLES } from "./mocks/mock-shuttle-db";

class ShuttlesService extends BaseService {
  constructor() {
    super("");
  }
  public async getAll(): Promise<ShuttleResponse[]> {
    return Promise.resolve(MOCK_SHUTTLES);
  }

  public async getActive(): Promise<ShuttleResponse[]> {
    return Promise.resolve(MOCK_SHUTTLES.filter(s => s.status === "ACTIVE"));
  }

  public async getByStatus(status: ShuttleStatus): Promise<ShuttleResponse[]> {
    return Promise.resolve(MOCK_SHUTTLES.filter(s => s.status === status));
  }

  public async getById(id: string): Promise<ShuttleResponse> {
    const shuttle = MOCK_SHUTTLES.find(s => s.id === id);
    if (!shuttle) throw new Error("Shuttle not found");
    return Promise.resolve(shuttle);
  }
}

export const shuttlesService = new ShuttlesService();
