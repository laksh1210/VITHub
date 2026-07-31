import * as React from "react";
import { EmptyStateIcon } from "@/components/icons/empty-state-icon";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)} {...props}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
        {icon || <EmptyStateIcon className="h-10 w-10 text-muted-foreground" />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-[384px] w-full">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
