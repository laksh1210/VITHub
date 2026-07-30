import { BaseService } from "./core/base.service";
import type {
  MaintenanceRequestCreateRequest,
  MaintenanceRequestResponse,
} from "@/types/maintenance";

/**
 * Consumer for MaintenanceRequestController. The frontend uses only the
 * existing read/create APIs and does not invent any backend workflow.
 */
class MaintenanceService extends BaseService {
  constructor() {
    super("");
  }
  public async getAll(): Promise<MaintenanceRequestResponse[]> {
    return this.get<MaintenanceRequestResponse[]>("/maintenance");
  }

  public async getMy(): Promise<MaintenanceRequestResponse[]> {
    return this.get<MaintenanceRequestResponse[]>("/maintenance/my");
  }

  public async getByStatus(status: string): Promise<MaintenanceRequestResponse[]> {
    return this.get<MaintenanceRequestResponse[]>(
        `/maintenance/status/${status}`
      );
  }

  public async getByPriority(priority: string): Promise<MaintenanceRequestResponse[]> {
    return this.get<MaintenanceRequestResponse[]>(
        `/maintenance/priority/${priority}`
      );
  }

  public async getByBuilding(buildingId: string): Promise<MaintenanceRequestResponse[]> {
    return this.get<MaintenanceRequestResponse[]>(
        `/maintenance/building/${buildingId}`
      );
  }

  public async getByRoom(roomId: string): Promise<MaintenanceRequestResponse[]> {
    return this.get<MaintenanceRequestResponse[]>(`/maintenance/room/${roomId}`);
  }

  public async getById(id: string): Promise<MaintenanceRequestResponse> {
    return this.get<MaintenanceRequestResponse>(`/maintenance/${id}`);
  }

  public async create(payload: MaintenanceRequestCreateRequest): Promise<MaintenanceRequestResponse> {
    return this.post<MaintenanceRequestResponse>("/maintenance", payload);
  }
}

export const maintenanceService = new MaintenanceService();
