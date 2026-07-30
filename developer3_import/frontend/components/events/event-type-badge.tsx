import { Badge } from "@/components/ui/badge";
import { EVENT_TYPE_COLOR, EVENT_TYPE_LABEL } from "@/lib/types/enums";
import type { EventType } from "@/lib/types/event";
import { cn } from "@/lib/utils";

export function EventTypeBadge({ eventType }: { eventType: EventType }) {
  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 font-medium", EVENT_TYPE_COLOR[eventType])}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {EVENT_TYPE_LABEL[eventType]}
    </Badge>
  );
}
