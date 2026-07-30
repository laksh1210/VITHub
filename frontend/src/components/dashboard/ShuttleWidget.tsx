'use client';

import React from 'react';
import { useShuttleAnalytics, useShuttleLocations } from '@/hooks/api/use-dashboard';
import WidgetSkeleton from './WidgetSkeleton';
import WidgetError from './WidgetError';
import WidgetEmpty from './WidgetEmpty';
import { Bus, MapPin, Gauge } from 'lucide-react';

export default function ShuttleWidget() {
  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError: analyticsError,
    refetch: refetchAnalytics,
  } = useShuttleAnalytics();

  const {
    data: locations,
    isLoading: locationsLoading,
    isError: locationsError,
    refetch: refetchLocations,
  } = useShuttleLocations();

  const isLoading = analyticsLoading || locationsLoading;
  const isError = analyticsError || locationsError;

  if (isLoading) {
    return <WidgetSkeleton height="h-72" />;
  }

  if (isError) {
    return (
      <WidgetError
        title="Failed to load shuttle telemetry"
        message="Unable to fetch active shuttle locations and fleet metrics from API."
        onRetry={() => {
          refetchAnalytics();
          refetchLocations();
        }}
      />
    );
  }

  if (!analytics && (!locations || locations.length === 0)) {
    return <WidgetEmpty title="No Active Shuttles" message="No campus shuttles currently operating." />;
  }

  return (
    <div className="p-6 rounded-2xl bg-card border border-border space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground tracking-tight">Shuttle Fleet Tracking</h3>
            <p className="text-xs text-muted-foreground">Live campus transit telemetry & stop ETAs</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-emerald-400">{analytics?.activeShuttles ?? 0}</span>
          <span className="block text-[10px] text-muted-foreground">Active Shuttles</span>
        </div>
      </div>

      {/* Shuttle Fleet Status Pills */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-xs font-bold text-emerald-400 block">{analytics?.activeShuttles ?? 0}</span>
          <span className="text-[10px] text-muted-foreground">Operating</span>
        </div>
        <div className="p-2.5 rounded-xl bg-background border border-border">
          <span className="text-xs font-bold text-foreground block">{analytics?.inactiveShuttles ?? 0}</span>
          <span className="text-[10px] text-muted-foreground">Inactive</span>
        </div>
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
          <span className="text-xs font-bold text-rose-400 block">{analytics?.maintenanceShuttles ?? 0}</span>
          <span className="text-[10px] text-muted-foreground">Maintenance</span>
        </div>
      </div>

      {/* Shuttle Live Locations List */}
      {locations && locations.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-border">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Live Shuttle Movement
          </h4>
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {locations.slice(0, 4).map((shuttle) => (
              <div
                key={shuttle.id}
                className="flex items-center justify-between p-3 rounded-xl bg-background border border-border text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{shuttle.shuttleName || shuttle.shuttleNumber}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                      {shuttle.shuttleNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span>Next Stop: {shuttle.currentStopName || 'Academic Block'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 font-bold">
                    <Gauge className="w-3 h-3" />
                    <span>{shuttle.speed ? `${shuttle.speed.toFixed(0)} km/h` : 'En Route'}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground block">{shuttle.direction || 'In Transit'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
