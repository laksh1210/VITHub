export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type MaintenanceStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

/**
 * Mirrors com.vithub.backend.maintenance.dto.MaintenanceRequestResponse exactly.
 */
export interface MaintenanceRequestResponse {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  status: MaintenanceStatus;
  reporterId: string;
  reporterUsername: string;
  reporterFullName: string;
  assignedStaffId: string | null;
  assignedStaffUsername: string | null;
  assignedStaffFullName: string | null;
  buildingId: string | null;
  buildingName: string | null;
  roomId: string | null;
  roomNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceRequestCreateRequest {
  title: string;
  description: string;
  category: string;
  priority: Priority;
  buildingId?: string;
  roomId?: string;
}
