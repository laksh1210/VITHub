import { ShuttleResponse } from '@/types/shuttle';
import { ShuttleLocationResponse } from '@/types/shuttle-location';
import { CAMPUS_SHUTTLE_ROUTE } from '@/data/campusRoutes';

export const MOCK_SHUTTLES: ShuttleResponse[] = [
  {
    id: "shuttle-1",
    shuttleNumber: "SH-01",
    shuttleName: "Campus Loop A",
    driverName: "John Smith",
    driverContact: "+1234567890",
    capacity: 40,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "shuttle-2",
    shuttleNumber: "SH-02",
    shuttleName: "Campus Loop B",
    driverName: "Sarah Connor",
    driverContact: "+0987654321",
    capacity: 40,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "shuttle-3",
    shuttleNumber: "SH-03",
    shuttleName: "Express Shuttle",
    driverName: "Mike Johnson",
    driverContact: "+1122334455",
    capacity: 20,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export function getMockShuttleLocations(): ShuttleLocationResponse[] {
  const now = Date.now();
  // 15 minutes for a full loop (much slower movement)
  const loopDurationMs = 15 * 60 * 1000;
  
  return MOCK_SHUTTLES.map((shuttle, index) => {
    // Spread them out evenly across the route
    const offset = index / MOCK_SHUTTLES.length;
    const progress = ((now / loopDurationMs) + offset) % 1;
    
    // Total segments in the route
    const numSegments = CAMPUS_SHUTTLE_ROUTE.length - 1;
    const exactSegmentPosition = progress * numSegments;
    const segmentIndex = Math.floor(exactSegmentPosition);
    const segmentProgress = exactSegmentPosition - segmentIndex;
    
    const startPoint = CAMPUS_SHUTTLE_ROUTE[segmentIndex];
    const endPoint = CAMPUS_SHUTTLE_ROUTE[segmentIndex + 1] || CAMPUS_SHUTTLE_ROUTE[0];
    
    // Interpolate latitude and longitude
    const lat = startPoint[0] + (endPoint[0] - startPoint[0]) * segmentProgress;
    const lng = startPoint[1] + (endPoint[1] - startPoint[1]) * segmentProgress;
    
    return {
      id: `loc-${shuttle.id}-${now}`,
      shuttleId: shuttle.id,
      shuttleNumber: shuttle.shuttleNumber,
      shuttleName: shuttle.shuttleName,
      latitude: lat,
      longitude: lng,
      speed: 35,
      direction: "FORWARD",
      currentStopName: segmentProgress < 0.1 ? "Approaching Stop" : "In Transit",
      lastUpdatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
}
