import { Badge } from "@/components/ui/badge";
import { EVENT_STATUS_COLOR, EVENT_STATUS_LABEL } from "@/lib/types/enums";
import type { EventStatus } from "@/lib/types/event";
import { cn } from "@/lib/utils";

export function EventStatusBadge({ status }: { status: EventStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 font-medium", EVENT_STATUS_COLOR[status])}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {EVENT_STATUS_LABEL[status]}
    </Badge>
  );
}
