import { Badge } from "@/components/ui/badge";
import { PRIORITY_COLOR, PRIORITY_LABEL } from "@/types/enums";
import type { Priority } from "@/types/maintenance";
import { cn } from "@/lib/utils";

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 font-medium", PRIORITY_COLOR[priority])}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {PRIORITY_LABEL[priority]}
    </Badge>
  );
}
