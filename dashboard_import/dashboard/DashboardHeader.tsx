'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Menu, Clock, Sparkles } from 'lucide-react';

interface DashboardHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onMobileMenuOpen?: () => void;
  currentRole?: string;
}

export default function DashboardHeader({
  onRefresh,
  isRefreshing = false,
  onMobileMenuOpen,
  currentRole = 'STUDENT',
}: DashboardHeaderProps) {
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('Welcome');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');

      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setDateString(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-[#18181B]/80 backdrop-blur-md border-b border-[#27272A] px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuOpen}
            className="md:hidden p-2 rounded-xl bg-[#27272A]/60 text-[#A1A1AA] hover:text-white transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base lg:text-lg font-bold text-white tracking-tight">
                {greeting}, <span className="text-[#6C63FF] capitalize">{currentRole.toLowerCase()}</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#6C63FF]/15 text-[#A78BFA] border border-[#6C63FF]/30">
                <Sparkles className="w-3 h-3" /> Live Twin
              </span>
            </div>
            <p className="text-[11px] text-[#A1A1AA] hidden sm:block">
              VIT Bhopal Operational Dashboard & System Monitor
            </p>
          </div>
        </div>

        {/* Right: Date/Time, Refresh Button & User Avatar */}
        <div className="flex items-center gap-3">
          {/* Live Campus Clock */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#09090B] border border-[#27272A] text-xs">
            <Clock className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span className="font-mono text-white font-medium">{timeString}</span>
            <span className="text-[#71717A] text-[10px]">({dateString})</span>
          </div>

          {/* Refresh Action Button */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#27272A]/60 hover:bg-[#27272A] text-xs font-medium text-white transition-all disabled:opacity-50 border border-[#27272A]"
              title="Refresh Dashboard Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#A78BFA] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          )}

          {/* Reusable User Avatar Component Placeholder */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#27272A]">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#3B82F6] flex items-center justify-center text-white text-xs font-bold shadow-md">
                {currentRole.substring(0, 2).toUpperCase()}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#18181B]" />
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-white leading-tight">VIT User</p>
              <p className="text-[10px] text-[#A1A1AA] leading-none">Online</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
