'use client';

import React from 'react';
import { Layers, Building2, Landmark, Car, ShieldAlert, Bus, Focus } from 'lucide-react';

export interface MapLayerState {
  buildings: boolean;
  landmarks: boolean;
  parking: boolean;
  emergency: boolean;
  shuttles: boolean;
}

interface MapControlsProps {
  layers: MapLayerState;
  onToggleLayer: (layerKey: keyof MapLayerState) => void;
  onResetCenter: () => void;
}

export default function MapControls({ layers, onToggleLayer, onResetCenter }: MapControlsProps) {
  return (
    <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
      {/* Reset Center Button */}
      <button
        onClick={onResetCenter}
        title="Reset Map to VIT Bhopal Center"
        className="p-2.5 rounded-xl glass-panel text-white hover:text-[#6C63FF] border border-[#27272A] shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-xs font-semibold"
      >
        <Focus className="w-4 h-4 text-[#6C63FF]" />
        <span className="hidden sm:inline">Center Campus</span>
      </button>

      {/* Layer Toggle Box */}
      <div className="glass-panel p-2 rounded-xl border border-[#27272A] shadow-2xl flex flex-col gap-1 w-44">
        <div className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA] border-b border-[#27272A] mb-1">
          <Layers className="w-3 h-3 text-[#6C63FF]" />
          <span>Map Layers</span>
        </div>

        <button
          onClick={() => onToggleLayer('buildings')}
          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            layers.buildings ? 'bg-[#6C63FF]/20 text-white border border-[#6C63FF]/40' : 'text-[#A1A1AA] hover:bg-[#27272A]'
          }`}
        >
          <span className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-[#6C63FF]" />
            Buildings
          </span>
          <span className={`w-2 h-2 rounded-full ${layers.buildings ? 'bg-[#6C63FF]' : 'bg-[#27272A]'}`}></span>
        </button>

        <button
          onClick={() => onToggleLayer('landmarks')}
          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            layers.landmarks ? 'bg-purple-500/20 text-white border border-purple-500/40' : 'text-[#A1A1AA] hover:bg-[#27272A]'
          }`}
        >
          <span className="flex items-center gap-2">
            <Landmark className="w-3.5 h-3.5 text-purple-400" />
            Landmarks
          </span>
          <span className={`w-2 h-2 rounded-full ${layers.landmarks ? 'bg-purple-400' : 'bg-[#27272A]'}`}></span>
        </button>

        <button
          onClick={() => onToggleLayer('parking')}
          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            layers.parking ? 'bg-blue-500/20 text-white border border-blue-500/40' : 'text-[#A1A1AA] hover:bg-[#27272A]'
          }`}
        >
          <span className="flex items-center gap-2">
            <Car className="w-3.5 h-3.5 text-blue-400" />
            Parking
          </span>
          <span className={`w-2 h-2 rounded-full ${layers.parking ? 'bg-blue-400' : 'bg-[#27272A]'}`}></span>
        </button>

        <button
          onClick={() => onToggleLayer('emergency')}
          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            layers.emergency ? 'bg-rose-500/20 text-white border border-rose-500/40' : 'text-[#A1A1AA] hover:bg-[#27272A]'
          }`}
        >
          <span className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            Emergency
          </span>
          <span className={`w-2 h-2 rounded-full ${layers.emergency ? 'bg-rose-400' : 'bg-[#27272A]'}`}></span>
        </button>

        <button
          onClick={() => onToggleLayer('shuttles')}
          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            layers.shuttles ? 'bg-emerald-500/20 text-white border border-emerald-500/40' : 'text-[#A1A1AA] hover:bg-[#27272A]'
          }`}
        >
          <span className="flex items-center gap-2">
            <Bus className="w-3.5 h-3.5 text-emerald-400" />
            Live Shuttles
          </span>
          <span className={`w-2 h-2 rounded-full ${layers.shuttles ? 'bg-emerald-400 animate-pulse' : 'bg-[#27272A]'}`}></span>
        </button>
      </div>
    </div>
  );
}
