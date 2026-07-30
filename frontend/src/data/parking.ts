import { ParkingZone } from '../types/map';

export const MOCK_PARKING_ZONES: ParkingZone[] = [
  {
    id: 'p-ab1-north',
    name: 'AB-1 North Two-Wheeler Bay',
    type: 'STUDENT_TWO_WHEELER',
    totalSpots: 180,
    occupiedSpots: 142,
    latitude: 23.0782,
    longitude: 76.8508,
  },
  {
    id: 'p-ab1-faculty',
    name: 'AB-1 Covered Faculty Parking',
    type: 'FACULTY',
    totalSpots: 60,
    occupiedSpots: 45,
    latitude: 23.0776,
    longitude: 76.8519,
  },
  {
    id: 'p-main-visitor',
    name: 'Main Gate Visitor & Staff Parking',
    type: 'VISITOR',
    totalSpots: 100,
    occupiedSpots: 32,
    latitude: 23.0745,
    longitude: 76.8500,
  },
  {
    id: 'p-hostel-bay',
    name: 'Hostel Resident Parking Bay',
    type: 'STUDENT_FOUR_WHEELER',
    totalSpots: 80,
    occupiedSpots: 68,
    latitude: 23.0758,
    longitude: 76.8488,
  },
];
