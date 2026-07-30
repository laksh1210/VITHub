'use client';

import React, { useState } from 'react';
import { Settings, Map, Bell, Check } from 'lucide-react';

export default function SettingsPage() {
  const [mapTheme, setMapTheme] = useState('DARK');
  const [showParking, setShowParking] = useState(true);
  const [showEmergency, setShowEmergency] = useState(true);
  const [enableAlerts, setEnableAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl w-full mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF] border border-[#6C63FF]/30">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Preferences & Settings</h1>
          <p className="text-xs text-muted-foreground">Configure map layers, themes, and alert defaults.</p>
        </div>
      </div>

      {/* Settings Form Card */}
      <div className="glass-panel p-6 rounded-3xl border border-border space-y-6">
        
        {/* Map Preferences Section */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#6C63FF] mb-3 flex items-center gap-2">
            <Map className="w-4 h-4" />
            Default Map View & Layers
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border">
              <div>
                <div className="text-xs font-semibold text-foreground">Default Map Style</div>
                <div className="text-[10px] text-muted-foreground">Select tile theme for OpenStreetMap rendering.</div>
              </div>
              <select
                value={mapTheme}
                onChange={(e) => setMapTheme(e.target.value)}
                className="bg-muted border border-border text-xs text-foreground rounded-xl px-3 py-1.5 outline-none focus:border-[#6C63FF]"
              >
                <option value="DARK">VITHub Dark Mode</option>
                <option value="STANDARD">Standard OSM</option>
                <option value="SATELLITE">High Contrast</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border">
              <div>
                <div className="text-xs font-semibold text-foreground">Show Parking Overlay by Default</div>
                <div className="text-[10px] text-muted-foreground">Always render campus parking availability badges.</div>
              </div>
              <input
                type="checkbox"
                checked={showParking}
                onChange={(e) => setShowParking(e.target.checked)}
                className="w-4 h-4 accent-[#6C63FF] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border">
              <div>
                <div className="text-xs font-semibold text-foreground">Show Emergency Locations Overlay</div>
                <div className="text-[10px] text-muted-foreground">Keep security and medical hotlines visible on map.</div>
              </div>
              <input
                type="checkbox"
                checked={showEmergency}
                onChange={(e) => setShowEmergency(e.target.checked)}
                className="w-4 h-4 accent-[#6C63FF] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border"></div>

        {/* Notifications & System Section */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications & Alerts
          </h2>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border">
            <div>
              <div className="text-xs font-semibold text-foreground">Shuttle & Event Broadcast Push Notifications</div>
              <div className="text-[10px] text-muted-foreground">Receive instant alerts when shuttles approach your stop.</div>
            </div>
            <input
              type="checkbox"
              checked={enableAlerts}
              onChange={(e) => setEnableAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#6C63FF] rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">Preferences persist locally across sessions.</span>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#6C63FF] hover:bg-[#5b52e0] text-white text-xs font-bold transition-all shadow-lg shadow-[#6C63FF]/30 flex items-center gap-2"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                Saved!
              </>
            ) : (
              'Save Preferences'
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
