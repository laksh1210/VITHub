import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  count?: number;
  countLabel?: string;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, count, countLabel, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-3xl">
        {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight lg:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {count !== undefined && (
        <div className="shrink-0 rounded-xl border border-border/80 bg-card/60 px-4 py-3 text-left sm:text-right">
          <p className="text-2xl font-semibold leading-none">{count}</p>
          {countLabel && <p className="mt-1 text-xs text-muted-foreground">{countLabel}</p>}
        </div>
      )}
    </div>
  );
}
