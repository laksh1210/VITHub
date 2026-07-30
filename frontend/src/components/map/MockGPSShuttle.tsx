'use client';

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { POI_ICONS } from '@/lib/leaflet-config';
import { ShuttleLocation } from '@/types/map';
import { Bus, Navigation, Gauge } from 'lucide-react';

interface MockGPSShuttleProps {
  showShuttles: boolean;
  shuttles: ShuttleLocation[];
}

export default function MockGPSShuttle({ showShuttles, shuttles }: MockGPSShuttleProps) {
  if (!showShuttles) return null;

  return (
    <>
      {shuttles.map((shuttle) => {
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
