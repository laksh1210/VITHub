'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import CampusMap with SSR disabled for Leaflet window object safety
const CampusMap = dynamic(() => import('@/components/map/CampusMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-65px)] bg-[#09090B] flex flex-col items-center justify-center text-center p-6 rounded-lg border border-border">
      <div className="w-12 h-12 rounded-2xl bg-[#6C63FF]/20 border border-[#6C63FF]/30 flex items-center justify-center text-[#6C63FF] animate-pulse mb-4">
        <span className="text-xl">🗺️</span>
      </div>
      <p className="text-xs font-semibold text-white">Initializing OpenStreetMap Engine...</p>
      <p className="text-[10px] text-[#A1A1AA] mt-1">Rendering VIT Bhopal Digital Twin Campus Map</p>
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="w-full h-full relative -m-6 h-[calc(100vh-64px)] overflow-hidden">
      <CampusMap />
    </div>
  );
}
