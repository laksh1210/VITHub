/**
 * Mirrors com.vithub.backend.canteen.dto.CanteenResponse exactly.
 * Phase 3 remains read-only, so these fields come straight from the API.
 */
export interface CanteenResponse {
  id: string;
  buildingId: string;
  buildingName: string;
  buildingCode: string;
  name: string;
  description: string | null;
  floor: number | null;
  seatingCapacity: number | null;
  openingTime: string | null;
  closingTime: string | null;
  contactNumber: string | null;
  imageUrl: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Mirrors com.vithub.backend.canteen.dto.CanteenRequest for future admin
 * screens. Phase 3 uses only the existing read APIs.
 */
export interface CanteenRequest {
  buildingId: string;
  name: string;
  description?: string;
  floor?: number | null;
  seatingCapacity?: number | null;
  openingTime?: string | null;
  closingTime?: string | null;
  contactNumber?: string | null;
  imageUrl?: string | null;
  active?: boolean;
}
