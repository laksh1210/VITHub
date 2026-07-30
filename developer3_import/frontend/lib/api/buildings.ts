import { apiClient, unwrap } from "./client";
import type { ApiResponse } from "@/lib/types/common";
import type { BuildingResponse } from "@/lib/types/building";

export const buildingsApi = {
  getAll: (): Promise<BuildingResponse[]> =>
    unwrap(apiClient.get<ApiResponse<BuildingResponse[]>>("/buildings")),

  getById: (id: string): Promise<BuildingResponse> =>
    unwrap(apiClient.get<ApiResponse<BuildingResponse>>(`/buildings/${id}`)),
};
