import type { RoomType } from "./enums";

export interface RoomResponse {
  id: string;
  buildingId: string;
  buildingName: string;
  buildingCode: string;
  roomNumber: string;
  roomName: string | null;
  type: RoomType;
  floor: number | null;
  capacity: number | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
