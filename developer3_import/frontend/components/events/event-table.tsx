import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EventStatusBadge } from "./event-status-badge";
import { EventTypeBadge } from "./event-type-badge";
import type { EventResponse } from "@/lib/types/event";
import { formatDateTimeRange } from "@/lib/formatters";

export function EventTable({ events }: { events: EventResponse[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Registration</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id} className="group">
              <TableCell>
                <Link href={`/events/${event.id}`} className="font-medium hover:text-primary">
                  {event.title}
                </Link>
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                  {event.organizer}
                </p>
              </TableCell>
              <TableCell>
                <EventTypeBadge eventType={event.eventType} />
              </TableCell>
              <TableCell>
                <EventStatusBadge status={event.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDateTimeRange(event.startDateTime, event.endDateTime)}
              </TableCell>
              <TableCell className="text-muted-foreground">{event.venue}</TableCell>
              <TableCell className="text-muted-foreground">
                {event.registrationRequired ? "Required" : "Walk-in"}
              </TableCell>
              <TableCell>
                <Link
                  href={`/events/${event.id}`}
                  className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
