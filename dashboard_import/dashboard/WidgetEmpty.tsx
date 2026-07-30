'use client';

import React from 'react';
import { Inbox } from 'lucide-react';

interface WidgetEmptyProps {
  title?: string;
  message?: string;
}

export default function WidgetEmpty({
  title = 'No Data Available',
  message = 'Currently there are no active telemetry records reported.',
}: WidgetEmptyProps) {
  return (
    <div className="w-full p-8 rounded-2xl bg-[#18181B]/50 border border-[#27272A] flex flex-col items-center justify-center text-center space-y-2">
      <div className="w-10 h-10 rounded-xl bg-[#27272A]/50 border border-[#27272A] flex items-center justify-center text-[#A1A1AA]">
        <Inbox className="w-5 h-5" />
      </div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <p className="text-xs text-[#A1A1AA] max-w-xs">{message}</p>
    </div>
  );
}
