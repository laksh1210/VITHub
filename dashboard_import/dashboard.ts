export interface DashboardSummary {
  totalBuildings: number;
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  totalLibrarySeats: number;
  availableLibrarySeats: number;
  occupiedLibrarySeats: number;
  activeCanteens: number;
  averageCanteenQueue: number;
  activeShuttles: number;
  openMaintenanceRequests: number;
  upcomingEvents: number;
  unreadNotifications: number;
}

export interface OccupancyAnalytics {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  occupancyRate: number;
  availableStatusCount: number;
  moderateStatusCount: number;
  crowdedStatusCount: number;
  fullStatusCount: number;
}

export interface LibraryAnalytics {
  totalLibraries: number;
  totalSeats: number;
  availableSeats: number;
  occupiedSeats: number;
  reservedSeats: number;
  outOfServiceSeats: number;
  occupancyRate: number;
}

export interface CanteenAnalytics {
  totalCanteens: number;
  activeCanteens: number;
  averageQueueLength: number;
  averageEstimatedWaitMinutes: number;
}

export interface ShuttleAnalytics {
  totalShuttles: number;
  activeShuttles: number;
  inactiveShuttles: number;
  maintenanceShuttles: number;
}

export interface MaintenanceAnalytics {
  totalRequests: number;
  openRequests: number;
  inProgressRequests: number;
  resolvedRequests: number;
  closedRequests: number;
  lowPriorityRequests: number;
  mediumPriorityRequests: number;
  highPriorityRequests: number;
  criticalPriorityRequests: number;
}

export interface EventsAnalytics {
  totalEvents: number;
  upcomingEvents: number;
  ongoingEvents: number;
  completedEvents: number;
  cancelledEvents: number;
}

export interface AnalyticsOverview {
  totalBuildings: number;
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  totalUsers: number;
  totalLibraries: number;
  totalLibrarySeats: number;
  availableLibrarySeats: number;
  totalCanteens: number;
  averageQueueLength: number;
  activeShuttles: number;
  openMaintenanceRequests: number;
  upcomingEvents: number;
  totalNotifications: number;
}

export type OccupancyStatus = 'AVAILABLE' | 'MODERATE' | 'CROWDED' | 'FULL';

export interface RoomOccupancy {
  id: string;
  roomId: string;
  roomNumber: string;
  roomName: string;
  buildingId: string;
  buildingName: string;
  buildingCode: string;
  capacity: number;
  currentCount: number;
  availableCapacity: number;
  occupancyPercentage: number;
  status: OccupancyStatus;
  recordedAt: string;
}

export interface CanteenQueue {
  id: string;
  canteenId: string;
  canteenName: string;
  buildingId: string;
  buildingName: string;
  buildingCode: string;
  queueCount: number;
  estimatedWaitMinutes: number;
  status: string;
  recordedAt: string;
}

export interface ShuttleLocation {
  id: string;
  shuttleId: string;
  shuttleNumber: string;
  shuttleName: string;
  latitude: number;
  longitude: number;
  speed: number;
  direction: string;
  currentStopName: string;
  lastUpdatedAt: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  eventType: string;
  organizer: string;
  startDateTime: string;
  endDateTime: string;
  venue: string;
  buildingId?: string;
  buildingName?: string;
  capacity?: number;
  registrationRequired: boolean;
  status: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  status: string;
  createdAt: string;
  readAt?: string;
}
