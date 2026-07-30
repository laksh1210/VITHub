'use client';

import React from 'react';
import { Polyline } from 'react-leaflet';
import { CAMPUS_SHUTTLE_ROUTE, MOCK_NAVIGATION_PATHS } from '@/data/campusRoutes';
import { Navigation, Footprints, Clock, X } from 'lucide-react';
import { Building } from '@/types/map';

interface NavigationOverlayProps {
  targetBuilding: Building | null;
  onClearNavigation: () => void;
}

export default function NavigationOverlay({ targetBuilding, onClearNavigation }: NavigationOverlayProps) {
  if (!targetBuilding) return null;

  // Find routing path
  const routePoints: [number, number][] = MOCK_NAVIGATION_PATHS['AB1-LIB'] || CAMPUS_SHUTTLE_ROUTE.slice(0, 4);

  return (
    <>
      {/* Route Polyline on Map */}
      <Polyline
        positions={routePoints}
        pathOptions={{
          color: '#6C63FF',
          weight: 5,
          dashArray: '8, 8',
          opacity: 0.9,
        }}
      />

      {/* Floating Navigation Guidance Card */}
      <div className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-[400] max-w-sm glass-panel p-4 rounded-2xl border border-[#6C63FF]/40 shadow-2xl animate-in slide-in-from-bottom-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Navigation className="w-4 h-4 text-[#6C63FF]" />
            Navigating to {targetBuilding.name}
          </div>
          <button
            onClick={onClearNavigation}
            className="p-1 rounded-lg hover:bg-[#27272A] text-[#A1A1AA] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-[#A1A1AA] mb-3">
          Follow illuminated campus walkway path towards <span className="text-white font-mono">{targetBuilding.code}</span>.
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-xl bg-[#09090B] border border-[#27272A] flex items-center gap-2">
            <Footprints className="w-4 h-4 text-[#6C63FF]" />
            <div>
              <div className="text-[10px] text-[#A1A1AA]">Distance</div>
              <div className="font-bold text-white">320 meters</div>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-[#09090B] border border-[#27272A] flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] text-[#A1A1AA]">Est. Walk Time</div>
              <div className="font-bold text-white">4 mins</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
