import { apiClient, unwrap } from "./client";
import type { ApiResponse } from "@/lib/types/common";
import type { RoomResponse } from "@/lib/types/room";

export const roomsApi = {
  getAll: (buildingId?: string): Promise<RoomResponse[]> =>
    unwrap(
      apiClient.get<ApiResponse<RoomResponse[]>>("/rooms", {
        params: buildingId ? { buildingId } : undefined,
      })
    ),

  getById: (id: string): Promise<RoomResponse> =>
    unwrap(apiClient.get<ApiResponse<RoomResponse>>(`/rooms/${id}`)),
};
