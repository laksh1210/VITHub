export type ShuttleStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE";

/**
 * Mirrors com.vithub.backend.shuttle.dto.ShuttleResponse exactly.
 */
export interface ShuttleResponse {
  id: string;
  shuttleNumber: string;
  shuttleName: string;
  driverName: string;
  driverContact: string;
  capacity: number;
  status: ShuttleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ShuttleRequest {
  shuttleNumber: string;
  shuttleName: string;
  driverName: string;
  driverContact: string;
  capacity: number;
  status: ShuttleStatus;
}

export interface ShuttleStatusUpdateRequest {
  status: ShuttleStatus;
}
