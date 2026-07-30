/**
 * Mirrors com.vithub.backend.shuttle.location.dto.ShuttleLocationResponse exactly.
 */
export interface ShuttleLocationResponse {
  id: string;
  shuttleId: string;
  shuttleNumber: string;
  shuttleName: string;
  latitude: number;
  longitude: number;
  speed: number;
  direction: string;
  currentStopName: string | null;
  lastUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShuttleLocationRequest {
  shuttleId: string;
  latitude: number;
  longitude: number;
  speed: number;
  direction: string;
  currentStopName?: string;
}
