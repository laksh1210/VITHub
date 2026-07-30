import { BaseService } from "./core/base.service";
import type { RoomResponse } from "@/types/room";

class RoomsService extends BaseService {
  constructor() {
    super("");
  }
  public async getAll(buildingId?: string): Promise<RoomResponse[]> {
    return this.get<RoomResponse[]>("/rooms", {
        params: buildingId ? { buildingId } : undefined,
      });
  }

  public async getById(id: string): Promise<RoomResponse> {
    return this.get<RoomResponse>(`/rooms/${id}`);
  }
}

export const roomsService = new RoomsService();
