"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AlertCircle, SearchX, ShieldAlert, Wrench } from "lucide-react";
import { useMyMaintenanceRequests } from "@/hooks/use-maintenance";
import { CreateComplaintForm } from "@/components/maintenance/create-complaint-form";
import { MaintenanceCard } from "@/components/maintenance/maintenance-card";
import { MaintenanceTable } from "@/components/maintenance/maintenance-table";
import { MetricCard } from "@/components/common/metric-card";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { FilterSelect } from "@/components/common/filter-select";
import { PageHeader } from "@/components/common/page-header";
import { SearchBar } from "@/components/common/search-bar";
import { SkeletonCardGrid, SkeletonTable } from "@/components/common/skeleton-grid";
import { SortSelect, type SortOption } from "@/components/common/sort-select";
import { ViewToggle } from "@/components/common/view-toggle";
import {
  MAINTENANCE_STATUSES,
  MAINTENANCE_STATUS_LABEL,
  PRIORITIES,
  PRIORITY_LABEL,
  PRIORITY_WEIGHT,
} from "@/lib/types/enums";
import type { SortDirection, ViewMode } from "@/lib/types/common";

const SORT_OPTIONS: SortOption[] = [
  { value: "updatedAt", label: "Updated" },
  { value: "createdAt", label: "Created" },
  { value: "priority", label: "Priority" },
  { value: "status", label: "Status" },
  { value: "title", label: "Title" },
];

const STATUS_WEIGHT = {
  OPEN: 1,
  IN_PROGRESS: 2,
  RESOLVED: 3,
  CLOSED: 4,
} as const;

export default function MaintenancePage() {
  const { data, isLoading, isError, refetch } = useMyMaintenanceRequests();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [direction, setDirection] = useState<SortDirection>("desc");
  const [view, setView] = useState<ViewMode>("card");

  const requests = useMemo(() => {
    if (!data) return [];

    let result = data.filter((request) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        request.title.toLowerCase().includes(query) ||
        request.description.toLowerCase().includes(query) ||
        request.category.toLowerCase().includes(query) ||
        (request.buildingName ?? "").toLowerCase().includes(query) ||
        (request.roomNumber ?? "").toLowerCase().includes(query);
      const matchesStatus = status === "ALL" || request.status === status;
      const matchesPriority = priority === "ALL" || request.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    result = [...result].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "updatedAt") {
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      } else if (sortBy === "createdAt") {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === "priority") {
        comparison = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
      } else if (sortBy === "status") {
        comparison = STATUS_WEIGHT[a.status] - STATUS_WEIGHT[b.status];
      } else if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      }

      return direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [data, direction, priority, search, sortBy, status]);

  const summary = useMemo(() => {
    const openCount = requests.filter((request) => request.status === "OPEN").length;
    const criticalCount = requests.filter(
      (request) => request.priority === "CRITICAL"
    ).length;
    const resolvedCount = requests.filter(
      (request) => request.status === "RESOLVED" || request.status === "CLOSED"
    ).length;

    return { openCount, criticalCount, resolvedCount };
  }, [requests]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Campus Maintenance"
        title="Maintenance Module"
        count={!isLoading && !isError ? requests.length : undefined}
        countLabel="complaints"
        description="Track your maintenance complaints, create new ones, and inspect status, priority, and timeline details."
      />

      <CreateComplaintForm />

      {!isLoading && !isError && requests.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            icon={Wrench}
            label="Open issues"
            value={summary.openCount}
            description="Complaints still awaiting active work."
          />
          <MetricCard
            icon={ShieldAlert}
            label="Critical"
            value={summary.criticalCount}
            description="Requests flagged as highest urgency."
            accent="warning"
          />
          <MetricCard
            icon={AlertCircle}
            label="Resolved"
            value={summary.resolvedCount}
            description="Complaints already resolved or closed."
            accent="secondary"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by title, category, description or location..."
          />
          <FilterSelect
            value={status}
            onChange={setStatus}
            options={MAINTENANCE_STATUSES.map((value) => ({
              value,
              label: MAINTENANCE_STATUS_LABEL[value],
            }))}
            placeholder="Status"
            allLabel="All statuses"
          />
          <FilterSelect
            value={priority}
            onChange={setPriority}
            options={PRIORITIES.map((value) => ({
              value,
              label: PRIORITY_LABEL[value],
            }))}
            placeholder="Priority"
            allLabel="All priorities"
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
          description="Maintenance complaints couldn't be loaded. Make sure you're authenticated and NEXT_PUBLIC_API_BASE_URL is correct."
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && requests.length === 0 && (
        <EmptyState
          icon={data && data.length > 0 ? SearchX : Wrench}
          title={data && data.length > 0 ? "No complaints match your filters" : "No complaints yet"}
          description={
            data && data.length > 0
              ? "Try a different search term or clear the status and priority filters."
              : "Your maintenance complaints will appear here once the backend returns them."
          }
        />
      )}

      {!isLoading && !isError && requests.length > 0 && (
        <>
          {view === "card" ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {requests.map((request) => (
                  <MaintenanceCard key={request.id} request={request} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <MaintenanceTable requests={requests} />
          )}
        </>
      )}
    </div>
  );
}
