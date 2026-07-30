import Link from "next/link";
import {
  Armchair,
  ArrowUpRight,
  BookOpen,
  BusFront,
  CalendarDays,
  Building2,
  DoorOpen,
  ShieldAlert,
  Store,
  TimerReset,
} from "lucide-react";

const MODULES = [
  {
    href: "/buildings",
    title: "Buildings",
    description: "Every campus building - category, location and floor count.",
    icon: Building2,
  },
  {
    href: "/rooms",
    title: "Rooms",
    description: "Classrooms, labs and halls, filterable by building and type.",
    icon: DoorOpen,
  },
  {
    href: "/libraries",
    title: "Libraries",
    description: "Every library space, with live seat availability and occupancy.",
    icon: BookOpen,
  },
  {
    href: "/library-seats",
    title: "Library Seats",
    description: "Individual seats - silent, discussion or regular - with live status.",
    icon: Armchair,
  },
  {
    href: "/canteens",
    title: "Canteens",
    description: "Dining spaces with seating, service windows, activity status and premium browse views.",
    icon: Store,
  },
  {
    href: "/queues",
    title: "Queue Monitor",
    description: "Live canteen queue pressure with search, filters, sorting and detail drill-downs.",
    icon: TimerReset,
  },
  {
    href: "/shuttles",
    title: "Shuttle Module",
    description: "Live shuttle list and detail views with route information, inferred ETA, search, filters, cards, tables and animations.",
    icon: BusFront,
  },
  {
    href: "/maintenance",
    title: "Maintenance Module",
    description: "Complaint list and detail views with create form, priority badges, status timelines, and responsive cards or tables.",
    icon: ShieldAlert,
  },
  {
    href: "/events",
    title: "Events Module",
    description: "Upcoming and past event discovery with premium UI, registration CTA, filters, cards, tables and detail views.",
    icon: CalendarDays,
  },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-xs font-medium uppercase tracking-wider text-primary">
        VITHub · Phase 6
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight lg:text-4xl">
        Campus Digital Twin
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Live directory of VIT Bhopal&apos;s buildings, rooms, libraries, seats,
        canteens, queue snapshots, shuttle telemetry and maintenance
        complaints, plus premium event discovery, served straight from the
        backend&apos;s frozen API contract.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {MODULES.map((moduleItem) => {
          const Icon = moduleItem.icon;
          return (
            <Link
              key={moduleItem.href}
              href={moduleItem.href}
              className="group vh-glass flex flex-col justify-between rounded-xl p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <div className="mt-6">
                <h2 className="text-base font-semibold">{moduleItem.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {moduleItem.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
