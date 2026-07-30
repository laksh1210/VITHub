import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FormError({ message, className }: { message?: string; className?: string }) {
  if (!message) return null;
  return (
    <div className={cn("flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive", className)} role="alert">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
