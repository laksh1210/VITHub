'use client';

import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Coffee,
  Bus,
  Calendar,
  Bell,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Shield,
  X,
  Compass,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NavSection {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  currentRole?: string;
}

const NAV_ITEMS: NavSection[] = [
  { id: 'overview', label: 'Campus Overview', icon: LayoutDashboard },
  { id: 'occupancy', label: 'Room Occupancy', icon: Users, badge: 'Live' },
  { id: 'library', label: 'Library Seats', icon: BookOpen },
  { id: 'canteen', label: 'Canteen Queues', icon: Coffee },
  { id: 'shuttle', label: 'Shuttle Fleet', icon: Bus },
  { id: 'events', label: 'Campus Events', icon: Calendar },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'analytics', label: 'System Analytics', icon: BarChart3 },
];

export default function DashboardSidebar({
  activeSection,
  onSectionChange,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose,
  currentRole = 'STUDENT',
}: DashboardSidebarProps) {
  const content = (
    <div className="h-full flex flex-col justify-between py-4 px-3">
      {/* Top Header & Brand */}
      <div>
        <div className="flex items-center justify-between px-2 mb-6">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#A78BFA] flex items-center justify-center shadow-lg shadow-[#6C63FF]/20 shrink-0">
              <Compass className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="whitespace-nowrap"
              >
                <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                  VITHub <span className="text-[10px] text-[#6C63FF] font-mono px-1.5 py-0.5 rounded bg-[#6C63FF]/15 border border-[#6C63FF]/30">OS</span>
                </h2>
                <p className="text-[10px] text-[#A1A1AA]">Dashboard Console</p>
              </motion.div>
            )}
          </div>

          {/* Desktop Collapse Button */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg bg-[#27272A]/50 hover:bg-[#27272A] text-[#A1A1AA] hover:text-white transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onMobileClose}
            className="md:hidden p-1.5 rounded-lg bg-[#27272A]/50 text-[#A1A1AA] hover:text-white"
            aria-label="Close Mobile Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Access Role Badge */}
        {!isCollapsed && (
          <div className="px-2 mb-4">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#27272A]/40 border border-[#27272A]">
              <Shield className="w-3.5 h-3.5 text-[#6C63FF]" />
              <div className="text-[11px]">
                <span className="text-[#A1A1AA] block text-[9px] uppercase font-semibold">Active Role</span>
                <span className="font-bold text-white tracking-wide">{currentRole}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onMobileClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/25 font-semibold'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#27272A]/60'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#A1A1AA]'}`} />
                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between overflow-hidden">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info / Digital Twin Status */}
      {!isCollapsed && (
        <div className="px-2 pt-4 border-t border-[#27272A]/60 text-[10px] text-[#A1A1AA] space-y-1">
          <div className="flex items-center justify-between">
            <span>VIT Bhopal Twin</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-[9px] text-[#71717A]">v1.0.0 · Track 3 Demo</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Collapsible Sidebar */}
      <aside
        className={`hidden md:block sticky top-0 h-screen bg-[#18181B]/95 backdrop-blur-xl border-r border-[#27272A] z-40 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {content}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="md:hidden fixed inset-y-0 left-0 w-72 bg-[#18181B] border-r border-[#27272A] z-50 shadow-2xl"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
