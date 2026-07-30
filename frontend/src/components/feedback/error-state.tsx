import * as React from "react";
import { AlertTriangleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description: string;
  action?: React.ReactNode;
}

export function ErrorState({ title = "Something went wrong", description, action, className, ...props }: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center rounded-lg border border-destructive/20 bg-destructive/5", className)} {...props} role="alert">
      <AlertTriangleIcon className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold text-destructive">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm w-full">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
