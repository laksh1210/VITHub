'use client';

import React, { useState, useEffect } from 'react';
import { Marker, Popup, Polyline } from 'react-leaflet';
import { POI_ICONS } from '@/lib/leaflet-config';
import { ShuttleLocation } from '@/types/map';
import { Bus, Navigation, Gauge } from 'lucide-react';
import { CAMPUS_SHUTTLE_ROUTE } from '@/data/campusRoutes';

interface MockGPSShuttleProps {
  showShuttles: boolean;
  shuttles: ShuttleLocation[];
}

interface AnimatedShuttle extends ShuttleLocation {
  routeIndex: number;
}

export default function MockGPSShuttle({ showShuttles, shuttles }: MockGPSShuttleProps) {
  const [animatedShuttles, setAnimatedShuttles] = useState<AnimatedShuttle[]>([]);

  // Initialize shuttles onto the route
  useEffect(() => {
    if (!showShuttles || shuttles.length === 0) return;
    
    setAnimatedShuttles(current => {
      // If we already initialized them, don't reset (prevents jumping if API polls)
      if (current.length === shuttles.length) return current;

      return shuttles.map((shuttle, i) => {
        // Space them out evenly along the route
        const startIndex = Math.floor((i * CAMPUS_SHUTTLE_ROUTE.length) / shuttles.length);
        const [lat, lng] = CAMPUS_SHUTTLE_ROUTE[startIndex];
        return {
          ...shuttle,
          latitude: lat,
          longitude: lng,
          routeIndex: startIndex,
        };
      });
    });
  }, [showShuttles, shuttles]);

  // Animate movement along the route
  useEffect(() => {
    if (!showShuttles) return;

    const intervalId = setInterval(() => {
      setAnimatedShuttles((current) => 
        current.map(s => {
          const nextIndex = (s.routeIndex + 1) % CAMPUS_SHUTTLE_ROUTE.length;
          const [lat, lng] = CAMPUS_SHUTTLE_ROUTE[nextIndex];
          
          // Randomize speed slightly for a realistic live feel
          const newSpeed = Math.max(15, Math.min(45, s.speed + (Math.random() * 4 - 2)));
          
          return {
            ...s,
            latitude: lat,
            longitude: lng,
            routeIndex: nextIndex,
            speed: Math.round(newSpeed),
          };
        })
      );
    }, 1000); // Move every 1 second

    return () => clearInterval(intervalId);
  }, [showShuttles]);

  if (!showShuttles) return null;

  const displayShuttles = animatedShuttles.length > 0 ? animatedShuttles : shuttles;

  return (
    <>
      {/* Draw the shuttle route on the map */}
      <Polyline 
        positions={CAMPUS_SHUTTLE_ROUTE} 
        color="#34d399" 
        weight={3} 
        opacity={0.5} 
        dashArray="10, 10" 
      />

      {displayShuttles.map((shuttle) => {
        return (
          <Marker key={shuttle.id} position={[shuttle.latitude, shuttle.longitude]} icon={POI_ICONS.SHUTTLE}>
            <Popup>
              <div className="p-1 min-w-48">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1">
                  <Bus className="w-4 h-4 animate-bounce" />
                  {shuttle.shuttleName}
                </div>
                <div className="text-[10px] text-[#A1A1AA] font-mono mb-2">{shuttle.vehicleNumber}</div>

                <div className="space-y-1 text-[11px] bg-[#09090B] p-2 rounded-lg border border-[#27272A] mb-2">
                  <div className="flex items-center justify-between text-[#A1A1AA]">
                    <span className="flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-emerald-400" />
                      Speed:
                    </span>
                    <span className="text-white font-mono">{shuttle.speed} km/h</span>
                  </div>
                  <div className="flex items-center justify-between text-[#A1A1AA]">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-[#6C63FF]" />
                      Next Stop:
                    </span>
                    <span className="text-emerald-400 font-semibold">{shuttle.nextStop}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
