/**
 * Mirrors com.vithub.backend.canteen.queue.entity.CanteenQueueStatus and
 * com.vithub.backend.canteen.queue.dto.CanteenQueueResponse exactly.
 */
export type CanteenQueueStatus = "LOW" | "MODERATE" | "HIGH" | "VERY_HIGH";

export interface CanteenQueueResponse {
  id: string;
  canteenId: string;
  canteenName: string;
  buildingId: string;
  buildingName: string;
  buildingCode: string;
  queueCount: number;
  estimatedWaitMinutes: number | null;
  status: CanteenQueueStatus;
  recordedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CanteenQueueRequest {
  canteenId: string;
  queueCount: number;
  estimatedWaitMinutes?: number | null;
}

export interface CanteenQueueCountUpdateRequest {
  queueCount: number;
}

export interface CanteenQueueWaitTimeUpdateRequest {
  estimatedWaitMinutes: number;
}
