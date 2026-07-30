"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ title = "Unable to load this view", description, onRetry, className }: ErrorStateProps) {
  return (
    <div className={cn("flex min-h-56 flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/[0.04] px-6 py-10 text-center", className)}>
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="h-5 w-5" />
      </span>
      <h2 className="mt-4 text-sm font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-5" onClick={onRetry}>
          <RotateCcw className="h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
