"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CalendarDays, CalendarFold, SearchX, Sparkles, Ticket } from "lucide-react";
import { useEvents } from "@/hooks/api/use-events";
import { MetricCard } from "@/components/shared/metric-card";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { FilterSelect } from "@/components/shared/filter-select";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";
import { SkeletonCardGrid, SkeletonTable } from "@/components/shared/skeleton-grid";
import { SortSelect, type SortOption } from "@/components/shared/sort-select";
import { ViewToggle } from "@/components/shared/view-toggle";
import { EventCard } from "@/components/events/event-card";
import { EventTable } from "@/components/events/event-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EVENT_STATUSES,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_WEIGHT,
  EVENT_TYPES,
  EVENT_TYPE_LABEL,
} from "@/types/enums";
import type { SortDirection, ViewMode } from "@/types/common";

const SORT_OPTIONS: SortOption[] = [
  { value: "startDateTime", label: "Start time" },
  { value: "title", label: "Title" },
  { value: "eventType", label: "Type" },
  { value: "status", label: "Status" },
  { value: "capacity", label: "Capacity" },
];

export default function EventsPage() {
  const { data, isLoading, isError } = useEvents();

  const [segment, setSegment] = useState<"upcoming" | "past">("upcoming");
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState("startDateTime");
  const [direction, setDirection] = useState<SortDirection>("asc");
  const [view, setView] = useState<ViewMode>("card");

  const events = useMemo(() => {
    const now = Date.now();
    const source = data ?? [];

    let result = source.filter((event) => {
      const isPast =
        event.status === "COMPLETED" ||
        event.status === "CANCELLED" ||
        new Date(event.endDateTime).getTime() < now;

      if (segment === "upcoming" && isPast) return false;
      if (segment === "past" && !isPast) return false;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        event.title.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query);
      const matchesType = eventType === "ALL" || event.eventType === eventType;
      const matchesStatus = status === "ALL" || event.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });

    result = [...result].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "startDateTime") {
        comparison =
          new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
      } else if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "eventType") {
        comparison = a.eventType.localeCompare(b.eventType);
      } else if (sortBy === "status") {
        comparison = EVENT_STATUS_WEIGHT[a.status] - EVENT_STATUS_WEIGHT[b.status];
      } else if (sortBy === "capacity") {
        comparison = (a.capacity ?? 0) - (b.capacity ?? 0);
      }

      return direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [data, direction, eventType, search, segment, sortBy, status]);

  const summary = useMemo(() => {
    const registrations = events.filter((event) => event.registrationRequired).length;
    const ongoing = events.filter((event) => event.status === "ONGOING").length;
    const capacity = events.reduce((sum, event) => sum + (event.capacity ?? 0), 0);

    return { registrations, ongoing, capacity };
  }, [events]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Campus Events"
        title="Events Module"
        count={!isLoading && !isError ? events.length : undefined}
        countLabel={segment === "upcoming" ? "upcoming events" : "past events"}
        description="Premium event discovery for upcoming and past campus experiences, powered entirely by the existing backend APIs."
      />

      <Tabs value={segment} onValueChange={(value) => setSegment(value as "upcoming" | "past")}>
        <TabsList>
          <TabsTrigger value="upcoming">
            <Sparkles />
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger value="past">
            <CalendarFold />
            Past Events
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {!isLoading && !isError && events.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            icon={CalendarDays}
            label={segment === "upcoming" ? "On the calendar" : "Archived events"}
            value={events.length}
            description="Events visible after the current search and filter selection."
          />
          <MetricCard
            icon={Ticket}
            label="Registration required"
            value={summary.registrations}
            description="Events that currently require registration."
            accent="secondary"
          />
          <MetricCard
            icon={Sparkles}
            label={segment === "upcoming" ? "Live now" : "Total capacity"}
            value={segment === "upcoming" ? summary.ongoing : summary.capacity || "NA"}
            description={
              segment === "upcoming"
                ? "Events already marked ongoing by the backend."
                : "Known total capacity across the archived selection."
            }
            accent="accent"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, organizer, venue or category..."
          />
          <FilterSelect
            value={eventType}
            onChange={setEventType}
            options={EVENT_TYPES.map((value) => ({
              value,
              label: EVENT_TYPE_LABEL[value],
            }))}
            placeholder="Type"
            allLabel="All types"
          />
          <FilterSelect
            value={status}
            onChange={setStatus}
            options={EVENT_STATUSES.map((value) => ({
              value,
              label: EVENT_STATUS_LABEL[value],
            }))}
            placeholder="Status"
            allLabel="All statuses"
          />
        </div>
        <div className="flex items-center gap-3">
          <SortSelect
            value={sortBy}
            onChange={setSortBy}
            direction={direction}
            onDirectionToggle={() =>
              setDirection((current) => (current === "asc" ? "desc" : "asc"))
            }
            options={SORT_OPTIONS}
          />
          <ViewToggle value={view} onChange={setView} />
        </div>
      </div>

      {isLoading && (view === "card" ? <SkeletonCardGrid /> : <SkeletonTable />)}

      {isError && !isLoading && (
        <ErrorState
          description="Events couldn't be fetched from the backend. Confirm the API is running and NEXT_PUBLIC_API_BASE_URL is correct."
          
        />
      )}

      {!isLoading && !isError && events.length === 0 && (
        <EmptyState
          icon={data && data.length > 0 ? <SearchX className="h-10 w-10 text-muted-foreground" /> : <CalendarDays className="h-10 w-10 text-muted-foreground" />}
          title={data && data.length > 0 ? "No events match your filters" : "No events yet"}
          description={
            data && data.length > 0
              ? "Try a different search term or clear the type and status filters."
              : "Events created on the backend will show up here automatically."
          }
        />
      )}

      {!isLoading && !isError && events.length > 0 && (
        <>
          {view === "card" ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <EventTable events={events} />
          )}
        </>
      )}
    </div>
  );
}
