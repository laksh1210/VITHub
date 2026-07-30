import { Badge } from "@/components/ui/badge";
import { SHUTTLE_STATUS_COLOR, SHUTTLE_STATUS_LABEL } from "@/types/enums";
import type { ShuttleStatus } from "@/types/shuttle";
import { cn } from "@/lib/utils";

export function ShuttleStatusBadge({ status }: { status: ShuttleStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 font-medium", SHUTTLE_STATUS_COLOR[status])}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {SHUTTLE_STATUS_LABEL[status]}
    </Badge>
  );
}
