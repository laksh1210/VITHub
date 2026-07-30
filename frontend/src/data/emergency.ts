import { EmergencyLocation } from '../types/map';

export const MOCK_EMERGENCY_LOCATIONS: EmergencyLocation[] = [
  {
    id: 'e-main-security',
    name: 'Main Gate Security Control Desk',
    type: 'SECURITY_BOOTH',
    contactPhone: '+91 7556 123 999',
    latitude: 23.0742,
    longitude: 76.8502,
  },
  {
    id: 'e-health-center',
    name: 'Campus Health Center & 24/7 Ambulance Bay',
    type: 'HEALTH_CENTER',
    contactPhone: '+91 7556 123 911',
    latitude: 23.0765,
    longitude: 76.8500,
  },
  {
    id: 'e-ab1-security',
    name: 'AB-1 Ground Security Post',
    type: 'SECURITY_BOOTH',
    contactPhone: '+91 7556 123 902',
    latitude: 23.0779,
    longitude: 76.8510,
  },
  {
    id: 'e-assembly-ground',
    name: 'Primary Emergency Assembly Lawn',
    type: 'ASSEMBLY_POINT',
    contactPhone: '+91 7556 123 900',
    latitude: 23.0770,
    longitude: 76.8515,
  },
];
