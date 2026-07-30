'use client';

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { POI_ICONS } from '@/lib/leaflet-config';
import { Landmark, ParkingZone, EmergencyLocation } from '@/types/map';
import { Car, ShieldAlert, PhoneCall, Sparkles } from 'lucide-react';

interface POILayersProps {
  showLandmarks: boolean;
  showParking: boolean;
  showEmergency: boolean;
  landmarks: Landmark[];
  parkingZones: ParkingZone[];
  emergencyLocations: EmergencyLocation[];
}

export default function POILayers({
  showLandmarks,
  showParking,
  showEmergency,
  landmarks,
  parkingZones,
  emergencyLocations,
}: POILayersProps) {
  return (
    <>
      {/* Landmarks Layer */}
      {showLandmarks &&
        landmarks.map((lm) => (
          <Marker key={lm.id} position={[lm.latitude, lm.longitude]} icon={POI_ICONS.LANDMARK}>
            <Popup>
              <div className="p-1 min-w-44">
                <div className="flex items-center gap-1.5 text-purple-400 font-bold text-xs mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {lm.name}
                </div>
                <div className="text-[10px] text-purple-300 font-mono mb-1.5">{lm.category}</div>
                <p className="text-[11px] text-[#A1A1AA]">{lm.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}

      {/* Parking Layer */}
      {showParking &&
        parkingZones.map((pz) => {
          const available = pz.totalSpots - pz.occupiedSpots;
          const isFull = available <= 5;

          return (
            <Marker key={pz.id} position={[pz.latitude, pz.longitude]} icon={POI_ICONS.PARKING}>
              <Popup>
                <div className="p-1 min-w-48">
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs mb-1">
                    <Car className="w-3.5 h-3.5" />
                    {pz.name}
                  </div>
                  <div className="text-[10px] text-[#A1A1AA] mb-2">{pz.type.replace(/_/g, ' ')}</div>

                  <div className="p-2 rounded-lg bg-[#09090B] border border-[#27272A] flex items-center justify-between text-xs mb-1">
                    <span className="text-[#A1A1AA]">Spots Available:</span>
                    <span className={`font-bold ${isFull ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {available} / {pz.totalSpots}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

      {/* Emergency Layer */}
      {showEmergency &&
        emergencyLocations.map((em) => (
          <Marker key={em.id} position={[em.latitude, em.longitude]} icon={POI_ICONS.EMERGENCY}>
            <Popup>
              <div className="p-1 min-w-52">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs mb-1">
                  <ShieldAlert className="w-4 h-4 animate-pulse" />
                  {em.name}
                </div>
                <div className="text-[10px] text-rose-300 font-mono mb-2">{em.type.replace(/_/g, ' ')}</div>

                <a
                  href={`tel:${em.contactPhone}`}
                  className="w-full py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-rose-600/30"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Call Hotline: {em.contactPhone}
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
}
