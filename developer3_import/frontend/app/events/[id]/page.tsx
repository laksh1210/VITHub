"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";
import { useEvent } from "@/hooks/use-events";
import { BackLink } from "@/components/common/back-link";
import { ErrorState } from "@/components/common/error-state";
import { InfoRow } from "@/components/common/info-row";
import { MetricCard } from "@/components/common/metric-card";
import { SkeletonDetail } from "@/components/common/skeleton-grid";
import { EventCard } from "@/components/events/event-card";
import { EventStatusBadge } from "@/components/events/event-status-badge";
import { EventTypeBadge } from "@/components/events/event-type-badge";
import { RegistrationButton } from "@/components/events/registration-button";
import { Card } from "@/components/ui/card";
import { formatDateTime, formatDateTimeRange } from "@/lib/formatters";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: event, isLoading, isError, refetch } = useEvent(id);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <BackLink href="/events" label="Back to events" />

      {isLoading && <SkeletonDetail />}

      {isError && !isLoading && (
        <ErrorState
          description="This event couldn't be loaded. It may not exist, or the backend may be unreachable."
          onRetry={() => refetch()}
        />
      )}

      {event && !isLoading && !isError && (
        <>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <CalendarDays className="h-6 w-6" />
              </span>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
                  {event.title}
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {event.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <EventStatusBadge status={event.status} />
                  <EventTypeBadge eventType={event.eventType} />
                </div>
              </div>
            </div>
            <RegistrationButton event={event} />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={CalendarDays}
              label="Schedule"
              value={formatDateTimeRange(event.startDateTime, event.endDateTime)}
              description="Backend-provided event window."
            />
            <MetricCard
              icon={MapPin}
              label="Venue"
              value={event.venue}
              description={event.buildingName ?? "Campus venue"}
              accent="secondary"
            />
            <MetricCard
              icon={Users}
              label="Capacity"
              value={event.capacity ?? "Open"}
              description={
                event.registrationRequired ? "Registration required" : "Walk-in available"
              }
              accent="accent"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="bg-gradient-to-br from-card to-primary/[0.04]">
              <div className="p-5">
                <h2 className="text-sm font-semibold">Event details</h2>
                <div className="mt-4">
                  <InfoRow label="Category" value={event.category} />
                  <InfoRow label="Organizer" value={event.organizer} />
                  <InfoRow
                    label="Venue"
                    value={
                      event.buildingId && event.buildingName ? (
                        <Link
                          href={`/buildings/${event.buildingId}`}
                          className="inline-flex items-center gap-1 hover:text-primary"
                        >
                          {event.buildingName}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        event.venue
                      )
                    }
                  />
                  <InfoRow label="Room" value={event.roomNumber ?? "Not attached"} />
                  <InfoRow
                    label="Registration"
                    value={event.registrationRequired ? "Required" : "Not required"}
                  />
                  <InfoRow label="Created" value={formatDateTime(event.createdAt)} />
                  <InfoRow label="Last updated" value={formatDateTime(event.updatedAt)} />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-card to-secondary/[0.04]">
              <div className="p-5">
                <h2 className="text-sm font-semibold">Registration note</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The current backend exposes whether registration is required, but it does not
                  expose a dedicated registration endpoint. The button on this page copies the
                  event details so students can act on the organizer information immediately.
                </p>
                <div className="mt-4">
                  <InfoRow label="Status" value={<EventStatusBadge status={event.status} />} />
                  <InfoRow label="Type" value={<EventTypeBadge eventType={event.eventType} />} />
                  <InfoRow label="Author" value={event.createdByFullName} />
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <div className="p-5">
              <h2 className="text-sm font-semibold">Quick summary</h2>
              <div className="mt-4">
                <EventCard event={event} />
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
