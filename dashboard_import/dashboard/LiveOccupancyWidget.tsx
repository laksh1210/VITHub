'use client';

import React from 'react';
import { useOccupancyAnalytics, useRoomOccupancies } from '@/hooks/useDashboard';
import WidgetSkeleton from './WidgetSkeleton';
import WidgetError from './WidgetError';
import WidgetEmpty from './WidgetEmpty';
import { Users, CheckCircle, AlertCircle, Flame, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LiveOccupancyWidget() {
  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError: analyticsError,
    refetch: refetchAnalytics,
  } = useOccupancyAnalytics();

  const {
    data: rooms,
    isLoading: roomsLoading,
    isError: roomsError,
    refetch: refetchRooms,
  } = useRoomOccupancies();

  const isLoading = analyticsLoading || roomsLoading;
  const isError = analyticsError || roomsError;

  if (isLoading) {
    return <WidgetSkeleton height="h-72" />;
  }

  if (isError) {
    return (
      <WidgetError
        title="Failed to load occupancy telemetry"
        message="Unable to fetch classroom occupancy status from backend API."
        onRetry={() => {
          refetchAnalytics();
          refetchRooms();
        }}
      />
    );
  }

  if (!analytics && (!rooms || rooms.length === 0)) {
    return <WidgetEmpty title="No Occupancy Data" message="No classroom occupancy readings recorded." />;
  }

  const occupancyRate = analytics?.occupancyRate ?? 0;

  const statusBadges = [
    { label: 'Available', count: analytics?.availableStatusCount ?? 0, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle },
    { label: 'Moderate', count: analytics?.moderateStatusCount ?? 0, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', icon: AlertCircle },
    { label: 'Crowded', count: analytics?.crowdedStatusCount ?? 0, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', icon: Flame },
    { label: 'Full', count: analytics?.fullStatusCount ?? 0, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', icon: ShieldAlert },
  ];

  return (
    <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Classroom Occupancy</h3>
            <p className="text-xs text-[#A1A1AA]">Real-time room availability & density metrics</p>
          </div>
        </div>

        {/* Global Occupancy Percentage Badge */}
        <div className="text-right">
          <span className="text-2xl font-black text-white">{occupancyRate.toFixed(1)}%</span>
          <span className="block text-[10px] text-[#A1A1AA]">Campus Avg Density</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-[#A1A1AA]">
          <span>Overall Capacity Utilized</span>
          <span>{analytics?.occupiedRooms} / {analytics?.totalRooms} Rooms</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-[#27272A] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(occupancyRate, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              occupancyRate > 80
                ? 'bg-rose-500'
                : occupancyRate > 50
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
          />
        </div>
      </div>

      {/* Status Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statusBadges.map((status) => {
          const Icon = status.icon;
          return (
            <div key={status.label} className={`p-3 rounded-xl border ${status.bg} flex items-center gap-2.5`}>
              <Icon className={`w-4 h-4 ${status.color}`} />
              <div>
                <span className="text-xs font-bold text-white block">{status.count}</span>
                <span className="text-[10px] text-[#A1A1AA]">{status.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Room Occupancy Sample List */}
      {rooms && rooms.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-[#27272A]">
          <h4 className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
            Active Classroom Status
          </h4>
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {rooms.slice(0, 4).map((room) => (
              <div
                key={room.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#09090B] border border-[#27272A] text-xs"
              >
                <div>
                  <span className="font-semibold text-white">{room.roomName || room.roomNumber}</span>
                  <span className="text-[10px] text-[#71717A] ml-2">({room.buildingName})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#A1A1AA]">
                    {room.currentCount} / {room.capacity}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                      room.status === 'AVAILABLE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : room.status === 'CROWDED' || room.status === 'FULL'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
