"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { SearchX, TimerReset } from "lucide-react";
import { useCanteenQueues } from "@/hooks/use-canteen-queues";
import { PageHeader } from "@/components/common/page-header";
import { SearchBar } from "@/components/common/search-bar";
import { FilterSelect } from "@/components/common/filter-select";
import { SortSelect, type SortOption } from "@/components/common/sort-select";
import { ViewToggle } from "@/components/common/view-toggle";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { SkeletonCardGrid, SkeletonTable } from "@/components/common/skeleton-grid";
import { QueueCard } from "@/components/queues/queue-card";
import { QueueTable } from "@/components/queues/queue-table";
import { Card } from "@/components/ui/card";
import {
  CANTEEN_QUEUE_STATUSES,
  CANTEEN_QUEUE_STATUS_LABEL,
  CANTEEN_QUEUE_STATUS_WEIGHT,
} from "@/lib/types/enums";
import type { SortDirection, ViewMode } from "@/lib/types/common";

const SORT_OPTIONS: SortOption[] = [
  { value: "queueCount", label: "Queue size" },
  { value: "estimatedWaitMinutes", label: "Wait time" },
  { value: "status", label: "Status" },
  { value: "recordedAt", label: "Recorded time" },
  { value: "canteenName", label: "Canteen" },
];

function QueuesPageContent() {
  const searchParams = useSearchParams();
  const initialCanteenId = searchParams.get("canteenId") ?? "ALL";

  const { data: queues, isLoading, isError, refetch } = useCanteenQueues();

  const [search, setSearch] = useState("");
  const [buildingId, setBuildingId] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [canteenId, setCanteenId] = useState(initialCanteenId);
  const [sortBy, setSortBy] = useState("queueCount");
  const [direction, setDirection] = useState<SortDirection>("desc");
  const [view, setView] = useState<ViewMode>("card");

  const buildingOptions = useMemo(() => {
    const uniqueBuildings = new Map<string, string>();

    for (const queue of queues ?? []) {
      uniqueBuildings.set(queue.buildingId, `${queue.buildingName} (${queue.buildingCode})`);
    }

    return Array.from(uniqueBuildings, ([value, label]) => ({ value, label })).sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  }, [queues]);

  const canteenOptions = useMemo(
    () =>
      (queues ?? [])
        .map((queue) => ({
          value: queue.canteenId,
          label: `${queue.canteenName} (${queue.buildingCode})`,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [queues]
  );

  const filtered = useMemo(() => {
    if (!queues) return [];

    let result = queues.filter((queue) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        queue.canteenName.toLowerCase().includes(query) ||
        queue.buildingName.toLowerCase().includes(query) ||
        queue.buildingCode.toLowerCase().includes(query);
      const matchesBuilding = buildingId === "ALL" || queue.buildingId === buildingId;
      const matchesStatus = status === "ALL" || queue.status === status;
      const matchesCanteen = canteenId === "ALL" || queue.canteenId === canteenId;

      return matchesSearch && matchesBuilding && matchesStatus && matchesCanteen;
    });

    result = [...result].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "queueCount") comparison = a.queueCount - b.queueCount;
      else if (sortBy === "estimatedWaitMinutes") {
        comparison = (a.estimatedWaitMinutes ?? 0) - (b.estimatedWaitMinutes ?? 0);
      } else if (sortBy === "status") {
        comparison = CANTEEN_QUEUE_STATUS_WEIGHT[a.status] - CANTEEN_QUEUE_STATUS_WEIGHT[b.status];
      } else if (sortBy === "recordedAt") {
        comparison = new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime();
      } else if (sortBy === "canteenName") {
        comparison = a.canteenName.localeCompare(b.canteenName);
      }

      return direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [buildingId, canteenId, direction, queues, search, sortBy, status]);

  const summary = useMemo(() => {
    const totalQueued = filtered.reduce((sum, queue) => sum + queue.queueCount, 0);
    const averageWait = filtered.length
      ? Math.round(
          filtered.reduce((sum, queue) => sum + (queue.estimatedWaitMinutes ?? 0), 0) /
            filtered.length
        )
      : 0;
    const pressureCount = filtered.filter(
      (queue) => queue.status === "HIGH" || queue.status === "VERY_HIGH"
    ).length;
    const largestQueue = filtered.reduce(
      (largest, queue) => Math.max(largest, queue.queueCount),
      0
    );

    return {
      totalQueued,
      averageWait,
      pressureCount,
      largestQueue,
    };
  }, [filtered]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Campus Dining"
        title="Queue Monitor"
        count={!isLoading && !isError ? filtered.length : undefined}
        countLabel="queues"
        description="Live dining pressure across campus canteens, with search, filters, sorting, cards and tables."
      />

      {!isLoading && !isError && filtered.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="bg-gradient-to-br from-card to-primary/[0.05] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              People queued
            </p>
            <p className="mt-2 text-2xl font-semibold">{summary.totalQueued}</p>
          </Card>
          <Card className="bg-gradient-to-br from-card to-secondary/[0.05] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Avg. wait
            </p>
            <p className="mt-2 text-2xl font-semibold">{summary.averageWait} min</p>
          </Card>
          <Card className="bg-gradient-to-br from-card to-warning/10 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              High pressure
            </p>
            <p className="mt-2 text-2xl font-semibold">{summary.pressureCount}</p>
          </Card>
          <Card className="bg-gradient-to-br from-card to-accent/[0.05] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Largest queue
            </p>
            <p className="mt-2 text-2xl font-semibold">{summary.largestQueue}</p>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by canteen, building or code..."
          />
          <FilterSelect
            value={buildingId}
            onChange={setBuildingId}
            options={buildingOptions}
            placeholder="Building"
            allLabel="All buildings"
          />
          <FilterSelect
            value={canteenId}
            onChange={setCanteenId}
            options={canteenOptions}
            placeholder="Canteen"
            allLabel="All canteens"
          />
          <FilterSelect
            value={status}
            onChange={setStatus}
            options={CANTEEN_QUEUE_STATUSES.map((value) => ({
              value,
              label: CANTEEN_QUEUE_STATUS_LABEL[value],
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
          description="Queue data couldn't be fetched from the backend. Confirm the API is running and NEXT_PUBLIC_API_BASE_URL is correct."
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <EmptyState
          icon={queues && queues.length > 0 ? SearchX : TimerReset}
          title={queues && queues.length > 0 ? "No queues match your filters" : "No queue records yet"}
          description={
            queues && queues.length > 0
              ? "Try a different search term or clear the building, canteen, or status filters."
              : "Queue snapshots created on the backend will show up here automatically."
          }
        />
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <>
          {view === "card" ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((queue) => (
                  <QueueCard key={queue.id} queue={queue} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <QueueTable queues={filtered} />
          )}
        </>
      )}
    </div>
  );
}

export default function QueuesPage() {
  return (
    <Suspense fallback={<SkeletonCardGrid />}>
      <QueuesPageContent />
    </Suspense>
  );
}
