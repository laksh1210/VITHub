'use client';

import React from 'react';

interface WidgetSkeletonProps {
  height?: string;
  count?: number;
}

export default function WidgetSkeleton({ height = 'h-44', count = 1 }: WidgetSkeletonProps) {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`w-full ${height} rounded-2xl bg-[#18181B] border border-[#27272A] p-5 animate-pulse flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 bg-[#27272A] rounded-lg" />
            <div className="h-8 w-8 bg-[#27272A] rounded-xl" />
          </div>
          <div className="space-y-2 my-auto">
            <div className="h-8 w-24 bg-[#27272A] rounded-lg" />
            <div className="h-3 w-48 bg-[#27272A]/60 rounded-md" />
          </div>
          <div className="h-2 w-full bg-[#27272A] rounded-full" />
        </div>
      ))}
    </div>
  );
}
