'use client';

import React from 'react';
import { useEventsAnalytics, useCampusEvents } from '@/hooks/useDashboard';
import WidgetSkeleton from './WidgetSkeleton';
import WidgetError from './WidgetError';
import WidgetEmpty from './WidgetEmpty';
import { Calendar, MapPin, Tag, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecentEventsWidget() {
  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError: analyticsError,
    refetch: refetchAnalytics,
  } = useEventsAnalytics();

  const {
    data: events,
    isLoading: eventsLoading,
    isError: eventsError,
    refetch: refetchEvents,
  } = useCampusEvents();

  const isLoading = analyticsLoading || eventsLoading;
  const isError = analyticsError || eventsError;

  if (isLoading) {
    return <WidgetSkeleton height="h-72" />;
  }

  if (isError) {
    return (
      <WidgetError
        title="Failed to load campus events"
        message="Unable to fetch upcoming events from GET /events API."
        onRetry={() => {
          refetchAnalytics();
          refetchEvents();
        }}
      />
    );
  }

  if (!events || events.length === 0) {
    return <WidgetEmpty title="No Upcoming Events" message="No campus events scheduled at this time." />;
  }

  return (
    <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Recent & Upcoming Events</h3>
            <p className="text-xs text-[#A1A1AA]">VIT Bhopal campus workshops, seminars & hackathons</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-sky-400">{analytics?.upcomingEvents ?? events.length}</span>
          <span className="block text-[10px] text-[#A1A1AA]">Upcoming Events</span>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {events.slice(0, 4).map((event) => {
          const startDate = event.startDateTime
            ? new Date(event.startDateTime).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : 'Scheduled Soon';

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-[#09090B] border border-[#27272A] space-y-2 hover:border-[#6C63FF]/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-white truncate">{event.title}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6C63FF]/15 text-[#A78BFA] border border-[#6C63FF]/30 font-medium shrink-0">
                  {event.category || 'Campus Event'}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-[#A1A1AA] gap-2 pt-1 border-t border-[#27272A]/50">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#6C63FF]" />
                  <span>{event.venue || event.buildingName || 'Main Auditorium'}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[#71717A]">
                  <Calendar className="w-3 h-3 text-sky-400" />
                  <span>{startDate}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
