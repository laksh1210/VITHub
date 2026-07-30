import { BaseService } from "./core/base.service";
import type { ShuttleLocationResponse } from "@/types/shuttle-location";
import { getMockShuttleLocations } from "./mocks/mock-shuttle-db";

class ShuttleLocationsService extends BaseService {
  constructor() {
    super("");
  }
  public async getAllCurrent(): Promise<ShuttleLocationResponse[]> {
    return Promise.resolve(getMockShuttleLocations());
  }

  public async getById(id: string): Promise<ShuttleLocationResponse> {
    // Note: ID lookup is ignored in mock for simplicity
    return Promise.resolve(getMockShuttleLocations()[0]);
  }

  public async getLatestByShuttleId(shuttleId: string): Promise<ShuttleLocationResponse> {
    const loc = getMockShuttleLocations().find(l => l.shuttleId === shuttleId);
    if (!loc) throw new Error("Location not found");
    return Promise.resolve(loc);
  }

  public async getHistoryByShuttleId(shuttleId: string): Promise<ShuttleLocationResponse[]> {
    // Return just the current location as history for mock simplicity
    const loc = getMockShuttleLocations().find(l => l.shuttleId === shuttleId);
    return Promise.resolve(loc ? [loc] : []);
  }
}

export const shuttleLocationsService = new ShuttleLocationsService();
