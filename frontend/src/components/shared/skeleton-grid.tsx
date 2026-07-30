import { cn } from "@/lib/utils";

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} aria-hidden="true" />;
}

export function SkeletonCardGrid({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="rounded-xl border border-border/80 bg-card p-5">
          <div className="flex items-start justify-between">
            <SkeletonBlock className="h-10 w-10 rounded-xl" />
            <SkeletonBlock className="h-4 w-4 rounded-full" />
          </div>
          <SkeletonBlock className="mt-5 h-5 w-2/3" />
          <SkeletonBlock className="mt-2 h-3 w-1/2" />
          <SkeletonBlock className="mt-5 h-20 w-full" />
          <SkeletonBlock className="mt-4 h-3 w-3/4" />
          <SkeletonBlock className="mt-2 h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 6 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-card">
      <div className="grid grid-cols-4 gap-4 border-b border-border p-4">
        {Array.from({ length: 4 }, (_, index) => <SkeletonBlock key={index} className="h-3" />)}
      </div>
      {Array.from({ length: rows }, (_, row) => (
        <div key={row} className="grid grid-cols-4 gap-4 border-b border-border/60 p-4 last:border-0">
          {Array.from({ length: 4 }, (_, column) => <SkeletonBlock key={column} className={cn("h-4", column === 0 && "w-3/4")} />)}
        </div>
      ))}
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="space-y-6">
      <SkeletonBlock className="h-4 w-36" />
      <div className="rounded-xl border border-border/80 bg-card p-6">
        <SkeletonBlock className="h-8 w-2/3" />
        <SkeletonBlock className="mt-3 h-4 w-1/3" />
        <SkeletonBlock className="mt-8 h-32 w-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <SkeletonBlock className="h-56 w-full rounded-xl" />
        <SkeletonBlock className="h-56 w-full rounded-xl" />
      </div>
    </div>
  );
}
