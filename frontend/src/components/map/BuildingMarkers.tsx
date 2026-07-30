'use client';

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Building } from '@/types/map';
import { BUILDING_ICONS } from '@/lib/leaflet-config';
import { Building2, Layers, MapPin, Navigation } from 'lucide-react';

interface BuildingMarkersProps {
  buildings: Building[];
  onSelectBuilding?: (building: Building) => void;
}

export default function BuildingMarkers({ buildings, onSelectBuilding }: BuildingMarkersProps) {
  return (
    <>
      {buildings.map((building) => {
        const icon = BUILDING_ICONS[building.category] || BUILDING_ICONS.OTHER;

        return (
          <Marker
            key={building.id}
            position={[building.latitude, building.longitude]}
            icon={icon}
            eventHandlers={{
              click: () => {
                if (onSelectBuilding) onSelectBuilding(building);
              },
            }}
          >
            <Popup>
              <div className="p-1 min-w-52">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white leading-tight">{building.name}</h3>
                    <span className="text-[10px] font-mono text-[#A78BFA]">{building.code}</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#A1A1AA] mb-3 leading-snug">{building.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-[#27272A] text-[10px] text-[#A1A1AA]">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#6C63FF]" />
                    {building.totalFloors} Floors
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <MapPin className="w-3 h-3" />
                    Active Facility
                  </span>
                </div>

                {onSelectBuilding && (
                  <button
                    onClick={() => onSelectBuilding(building)}
                    className="w-full mt-3 py-1.5 rounded-lg bg-[#6C63FF] text-white text-xs font-semibold hover:bg-[#5b52e0] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-3 h-3" />
                    Set as Navigation Target
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
