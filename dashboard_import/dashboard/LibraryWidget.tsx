'use client';

import React from 'react';
import { useLibraryAnalytics } from '@/hooks/useDashboard';
import WidgetSkeleton from './WidgetSkeleton';
import WidgetError from './WidgetError';
import WidgetEmpty from './WidgetEmpty';
import { BookOpen, CheckCircle2, Bookmark, Wrench, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LibraryWidget() {
  const { data: analytics, isLoading, isError, refetch } = useLibraryAnalytics();

  if (isLoading) {
    return <WidgetSkeleton height="h-72" />;
  }

  if (isError) {
    return (
      <WidgetError
        title="Failed to load library telemetry"
        message="Unable to fetch library seat metrics from GET /api/analytics/library."
        onRetry={() => refetch()}
      />
    );
  }

  if (!analytics) {
    return <WidgetEmpty title="No Library Telemetry" message="Library seat metrics currently unavailable." />;
  }

  const occupancyRate = analytics.occupancyRate ?? 0;
  const availableRate = 100 - occupancyRate;

  const seatTypes = [
    { label: 'Available', count: analytics.availableSeats, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 },
    { label: 'Occupied', count: analytics.occupiedSeats, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', icon: UserCheck },
    { label: 'Reserved', count: analytics.reservedSeats, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', icon: Bookmark },
    { label: 'Maintenance', count: analytics.outOfServiceSeats, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', icon: Wrench },
  ];

  return (
    <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Library Seat Availability</h3>
            <p className="text-xs text-[#A1A1AA]">Real-time study seat capacity & reservation status</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-emerald-400">{analytics.availableSeats}</span>
          <span className="block text-[10px] text-[#A1A1AA]">Available Seats</span>
        </div>
      </div>

      {/* Usage Meter */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-[#A1A1AA]">
          <span>Available Seat Ratio</span>
          <span>{availableRate.toFixed(1)}% Free ({analytics.totalSeats} Total)</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-[#27272A] overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(availableRate, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-emerald-500"
          />
          <div className="h-full bg-purple-500" style={{ width: `${Math.min(occupancyRate, 100)}%` }} />
        </div>
      </div>

      {/* Detailed Seat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {seatTypes.map((seat) => {
          const Icon = seat.icon;
          return (
            <div key={seat.label} className={`p-3 rounded-xl border ${seat.bg} flex items-center gap-2.5`}>
              <Icon className={`w-4 h-4 ${seat.color}`} />
              <div>
                <span className="text-xs font-bold text-white block">{seat.count}</span>
                <span className="text-[10px] text-[#A1A1AA]">{seat.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footnote */}
      <div className="p-3 rounded-xl bg-[#09090B] border border-[#27272A] flex items-center justify-between text-xs text-[#A1A1AA]">
        <span>Monitored Libraries</span>
        <span className="font-semibold text-white">{analytics.totalLibraries} Campus Central Libraries</span>
      </div>
    </div>
  );
}
