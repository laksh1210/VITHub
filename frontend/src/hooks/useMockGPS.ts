import { useState, useEffect } from 'react';
import { CAMPUS_SHUTTLE_ROUTE } from '@/data/campusRoutes';

export function useMockGPS(speedMultiplier = 1) {
  const [routeIndex, setRouteIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          setRouteIndex((idx) => (idx + 1) % (CAMPUS_SHUTTLE_ROUTE.length - 1));
          return 0;
        }
        return prev + 0.05 * speedMultiplier;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [speedMultiplier]);

  const p1 = CAMPUS_SHUTTLE_ROUTE[routeIndex];
  const p2 = CAMPUS_SHUTTLE_ROUTE[(routeIndex + 1) % CAMPUS_SHUTTLE_ROUTE.length];

  const currentLat = p1[0] + (p2[0] - p1[0]) * progress;
  const currentLng = p1[1] + (p2[1] - p1[1]) * progress;

  return {
    latitude: currentLat,
    longitude: currentLng,
    currentWaypoint: routeIndex,
  };
}
