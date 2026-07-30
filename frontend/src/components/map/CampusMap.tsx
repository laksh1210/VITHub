'use client';

import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import '@/app/leaflet.css';
import BuildingMarkers from './BuildingMarkers';
import POILayers from './POILayers';
import MockGPSShuttle from './MockGPSShuttle';
import MapControls, { MapLayerState } from './MapControls';
import SearchBar from './SearchBar';
import NavigationOverlay from './NavigationOverlay';
import { useBuildings } from '@/hooks/api/use-buildings';
import { useRooms } from '@/hooks/api/use-rooms';
import { useAllCurrentShuttleLocations } from '@/hooks/api/use-shuttle-locations';
import { MOCK_LANDMARKS } from '@/data/landmarks';
import { MOCK_PARKING_ZONES } from '@/data/parking';
import { MOCK_EMERGENCY_LOCATIONS } from '@/data/emergency';
import { Building, Room, ShuttleLocation } from '@/types/map';

const VIT_BHOPAL_CENTER: [number, number] = [23.0775, 76.8513];
const DEFAULT_ZOOM = 16;

function MapRecenter({ center }: { center: [number, number] }) {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, 17, { duration: 1.5 });
  }, [center, map]);
  return null;
}

export default function CampusMap() {
  const { data: rawBuildings = [] } = useBuildings();
  const { data: rawRooms = [] } = useRooms();
  const { data: rawLocations = [] } = useAllCurrentShuttleLocations();

  const buildings = (rawBuildings || []).filter(b => b.latitude !== null && b.longitude !== null) as unknown as Building[];
  const rooms = (rawRooms || []) as unknown as Room[];
  const shuttles: ShuttleLocation[] = (rawLocations || []).map(loc => ({
    id: loc.shuttleId,
    shuttleName: loc.shuttleName,
    vehicleNumber: loc.shuttleNumber,
    latitude: loc.latitude,
    longitude: loc.longitude,
    speed: loc.speed,
    nextStop: loc.currentStopName || 'Unknown',
  }));

  const [center, setCenter] = useState<[number, number]>(VIT_BHOPAL_CENTER);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  const [layers, setLayers] = useState<MapLayerState>({
    buildings: true,
    landmarks: true,
    parking: true,
    emergency: true,
    shuttles: true,
  });

  const handleToggleLayer = (key: keyof MapLayerState) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectBuilding = (building: Building) => {
    setSelectedBuilding(building);
    setCenter([building.latitude, building.longitude]);
  };

  const handleSelectRoom = (room: Room) => {
    const parentBuilding = buildings.find((b) => b.id === room.buildingId);
    if (parentBuilding) {
      handleSelectBuilding(parentBuilding);
    }
  };

  const handleResetCenter = () => {
    setCenter(VIT_BHOPAL_CENTER);
    setSelectedBuilding(null);
  };

  return (
    <div className="relative w-full h-[calc(100vh-65px)] overflow-hidden">
      {/* Search Bar Overlay */}
      <SearchBar
        buildings={buildings}
        rooms={rooms}
        onSelectBuilding={handleSelectBuilding}
        onSelectRoom={handleSelectRoom}
      />

      {/* Map Controls */}
      <MapControls
        layers={layers}
        onToggleLayer={handleToggleLayer}
        onResetCenter={handleResetCenter}
      />

      {/* React Leaflet Map Container */}
      <MapContainer
        center={VIT_BHOPAL_CENTER}
        zoom={DEFAULT_ZOOM}
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <MapRecenter center={center} />

        {/* Dark Mode OpenStreetMap Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Building Markers */}
        {layers.buildings && (
          <BuildingMarkers buildings={buildings} onSelectBuilding={handleSelectBuilding} />
        )}

        {/* POI Layers */}
        <POILayers
          showLandmarks={layers.landmarks}
          showParking={layers.parking}
          showEmergency={layers.emergency}
          landmarks={MOCK_LANDMARKS}
          parkingZones={MOCK_PARKING_ZONES}
          emergencyLocations={MOCK_EMERGENCY_LOCATIONS}
        />

        {/* Live Shuttle Layer */}
        <MockGPSShuttle showShuttles={layers.shuttles} shuttles={shuttles} />

        {/* Navigation Polyline Overlay */}
        <NavigationOverlay targetBuilding={selectedBuilding} onClearNavigation={() => setSelectedBuilding(null)} />
      </MapContainer>
    </div>
  );
}
