import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function StatusBadge({ active }: { active: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 font-medium",
        active
          ? "border-[#22C55E]/30 bg-[#22C55E]/15 text-[#4ADE80]"
          : "border-[#71717A]/30 bg-[#71717A]/15 text-[#A1A1AA]"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {active ? "Active" : "Inactive"}
    </Badge>
  );
}
