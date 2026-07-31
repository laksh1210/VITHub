import { BaseService } from "./core/base.service";
import type { ShuttleLocationResponse } from "@/types/shuttle-location";

/**
 * Consumer for ShuttleLocationController. Phase 4 uses only the existing
 * read APIs for current, latest, and history snapshots.
 */
class ShuttleLocationsService extends BaseService {
  constructor() {
    super("");
  }
  public async getAllCurrent(): Promise<ShuttleLocationResponse[]> {
    return this.get<ShuttleLocationResponse[]>("/shuttle-locations");
  }

  public async getById(id: string): Promise<ShuttleLocationResponse> {
    return this.get<ShuttleLocationResponse>(`/shuttle-locations/${id}`);
  }

  public async getLatestByShuttleId(shuttleId: string): Promise<ShuttleLocationResponse> {
    return this.get<ShuttleLocationResponse>(
        `/shuttle-locations/shuttle/${shuttleId}/latest`
      );
  }

  public async getHistoryByShuttleId(shuttleId: string): Promise<ShuttleLocationResponse[]> {
    return this.get<ShuttleLocationResponse[]>(
        `/shuttle-locations/shuttle/${shuttleId}/history`
      );
  }
}

export const shuttleLocationsService = new ShuttleLocationsService();
