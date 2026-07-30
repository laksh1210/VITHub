'use client';

import React from 'react';
import { useDashboardSummary } from '@/hooks/useDashboard';
import WidgetSkeleton from './WidgetSkeleton';
import WidgetError from './WidgetError';
import WidgetEmpty from './WidgetEmpty';
import { Users, BookOpen, Coffee, Bus, Wrench, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuickStats() {
  const { data, isLoading, isError, refetch } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <WidgetSkeleton count={6} height="h-32" />
      </div>
    );
  }

  if (isError) {
    return (
      <WidgetError
        title="Failed to load campus summary stats"
        message="Unable to fetch snapshot metrics from GET /dashboard/summary."
        onRetry={() => refetch()}
      />
    );
  }

  if (!data) {
    return <WidgetEmpty title="No Campus Stats Available" message="Summary endpoint returned no data." />;
  }

  const statCards = [
    {
      title: 'Classroom Occupancy',
      value: `${data.occupiedRooms} / ${data.totalRooms}`,
      subtitle: `${data.availableRooms} rooms available`,
      icon: Users,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Library Seats',
      value: `${data.availableLibrarySeats}`,
      subtitle: `Out of ${data.totalLibrarySeats} total seats`,
      icon: BookOpen,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Canteen Queue',
      value: `${data.averageCanteenQueue} min`,
      subtitle: `Across ${data.activeCanteens} active canteens`,
      icon: Coffee,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Active Shuttles',
      value: `${data.activeShuttles}`,
      subtitle: 'On active campus loops',
      icon: Bus,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Open Maintenance',
      value: `${data.openMaintenanceRequests}`,
      subtitle: 'Pending resolution',
      icon: Wrench,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
    {
      title: 'Upcoming Events',
      value: `${data.upcomingEvents}`,
      subtitle: 'Scheduled this week',
      icon: Calendar,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-4 rounded-2xl bg-[#18181B] border border-[#27272A] hover:border-[#6C63FF]/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${card.bg} ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-white tracking-tight group-hover:text-[#6C63FF] transition-colors">
                {card.value}
              </div>
              <div className="text-[10px] text-[#71717A] mt-1 font-medium">{card.subtitle}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
