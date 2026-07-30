import {
  MAINTENANCE_STATUS_LABEL,
  MAINTENANCE_STATUS_ORDER,
} from "@/types/enums";
import type { MaintenanceStatus } from "@/types/maintenance";
import { formatDateTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function StatusTimeline({
  status,
  createdAt,
  updatedAt,
}: {
  status: MaintenanceStatus;
  createdAt: string;
  updatedAt: string;
}) {
  const currentIndex = MAINTENANCE_STATUS_ORDER.indexOf(status);

  return (
    <div className="space-y-3">
      {MAINTENANCE_STATUS_ORDER.map((step, index) => {
        const isDone = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "mt-0.5 h-3 w-3 rounded-full border",
                  isDone
                    ? "border-primary bg-primary"
                    : "border-border bg-background"
                )}
              />
              {index < MAINTENANCE_STATUS_ORDER.length - 1 && (
                <span
                  className={cn(
                    "mt-2 h-10 w-px",
                    isDone ? "bg-primary/40" : "bg-border"
                  )}
                />
              )}
            </div>
            <div className="pb-4">
              <p className={cn("text-sm font-medium", isCurrent && "text-primary")}>
                {MAINTENANCE_STATUS_LABEL[step]}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {index === 0
                  ? formatDateTime(createdAt)
                  : isDone
                    ? formatDateTime(updatedAt)
                    : "Pending"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
