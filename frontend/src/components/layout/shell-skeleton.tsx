import * as React from "react";
import { Skeleton } from "@/components/feedback/skeleton";

export function ShellSkeleton() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="hidden md:flex flex-col w-64 border-r bg-card/50 h-screen sticky top-0 p-4 gap-4">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
        <Skeleton className="h-12 w-full mt-auto" />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-4 border-b bg-background/80 px-4">
          <Skeleton className="h-8 w-8 md:hidden" />
          <div className="flex w-full items-center justify-end gap-4 md:justify-between">
            <Skeleton className="hidden md:flex h-9 w-64 rounded-[0.5rem]" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 flex flex-col gap-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <Skeleton className="h-[400px] w-full mt-4" />
        </main>
      </div>
    </div>
  );
}
