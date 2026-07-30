import { Badge } from "@/components/ui/badge";
import {
  CANTEEN_QUEUE_STATUS_COLOR,
  CANTEEN_QUEUE_STATUS_LABEL,
} from "@/types/enums";
import type { CanteenQueueStatus } from "@/types/canteen-queue";
import { cn } from "@/lib/utils";

export function QueueStatusBadge({ status }: { status: CanteenQueueStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 font-medium", CANTEEN_QUEUE_STATUS_COLOR[status])}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {CANTEEN_QUEUE_STATUS_LABEL[status]}
    </Badge>
  );
}
