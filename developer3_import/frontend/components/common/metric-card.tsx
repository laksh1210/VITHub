import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function MetricCard({
  icon: Icon,
  label,
  value,
  description,
  accent = "primary",
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  description?: string;
  accent?: "primary" | "secondary" | "accent" | "warning";
}) {
  const accentClass =
    accent === "secondary"
      ? "to-secondary/[0.05]"
      : accent === "accent"
        ? "to-accent/[0.05]"
        : accent === "warning"
          ? "to-warning/10"
          : "to-primary/[0.05]";

  return (
    <Card className={`bg-gradient-to-br from-card ${accentClass} p-5`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
    </Card>
  );
}
