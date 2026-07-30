import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoRowProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function InfoRow({ label, value, className }: InfoRowProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 border-b border-border/60 py-3 last:border-0", className)}>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="max-w-[65%] text-right text-sm font-medium">{value}</dd>
    </div>
  );
}
