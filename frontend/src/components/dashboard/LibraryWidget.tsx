'use client';

import React from 'react';
import { useLibraryAnalytics } from '@/hooks/api/use-dashboard';
import WidgetSkeleton from './WidgetSkeleton';
import WidgetError from './WidgetError';
import WidgetEmpty from './WidgetEmpty';
import { BookOpen } from 'lucide-react';
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

  if (!analytics || !analytics.libraries) {
    return <WidgetEmpty title="No Library Telemetry" message="Library seat metrics currently unavailable." />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {analytics.libraries.map((library) => {
        const occupancyRate = library.occupancyRate ?? 0;
        const availableRate = 100 - occupancyRate;

        return (
          <div key={library.id} className="p-4 sm:p-6 rounded-2xl bg-card border border-border space-y-6 shadow-xl flex flex-col justify-between">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex shrink-0 items-center justify-center text-purple-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground tracking-tight line-clamp-1">{library.name}</h3>
                  <p className="text-xs text-muted-foreground">Seat Availability</p>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-2xl font-black text-emerald-400">{library.availableSeats}</span>
                <span className="block text-[10px] text-muted-foreground">Available Seats</span>
              </div>
            </div>

            {/* Usage Meter */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row justify-between text-xs text-muted-foreground gap-1">
                <span>Available Seat Ratio</span>
                <span className="font-medium">{availableRate.toFixed(1)}% Free ({library.totalSeats} Total)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(availableRate, 100)}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-emerald-500"
                />
                <div className="h-full bg-purple-500" style={{ width: `${Math.min(occupancyRate, 100)}%` }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
