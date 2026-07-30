'use client';

import React from 'react';
import { useCanteenAnalytics, useCanteenQueues } from '@/hooks/useDashboard';
import WidgetSkeleton from './WidgetSkeleton';
import WidgetError from './WidgetError';
import WidgetEmpty from './WidgetEmpty';
import { Coffee, Clock, Users, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CanteenQueueWidget() {
  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError: analyticsError,
    refetch: refetchAnalytics,
  } = useCanteenAnalytics();

  const {
    data: queues,
    isLoading: queuesLoading,
    isError: queuesError,
    refetch: refetchQueues,
  } = useCanteenQueues();

  const isLoading = analyticsLoading || queuesLoading;
  const isError = analyticsError || queuesError;

  if (isLoading) {
    return <WidgetSkeleton height="h-72" />;
  }

  if (isError) {
    return (
      <WidgetError
        title="Failed to load canteen telemetry"
        message="Unable to fetch canteen queue length and wait times from API."
        onRetry={() => {
          refetchAnalytics();
          refetchQueues();
        }}
      />
    );
  }

  if (!analytics && (!queues || queues.length === 0)) {
    return <WidgetEmpty title="No Canteen Queues" message="All campus canteens report zero queue length." />;
  }

  const avgQueue = analytics?.averageQueueLength ?? 0;
  const avgWait = analytics?.averageEstimatedWaitMinutes ?? 0;

  return (
    <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Canteen Queue & Wait Time</h3>
            <p className="text-xs text-[#A1A1AA]">Live food court rush and queue telemetry</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-amber-400">{avgWait.toFixed(0)} min</span>
          <span className="block text-[10px] text-[#A1A1AA]">Avg Wait Time</span>
        </div>
      </div>

      {/* Overview Metric Pills */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-[#09090B] border border-[#27272A] flex items-center gap-3">
          <Users className="w-4 h-4 text-amber-400" />
          <div>
            <span className="text-xs font-extrabold text-white block">{avgQueue.toFixed(1)} Persons</span>
            <span className="text-[10px] text-[#A1A1AA]">Avg Queue Length</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-[#09090B] border border-[#27272A] flex items-center gap-3">
          <Clock className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="text-xs font-extrabold text-white block">{analytics?.activeCanteens ?? 0} Active</span>
            <span className="text-[10px] text-[#A1A1AA]">Open Canteens</span>
          </div>
        </div>
      </div>

      {/* Live Canteen List */}
      {queues && queues.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-[#27272A]">
          <h4 className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
            Live Canteen Queues
          </h4>
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {queues.slice(0, 4).map((canteen) => (
              <div
                key={canteen.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#09090B] border border-[#27272A] text-xs"
              >
                <div>
                  <span className="font-semibold text-white">{canteen.canteenName}</span>
                  <span className="text-[10px] text-[#71717A] ml-2">({canteen.buildingName})</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-white block">
                      {canteen.queueCount} in queue
                    </span>
                    <span className="text-[10px] text-[#A1A1AA]">~{canteen.estimatedWaitMinutes} mins</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                      canteen.estimatedWaitMinutes > 15
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : canteen.estimatedWaitMinutes > 5
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {canteen.estimatedWaitMinutes > 15 ? 'High Rush' : canteen.estimatedWaitMinutes > 5 ? 'Moderate' : 'Low Queue'}
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
