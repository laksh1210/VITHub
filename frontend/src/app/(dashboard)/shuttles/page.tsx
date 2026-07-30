"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BusFront, Clock3, SearchX, Signal, TrafficCone } from "lucide-react";
import { useAllCurrentShuttleLocations } from "@/hooks/api/use-shuttle-locations";
import { useShuttles } from "@/hooks/api/use-shuttles";
import { MetricCard } from "@/components/shared/metric-card";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { FilterSelect } from "@/components/shared/filter-select";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";
import { SkeletonCardGrid, SkeletonTable } from "@/components/shared/skeleton-grid";
import { SortSelect, type SortOption } from "@/components/shared/sort-select";
import { ViewToggle } from "@/components/shared/view-toggle";
import { ShuttleCard } from "@/components/shuttles/shuttle-card";
import { ShuttleTable } from "@/components/shuttles/shuttle-table";
import { inferShuttleEtaMinutes } from "@/lib/formatters";
import { SHUTTLE_STATUSES, SHUTTLE_STATUS_LABEL } from "@/types/enums";
import type { SortDirection, ViewMode } from "@/types/common";

const SORT_OPTIONS: SortOption[] = [
  { value: "shuttleNumber", label: "Number" },
  { value: "shuttleName", label: "Name" },
  { value: "capacity", label: "Capacity" },
  { value: "eta", label: "ETA" },
  { value: "lastSignal", label: "Last signal" },
];

export default function ShuttlesPage() {
  const {
    data: shuttles,
    isLoading: shuttlesLoading,
    isError: shuttlesError,
    refetch: refetchShuttles,
  } = useShuttles();
  const {
    data: locations,
    isLoading: locationsLoading,
    isError: locationsError,
    refetch: refetchLocations,
  } = useAllCurrentShuttleLocations();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState("eta");
  const [direction, setDirection] = useState<SortDirection>("asc");
  const [view, setView] = useState<ViewMode>("card");

  const rows = useMemo(() => {
    if (!shuttles) return [];

    const locationMap = new Map((locations ?? []).map((location) => [location.shuttleId, location]));

    let result = shuttles.map((shuttle) => {
      const location = locationMap.get(shuttle.id);
      const etaMinutes = inferShuttleEtaMinutes({
        status: shuttle.status,
        speed: location?.speed ?? null,
        hasLiveStop: Boolean(location?.currentStopName),
      });

      return { shuttle, location, etaMinutes };
    });

    result = result.filter(({ shuttle, location }) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        shuttle.shuttleName.toLowerCase().includes(query) ||
        shuttle.shuttleNumber.toLowerCase().includes(query) ||
        shuttle.driverName.toLowerCase().includes(query) ||
        (location?.currentStopName ?? "").toLowerCase().includes(query) ||
        (location?.direction ?? "").toLowerCase().includes(query);
      const matchesStatus = status === "ALL" || shuttle.status === status;
      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "shuttleNumber") {
        comparison = a.shuttle.shuttleNumber.localeCompare(b.shuttle.shuttleNumber);
      } else if (sortBy === "shuttleName") {
        comparison = a.shuttle.shuttleName.localeCompare(b.shuttle.shuttleName);
      } else if (sortBy === "capacity") {
        comparison = a.shuttle.capacity - b.shuttle.capacity;
      } else if (sortBy === "eta") {
        comparison = (a.etaMinutes ?? Number.MAX_SAFE_INTEGER) - (b.etaMinutes ?? Number.MAX_SAFE_INTEGER);
      } else if (sortBy === "lastSignal") {
        comparison =
          new Date(a.location?.lastUpdatedAt ?? a.shuttle.updatedAt).getTime() -
          new Date(b.location?.lastUpdatedAt ?? b.shuttle.updatedAt).getTime();
      }

      return direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [direction, locations, search, shuttles, sortBy, status]);

  const isLoading = shuttlesLoading || locationsLoading;
  const isError = shuttlesError || locationsError;

  const summary = useMemo(() => {
    const active = rows.filter((row) => row.shuttle.status === "ACTIVE").length;
    const live = rows.filter((row) => row.location).length;
    const avgEta = rows.length
      ? Math.round(
          rows.reduce((sum, row) => sum + (row.etaMinutes ?? 0), 0) / rows.length
        )
      : 0;

    return { active, live, avgEta };
  }, [rows]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Campus Transit"
        title="Shuttle Module"
        count={!isLoading && !isError ? rows.length : undefined}
        countLabel="shuttles"
        description="Live fleet visibility with shuttle list, detail drill-downs, ETA, route information, and responsive card or table views."
      />

      {!isLoading && !isError && rows.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            icon={BusFront}
            label="Active fleet"
            value={summary.active}
            description="Shuttles currently marked active by the backend."
          />
          <MetricCard
            icon={Signal}
            label="Live signals"
            value={summary.live}
            description="Vehicles with current location records available."
            accent="secondary"
          />
          <MetricCard
            icon={Clock3}
            label="Average ETA"
            value={summary.avgEta ? `${summary.avgEta} min` : "NA"}
            description="Client-side estimate derived from live speed and stop data."
            accent="accent"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by shuttle, driver, stop or direction..."
          />
          <FilterSelect
            value={status}
            onChange={setStatus}
            options={SHUTTLE_STATUSES.map((value) => ({
              value,
              label: SHUTTLE_STATUS_LABEL[value],
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
          description="Shuttle data couldn't be fetched from the backend. Confirm the API is running and NEXT_PUBLIC_API_BASE_URL is correct."
        />
      )}

      {!isLoading && !isError && rows.length === 0 && (
        <EmptyState
          icon={shuttles && shuttles.length > 0 ? <SearchX className="h-10 w-10 text-muted-foreground" /> : <TrafficCone className="h-10 w-10 text-muted-foreground" />}
          title={shuttles && shuttles.length > 0 ? "No shuttles match your filters" : "No shuttles yet"}
          description={
            shuttles && shuttles.length > 0
              ? "Try a different search term or clear the status filter."
              : "Shuttles created on the backend will show up here automatically."
          }
        />
      )}

      {!isLoading && !isError && rows.length > 0 && (
        <>
          {view === "card" ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {rows.map((row) => (
                  <ShuttleCard
                    key={row.shuttle.id}
                    shuttle={row.shuttle}
                    location={row.location}
                    etaMinutes={row.etaMinutes}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <ShuttleTable rows={rows} />
          )}
        </>
      )}
    </div>
  );
}
