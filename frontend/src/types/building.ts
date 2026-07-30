import type { BuildingCategory } from "./enums";

export interface BuildingResponse {
  id: string;
  name: string;
  code: string;
  category: BuildingCategory;
  description: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  totalFloors: number | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
