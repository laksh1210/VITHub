import * as React from "react";
import { LogoIcon } from "@/components/icons/logo-icon";
import { cn } from "@/lib/utils";

export function Brand({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoIcon className="h-6 w-6 text-primary" />
      <span className="font-bold tracking-tight text-lg">VITHub</span>
    </div>
  );
}
