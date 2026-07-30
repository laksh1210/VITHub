"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, MapPin, Ticket, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EventStatusBadge } from "./event-status-badge";
import { EventTypeBadge } from "./event-type-badge";
import type { EventResponse } from "@/lib/types/event";
import { formatDateTimeRange } from "@/lib/formatters";

export function EventCard({ event }: { event: EventResponse }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Link href={`/events/${event.id}`} className="group block">
        <Card className="h-full overflow-hidden bg-gradient-to-br from-card via-card to-primary/[0.04] transition-all hover:border-primary/40 hover:shadow-[0_18px_60px_-32px_rgba(108,99,255,0.7)]">
          <div className="flex items-start justify-between p-5 pb-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <CalendarDays className="h-[18px] w-[18px]" />
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
          </div>

          <div className="p-5">
            <h3 className="text-base font-semibold leading-tight">{event.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {event.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <EventStatusBadge status={event.status} />
              <EventTypeBadge eventType={event.eventType} />
            </div>

            <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                {formatDateTimeRange(event.startDateTime, event.endDateTime)}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {event.venue}
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2">
                  <Ticket className="h-3.5 w-3.5 text-primary" />
                  {event.registrationRequired ? "Registration required" : "Walk-in"}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  {event.capacity ?? "Open"} spots
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
