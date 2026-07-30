"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SearchX, Store } from "lucide-react";
import { useCanteens } from "@/hooks/api/use-canteens";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";
import { FilterSelect } from "@/components/shared/filter-select";
import { SortSelect, type SortOption } from "@/components/shared/sort-select";
import { ViewToggle } from "@/components/shared/view-toggle";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { SkeletonCardGrid, SkeletonTable } from "@/components/shared/skeleton-grid";
import { CanteenCard } from "@/components/canteens/canteen-card";
import { CanteenTable } from "@/components/canteens/canteen-table";
import { Card } from "@/components/ui/card";
import { formatClockTime } from "@/lib/formatters";
import type { SortDirection, ViewMode } from "@/types/common";

const SORT_OPTIONS: SortOption[] = [
  { value: "name", label: "Name" },
  { value: "seatingCapacity", label: "Capacity" },
  { value: "floor", label: "Floor" },
  { value: "openingTime", label: "Opening time" },
];

export default function CanteensPage() {
  const { data: canteens, isLoading, isError } = useCanteens();

  const [search, setSearch] = useState("");
  const [buildingId, setBuildingId] = useState("ALL");
  const [activity, setActivity] = useState("ALL");
  const [sortBy, setSortBy] = useState("name");
  const [direction, setDirection] = useState<SortDirection>("asc");
  const [view, setView] = useState<ViewMode>("card");

  const buildingOptions = useMemo(() => {
    const uniqueBuildings = new Map<string, string>();

    for (const canteen of canteens ?? []) {
      uniqueBuildings.set(
        canteen.buildingId,
        `${canteen.buildingName} (${canteen.buildingCode})`
      );
    }

    return Array.from(uniqueBuildings, ([value, label]) => ({ value, label })).sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  }, [canteens]);

  const filtered = useMemo(() => {
    if (!canteens) return [];

    let result = canteens.filter((canteen) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        canteen.name.toLowerCase().includes(query) ||
        canteen.buildingName.toLowerCase().includes(query) ||
        canteen.buildingCode.toLowerCase().includes(query) ||
        (canteen.description ?? "").toLowerCase().includes(query);
      const matchesBuilding = buildingId === "ALL" || canteen.buildingId === buildingId;
      const matchesActivity =
        activity === "ALL" ||
        (activity === "ACTIVE" && canteen.active) ||
        (activity === "INACTIVE" && !canteen.active);

      return matchesSearch && matchesBuilding && matchesActivity;
    });

    result = [...result].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "name") comparison = a.name.localeCompare(b.name);
      else if (sortBy === "seatingCapacity") {
        comparison = (a.seatingCapacity ?? 0) - (b.seatingCapacity ?? 0);
      } else if (sortBy === "floor") {
        comparison = (a.floor ?? 0) - (b.floor ?? 0);
      } else if (sortBy === "openingTime") {
        comparison = (a.openingTime ?? "").localeCompare(b.openingTime ?? "");
      }

      return direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [activity, buildingId, canteens, direction, search, sortBy]);

  const summary = useMemo(() => {
    const activeCount = filtered.filter((canteen) => canteen.active).length;
    const totalSeats = filtered.reduce(
      (sum, canteen) => sum + (canteen.seatingCapacity ?? 0),
      0
    );
    const earliestOpening = filtered
      .map((canteen) => canteen.openingTime)
      .filter((value): value is string => Boolean(value))
      .sort()[0];

    return {
      activeCount,
      totalSeats,
      earliestOpening,
    };
  }, [filtered]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Campus Dining"
        title="Canteens"
        count={!isLoading && !isError ? filtered.length : undefined}
        countLabel="canteens"
        description="Dining spots across campus, with availability details and polished list or table views."
      />

      {!isLoading && !isError && filtered.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-card to-primary/[0.05] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Active now
            </p>
            <p className="mt-2 text-2xl font-semibold">{summary.activeCount}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Currently serving students across the filtered results.
            </p>
          </Card>
          <Card className="bg-gradient-to-br from-card to-secondary/[0.05] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Total seating
            </p>
            <p className="mt-2 text-2xl font-semibold">{summary.totalSeats}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Combined known seating capacity for the visible canteens.
            </p>
          </Card>
          <Card className="bg-gradient-to-br from-card to-accent/[0.05] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Earliest opening
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {summary.earliestOpening ? formatClockTime(summary.earliestOpening) : "NA"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              First service window among the visible canteens.
            </p>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by canteen, building, code or description..."
          />
          <FilterSelect
            value={buildingId}
            onChange={setBuildingId}
            options={buildingOptions}
            placeholder="Building"
            allLabel="All buildings"
          />
          <FilterSelect
            value={activity}
            onChange={setActivity}
            options={[
              { value: "ACTIVE", label: "Active only" },
              { value: "INACTIVE", label: "Inactive only" },
            ]}
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
          description="Canteens couldn't be fetched from the backend. Confirm the API is running and NEXT_PUBLIC_API_BASE_URL is correct."
          
        />
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <EmptyState
          icon={canteens && canteens.length > 0 ? <SearchX className="h-10 w-10 text-muted-foreground" /> : <Store className="h-10 w-10 text-muted-foreground" />}
          title={canteens && canteens.length > 0 ? "No canteens match your filters" : "No canteens yet"}
          description={
            canteens && canteens.length > 0
              ? "Try a different search term or clear the building and status filters."
              : "Canteens created on the backend will show up here automatically."
          }
        />
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <>
          {view === "card" ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((canteen) => (
                  <CanteenCard key={canteen.id} canteen={canteen} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <CanteenTable canteens={filtered} />
          )}
        </>
      )}
    </div>
  );
}
