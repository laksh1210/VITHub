export type BuildingCategory = 'ACADEMIC' | 'HOSTEL' | 'LIBRARY' | 'CANTEEN' | 'ADMINISTRATIVE' | 'SPORTS' | 'OTHER';

export interface Building {
  id: string;
  name: string;
  code: string;
  description: string;
  category: BuildingCategory;
  latitude: number;
  longitude: number;
  totalFloors: number;
  address: string;
  imageUrl?: string;
  active: boolean;
}

export interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  capacity: number;
  type: string;
  buildingId: string;
  buildingName?: string;
}

export interface Landmark {
  id: string;
  name: string;
  category: 'CULTURE' | 'FOOD' | 'RECREATION' | 'ACADEMIC_HUB' | 'OTHER';
  description: string;
  latitude: number;
  longitude: number;
  iconName: string;
}

export interface ParkingZone {
  id: string;
  name: string;
  type: 'FACULTY' | 'STUDENT_TWO_WHEELER' | 'STUDENT_FOUR_WHEELER' | 'VISITOR';
  totalSpots: number;
  occupiedSpots: number;
  latitude: number;
  longitude: number;
}

export interface EmergencyLocation {
  id: string;
  name: string;
  type: 'SECURITY_BOOTH' | 'HEALTH_CENTER' | 'FIRE_STATION' | 'ASSEMBLY_POINT';
  contactPhone: string;
  latitude: number;
  longitude: number;
}

export interface ShuttleLocation {
  id: string;
  shuttleId: string;
  shuttleName: string;
  vehicleNumber: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  nextStop: string;
  timestamp: string;
}

export interface NavigationPoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'BUILDING' | 'ROOM' | 'LANDMARK' | 'PARKING' | 'EMERGENCY';
}

export interface NavigationRoute {
  origin: NavigationPoint;
  destination: NavigationPoint;
  waypoints: [number, number][];
  distanceMeters: number;
  estimatedMinutes: number;
}
