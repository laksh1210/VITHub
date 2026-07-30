import { BaseService } from "./core/base.service";
import type {
  MaintenanceRequestCreateRequest,
  MaintenanceRequestResponse,
} from "@/types/maintenance";

/**
 * Consumer for MaintenanceRequestController. The frontend uses only the
 * existing read/create APIs and does not invent any backend workflow.
 */
const MOCK_COMPLAINTS: MaintenanceRequestResponse[] = [
  {
    id: "comp_1",
    title: "AC not working in Library",
    description: "The AC in AB1 Library is blowing warm air and making a loud noise.",
    category: "HVAC / AC",
    priority: "HIGH",
    status: "IN_PROGRESS",
    reporterId: "user_1",
    reporterUsername: "student.one",
    reporterFullName: "John Doe",
    assignedStaffId: "staff_1",
    assignedStaffUsername: "maint.tech",
    assignedStaffFullName: "Bob Smith",
    buildingId: "AB1",
    buildingName: "VIT AB1",
    roomId: "LIB_1",
    roomNumber: "Ground Floor",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "comp_2",
    title: "Broken chair in Classroom",
    description: "One of the desks has a broken leg and is unusable.",
    category: "Furniture",
    priority: "LOW",
    status: "OPEN",
    reporterId: "user_1",
    reporterUsername: "student.one",
    reporterFullName: "John Doe",
    assignedStaffId: null,
    assignedStaffUsername: null,
    assignedStaffFullName: null,
    buildingId: "AB2",
    buildingName: "VIT AB2",
    roomId: "CR_201",
    roomNumber: "201",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "comp_3",
    title: "Washroom sink leaking",
    description: "The third sink in the boys washroom on the 1st floor is leaking constantly.",
    category: "Plumbing",
    priority: "MEDIUM",
    status: "RESOLVED",
    reporterId: "user_1",
    reporterUsername: "student.one",
    reporterFullName: "John Doe",
    assignedStaffId: "staff_2",
    assignedStaffUsername: "plumber.joe",
    assignedStaffFullName: "Joe Plumber",
    buildingId: "AB1",
    buildingName: "VIT AB1",
    roomId: "WR_1",
    roomNumber: "1st Floor WR",
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

class MaintenanceService extends BaseService {
  constructor() {
    super("");
  }
  public async getAll(): Promise<MaintenanceRequestResponse[]> {
    return Promise.resolve(MOCK_COMPLAINTS);
  }

  public async getMy(): Promise<MaintenanceRequestResponse[]> {
    return Promise.resolve(MOCK_COMPLAINTS);
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
