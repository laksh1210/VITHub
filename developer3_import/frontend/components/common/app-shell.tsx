"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Armchair,
  BookOpen,
  Building2,
  DoorOpen,
  CalendarDays,
  LayoutGrid,
  ShieldAlert,
  Store,
  BusFront,
  TimerReset,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/buildings", label: "Buildings", icon: Building2 },
  { href: "/rooms", label: "Rooms", icon: DoorOpen },
  { href: "/libraries", label: "Libraries", icon: BookOpen },
  { href: "/library-seats", label: "Seats", icon: Armchair },
  { href: "/canteens", label: "Canteens", icon: Store },
  { href: "/queues", label: "Queue", icon: TimerReset },
  { href: "/shuttles", label: "Shuttles", icon: BusFront },
  { href: "/maintenance", label: "Maintenance", icon: ShieldAlert },
  { href: "/events", label: "Events", icon: CalendarDays },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/80 px-4 py-6 lg:flex">
        <Link href="/" className="mb-8 flex items-center gap-2 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <LayoutGrid className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            VIT<span className="text-primary">Hub</span>
          </span>
        </Link>

        <nav className="flex flex-col gap-1">
          <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Campus
          </p>
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-lg border border-border/80 bg-card/60 p-3 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Phase 6</p>
          <p className="mt-0.5">
            Buildings, Rooms, Libraries, Seats, Canteens, Queue Monitor,
            Shuttle Module, Maintenance Module and Events Module, wired to the
            live backend.
          </p>
        </div>
      </aside>

      <div className="flex min-h-screen w-full flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border/80 bg-background/70 px-4 backdrop-blur-md lg:px-8">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <LayoutGrid className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-semibold">
              VIT<span className="text-primary">Hub</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1 lg:hidden">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-medium",
                  pathname.startsWith(item.href)
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden text-xs text-muted-foreground lg:block">
            VIT Bhopal · Campus Digital Twin
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
