'use client';

import React from 'react';
import {
  useOccupancyAnalytics,
  useMaintenanceAnalytics,
  useLibraryAnalytics,
} from '@/hooks/useDashboard';
import WidgetSkeleton from './WidgetSkeleton';
import WidgetError from './WidgetError';
import WidgetEmpty from './WidgetEmpty';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BarChart3, PieChart as PieIcon, Activity } from 'lucide-react';

export default function CampusAnalyticsCharts() {
  const {
    data: occupancy,
    isLoading: occLoading,
    isError: occError,
    refetch: refetchOcc,
  } = useOccupancyAnalytics();

  const {
    data: maintenance,
    isLoading: maintLoading,
    isError: maintError,
    refetch: refetchMaint,
  } = useMaintenanceAnalytics();

  const {
    data: library,
    isLoading: libLoading,
    isError: libError,
    refetch: refetchLib,
  } = useLibraryAnalytics();

  const isLoading = occLoading || maintLoading || libLoading;
  const isError = occError || maintError || libError;

  if (isLoading) {
    return <WidgetSkeleton height="h-80" />;
  }

  if (isError) {
    return (
      <WidgetError
        title="Failed to load telemetry analytics"
        message="Unable to fetch snapshot analytics metrics for charts."
        onRetry={() => {
          refetchOcc();
          refetchMaint();
          refetchLib();
        }}
      />
    );
  }

  if (!occupancy && !maintenance && !library) {
    return <WidgetEmpty title="No Analytics Telemetry" message="No snapshot metrics returned from analytics endpoints." />;
  }

  // 1. Occupancy Status Data (Snapshot Donut Chart)
  const occupancyChartData = [
    { name: 'Available', value: occupancy?.availableStatusCount ?? 0, color: '#10B981' },
    { name: 'Moderate', value: occupancy?.moderateStatusCount ?? 0, color: '#F59E0B' },
    { name: 'Crowded', value: occupancy?.crowdedStatusCount ?? 0, color: '#EF4444' },
    { name: 'Full', value: occupancy?.fullStatusCount ?? 0, color: '#8B5CF6' },
  ].filter((item) => item.value > 0);

  // 2. Maintenance Priority Distribution Data (Snapshot Bar Chart)
  const maintenanceChartData = [
    { priority: 'Low', count: maintenance?.lowPriorityRequests ?? 0, fill: '#10B981' },
    { priority: 'Medium', count: maintenance?.mediumPriorityRequests ?? 0, fill: '#3B82F6' },
    { priority: 'High', count: maintenance?.highPriorityRequests ?? 0, fill: '#F59E0B' },
    { priority: 'Critical', count: maintenance?.criticalPriorityRequests ?? 0, fill: '#EF4444' },
  ];

  // 3. Library Seat Distribution Data (Snapshot Bar Chart)
  const libraryChartData = [
    { type: 'Available', count: library?.availableSeats ?? 0, fill: '#10B981' },
    { type: 'Occupied', count: library?.occupiedSeats ?? 0, fill: '#8B5CF6' },
    { type: 'Reserved', count: library?.reservedSeats ?? 0, fill: '#F59E0B' },
    { type: 'Maintenance', count: library?.outOfServiceSeats ?? 0, fill: '#EF4444' },
  ];

  return (
    <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-6 shadow-xl">
      {/* Chart Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF]">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Campus Analytics & Distribution</h3>
            <p className="text-xs text-[#A1A1AA]">Telemetry snapshot charts derived from live module endpoints</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#A78BFA] px-2.5 py-1 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20">
          <Activity className="w-3.5 h-3.5" />
          <span>Real-time Snapshot</span>
        </div>
      </div>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Occupancy Distribution */}
        <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              Classroom Density Distribution
            </span>
            <span className="text-[#A1A1AA] text-[10px]">
              {occupancy?.totalRooms ?? 0} Total Rooms
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {occupancyChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181B',
                    borderColor: '#27272A',
                    borderRadius: '0.75rem',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', color: '#A1A1AA' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Maintenance Priority Distribution */}
        <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-rose-400" />
              Maintenance Priority Requests
            </span>
            <span className="text-[#A1A1AA] text-[10px]">
              {maintenance?.totalRequests ?? 0} Requests
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maintenanceChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="priority" stroke="#71717A" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181B',
                    borderColor: '#27272A',
                    borderRadius: '0.75rem',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {maintenanceChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
