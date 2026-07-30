'use client';

import React from 'react';
import { useNotifications } from '@/hooks/useDashboard';
import WidgetSkeleton from './WidgetSkeleton';
import WidgetError from './WidgetError';
import WidgetEmpty from './WidgetEmpty';
import { Bell, Info, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotificationsWidget() {
  const { data: notifications, isLoading, isError, refetch } = useNotifications();

  if (isLoading) {
    return <WidgetSkeleton height="h-72" />;
  }

  if (isError) {
    return (
      <WidgetError
        title="Failed to load notifications"
        message="Unable to fetch system updates from GET /notifications API."
        onRetry={() => refetch()}
      />
    );
  }

  if (!notifications || notifications.length === 0) {
    return <WidgetEmpty title="No Notifications" message="You have no pending campus notifications." />;
  }

  const unreadCount = notifications.filter((n) => n.status === 'UNREAD').length;

  return (
    <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">System Notifications</h3>
            <p className="text-xs text-[#A1A1AA]">Real-time operational alerts & campus notices</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-indigo-400">{unreadCount}</span>
          <span className="block text-[10px] text-[#A1A1AA]">Unread Notices</span>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {notifications.slice(0, 5).map((notif) => {
          const isUnread = notif.status === 'UNREAD';
          const timestamp = notif.createdAt
            ? new Date(notif.createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : 'Just now';

          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-3 rounded-xl border transition-colors ${
                isUnread
                  ? 'bg-[#6C63FF]/10 border-[#6C63FF]/30'
                  : 'bg-[#09090B] border-[#27272A]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {isUnread && <span className="w-2 h-2 rounded-full bg-[#6C63FF] animate-pulse" />}
                    <h4 className="text-xs font-bold text-white">{notif.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#A1A1AA] leading-snug">{notif.message}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-[#71717A] shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{timestamp}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
