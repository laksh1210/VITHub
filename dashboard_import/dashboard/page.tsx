'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QuickStats from '@/components/dashboard/QuickStats';
import LiveOccupancyWidget from '@/components/dashboard/LiveOccupancyWidget';
import LibraryWidget from '@/components/dashboard/LibraryWidget';
import CanteenQueueWidget from '@/components/dashboard/CanteenQueueWidget';
import ShuttleWidget from '@/components/dashboard/ShuttleWidget';
import RecentEventsWidget from '@/components/dashboard/RecentEventsWidget';
import NotificationsWidget from '@/components/dashboard/NotificationsWidget';
import CampusAnalyticsCharts from '@/components/dashboard/CampusAnalyticsCharts';
import { useDashboardSummary } from '@/hooks/useDashboard';
import { Sparkles, Activity } from 'lucide-react';

const queryClient = new QueryClient();

function DashboardContent() {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [currentRole] = useState<string>('STUDENT');

  const { refetch, isRefetching } = useDashboardSummary();

  const handleRefreshAll = () => {
    refetch();
  };

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex bg-[#09090B] text-white font-sans antialiased">
      {/* Dashboard Sidebar */}
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
        currentRole={currentRole}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Header */}
        <DashboardHeader
          onRefresh={handleRefreshAll}
          isRefreshing={isRefetching}
          onMobileMenuOpen={() => setIsMobileSidebarOpen(true)}
          currentRole={currentRole}
        />

        {/* Dashboard Main Scrollable Area */}
        <main className="flex-1 p-4 lg:p-8 space-y-6 overflow-y-auto scroll-smooth">
          {/* Active Console Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#18181B] via-[#18181B]/80 to-[#6C63FF]/10 border border-[#27272A] shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/20 border border-[#6C63FF]/30 flex items-center justify-center text-[#6C63FF]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight capitalize">
                  {activeSection.replace('-', ' ')} Console
                </h2>
                <p className="text-xs text-[#A1A1AA]">
                  Real-time operating system & telemetry for VIT Bhopal Digital Twin
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A78BFA] font-medium px-3 py-1.5 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Track 3 Operational Console</span>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <section id="overview" className="scroll-mt-20">
            <QuickStats />
          </section>

          {/* Row 1: Occupancy (2 cols) & Library (1 col) */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <section id="occupancy" className="xl:col-span-2 scroll-mt-20">
              <LiveOccupancyWidget />
            </section>
            <section id="library" className="xl:col-span-1 scroll-mt-20">
              <LibraryWidget />
            </section>
          </div>

          {/* Row 2: Canteen (1 col), Shuttle (1 col), Notifications (1 col) */}
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

          {/* Row 3: Events (1 col) & Analytics Charts (2 cols) */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <section id="events" className="xl:col-span-1 scroll-mt-20">
              <RecentEventsWidget />
            </section>
            <section id="analytics" className="xl:col-span-2 scroll-mt-20">
              <CampusAnalyticsCharts />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  );
}
