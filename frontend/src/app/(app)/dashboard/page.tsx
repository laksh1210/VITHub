'use client';

import React, { useState } from 'react';
import QuickStats from '@/components/dashboard/QuickStats';
import LiveOccupancyWidget from '@/components/dashboard/LiveOccupancyWidget';
import LibraryWidget from '@/components/dashboard/LibraryWidget';
import CanteenQueueWidget from '@/components/dashboard/CanteenQueueWidget';
import ShuttleWidget from '@/components/dashboard/ShuttleWidget';
import RecentEventsWidget from '@/components/dashboard/RecentEventsWidget';
import NotificationsWidget from '@/components/dashboard/NotificationsWidget';
import CampusAnalyticsCharts from '@/components/dashboard/CampusAnalyticsCharts';
import { Sparkles, Activity } from 'lucide-react';

export default function DashboardPage() {
  const [activeSection] = useState<string>('overview');
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-card via-card/80 to-primary/10 border border-border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground tracking-tight capitalize">
              {activeSection.replace('-', ' ')} Console
            </h2>
            <p className="text-xs text-muted-foreground">
              Real-time operating system & telemetry for VIT Bhopal Digital Twin
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-secondary font-medium px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Live Telemetry</span>
        </div>
      </div>

      <section id="overview" className="scroll-mt-20">
        <QuickStats />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section id="occupancy" className="xl:col-span-2 scroll-mt-20">
          <LiveOccupancyWidget />
        </section>
        <section id="library" className="xl:col-span-1 scroll-mt-20">
          <LibraryWidget />
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <section id="canteen" className="scroll-mt-20">
          <CanteenQueueWidget />
        </section>
        <section id="shuttle" className="scroll-mt-20">
          <ShuttleWidget />
        </section>
        <section id="notifications" className="md:col-span-2 xl:col-span-1 scroll-mt-20">
          <NotificationsWidget />
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section id="events" className="xl:col-span-1 scroll-mt-20">
          <RecentEventsWidget />
        </section>
        <section id="analytics" className="xl:col-span-2 scroll-mt-20">
          <CampusAnalyticsCharts />
        </section>
      </div>
    </div>
  );
}
