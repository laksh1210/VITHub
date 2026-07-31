import * as React from "react";
import { CheckCircle2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SuccessStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function SuccessState({ title, description, action, className, ...props }: SuccessStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center rounded-lg border border-emerald-500/20 bg-emerald-500/5", className)} {...props}>
      <CheckCircle2Icon className="h-12 w-12 text-emerald-500 mb-4" />
      <h3 className="text-lg font-semibold text-emerald-500">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-2 max-w-[384px]">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
