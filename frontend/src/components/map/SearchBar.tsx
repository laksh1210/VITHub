'use client';

import React, { useState } from 'react';
import { Search, Building2, DoorClosed, Navigation } from 'lucide-react';
import { Building, Room } from '@/types/map';

interface SearchBarProps {
  buildings: Building[];
  rooms: Room[];
  onSelectBuilding: (building: Building) => void;
  onSelectRoom: (room: Room) => void;
}

export default function SearchBar({ buildings, rooms, onSelectBuilding, onSelectRoom }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredBuildings = buildings.filter(
    (b) => b.name.toLowerCase().includes(query.toLowerCase()) || b.code.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRooms = rooms.filter(
    (r) => r.roomNumber.toLowerCase().includes(query.toLowerCase()) || r.type.toLowerCase().includes(query.toLowerCase())
  );

  const hasResults = filteredBuildings.length > 0 || filteredRooms.length > 0;

  return (
    <div className="absolute top-4 left-4 z-[400] w-72 sm:w-80 md:w-96">
      <div className="relative">
        <div className="glass-panel rounded-2xl border border-[#27272A] shadow-2xl flex items-center px-3.5 py-2.5 gap-2.5 focus-within:border-[#6C63FF] transition-all">
          <Search className="w-4 h-4 text-[#A1A1AA]" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search buildings (AB-1, Library) or rooms (Lab 304)..."
            className="bg-transparent border-none outline-none text-xs text-white placeholder-[#A1A1AA] w-full"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="text-[10px] bg-[#27272A] text-[#A1A1AA] hover:text-white px-1.5 py-0.5 rounded-md"
            >
              ESC
            </button>
          )}
        </div>

        {/* Dropdown Results */}
        {isOpen && query && (
          <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-2xl border border-[#27272A] p-2 max-h-72 overflow-y-auto shadow-2xl z-50">
            {!hasResults && (
              <div className="p-4 text-center text-xs text-[#A1A1AA]">No matching campus buildings or rooms found.</div>
            )}

            {filteredBuildings.length > 0 && (
              <div className="mb-2">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#6C63FF] flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  Buildings
                </div>
                {filteredBuildings.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      onSelectBuilding(b);
                      setIsOpen(false);
                      setQuery(b.name);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-[#27272A] flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-white">{b.name}</div>
                      <div className="text-[10px] text-[#A1A1AA]">{b.code} · {b.totalFloors} Floors</div>
                    </div>
                    <Navigation className="w-3.5 h-3.5 text-[#6C63FF]" />
                  </button>
                ))}
              </div>
            )}

            {filteredRooms.length > 0 && (
              <div>
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1 border-t border-[#27272A] pt-2">
                  <DoorClosed className="w-3 h-3" />
                  Classrooms & Labs
                </div>
                {filteredRooms.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onSelectRoom(r);
                      setIsOpen(false);
                      setQuery(`${r.roomNumber} (${r.buildingName})`);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-[#27272A] flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-white">{r.roomNumber}</div>
                      <div className="text-[10px] text-[#A1A1AA]">Floor {r.floor} · {r.type}</div>
                    </div>
                    <Navigation className="w-3.5 h-3.5 text-purple-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
