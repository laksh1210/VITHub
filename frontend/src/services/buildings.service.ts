import { BaseService } from "./core/base.service";
import type { BuildingResponse } from "@/types/building";

class BuildingsService extends BaseService {
  constructor() {
    super("");
  }
  public async getAll(): Promise<BuildingResponse[]> {
    return this.get<BuildingResponse[]>("/buildings");
  }

  public async getById(id: string): Promise<BuildingResponse> {
    return this.get<BuildingResponse>(`/buildings/${id}`);
  }
}

export const buildingsService = new BuildingsService();
