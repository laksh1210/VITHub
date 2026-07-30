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
    <div className="w-full p-8 rounded-2xl bg-card/50 border border-border flex flex-col items-center justify-center text-center space-y-2">
      <div className="w-10 h-10 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground">
        <Inbox className="w-5 h-5" />
      </div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <p className="text-xs text-muted-foreground max-w-xs">{message}</p>
    </div>
  );
}
