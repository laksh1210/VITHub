import { Badge } from "@/components/ui/badge";
import {
  MAINTENANCE_STATUS_COLOR,
  MAINTENANCE_STATUS_LABEL,
} from "@/types/enums";
import type { MaintenanceStatus } from "@/types/maintenance";
import { cn } from "@/lib/utils";

export function MaintenanceStatusBadge({
  status,
}: {
  status: MaintenanceStatus;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 font-medium", MAINTENANCE_STATUS_COLOR[status])}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {MAINTENANCE_STATUS_LABEL[status]}
    </Badge>
  );
}
