'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface WidgetErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function WidgetError({
  title = 'Failed to load telemetry',
  message = 'Unable to connect to campus backend service.',
  onRetry,
}: WidgetErrorProps) {
  return (
    <div className="w-full p-6 rounded-2xl bg-[#18181B] border border-rose-500/30 flex flex-col items-center justify-center text-center space-y-3 shadow-xl">
      <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <p className="text-xs text-[#A1A1AA] mt-1 max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors mt-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry API Connection</span>
        </button>
      )}
    </div>
  );
}
