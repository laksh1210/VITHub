"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowUpRight, Building2, UserRound, Wrench } from "lucide-react";
import { useMaintenanceRequest } from "@/hooks/use-maintenance";
import { BackLink } from "@/components/common/back-link";
import { ErrorState } from "@/components/common/error-state";
import { InfoRow } from "@/components/common/info-row";
import { MetricCard } from "@/components/common/metric-card";
import { SkeletonDetail } from "@/components/common/skeleton-grid";
import { MaintenanceStatusBadge } from "@/components/maintenance/maintenance-status-badge";
import { PriorityBadge } from "@/components/maintenance/priority-badge";
import { StatusTimeline } from "@/components/maintenance/status-timeline";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/formatters";

export default function MaintenanceDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: request, isLoading, isError, refetch } = useMaintenanceRequest(id);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <BackLink href="/maintenance" label="Back to maintenance" />

      {isLoading && <SkeletonDetail />}

      {isError && !isLoading && (
        <ErrorState
          description="This maintenance complaint couldn't be loaded. It may not exist, or the backend may be unreachable."
          onRetry={() => refetch()}
        />
      )}

      {request && !isLoading && !isError && (
        <>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Wrench className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
                {request.title}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{request.category}</p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <MaintenanceStatusBadge status={request.status} />
                <PriorityBadge priority={request.priority} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={Wrench}
              label="Status"
              value={<MaintenanceStatusBadge status={request.status} />}
              description="Current backend-reported complaint status."
            />
            <MetricCard
              icon={Building2}
              label="Location"
              value={request.buildingName ?? "No building"}
              description={
                request.roomNumber ? `Room ${request.roomNumber}` : "No room attached"
              }
              accent="secondary"
            />
            <MetricCard
              icon={UserRound}
              label="Reporter"
              value={request.reporterFullName}
              description={`@${request.reporterUsername}`}
              accent="accent"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <Card className="bg-gradient-to-br from-card to-primary/[0.04]">
              <div className="p-5">
                <h2 className="text-sm font-semibold">Complaint details</h2>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {request.description}
                </p>
                <div className="mt-4">
                  <InfoRow label="Category" value={request.category} />
                  <InfoRow label="Priority" value={<PriorityBadge priority={request.priority} />} />
                  <InfoRow
                    label="Building"
                    value={
                      request.buildingId && request.buildingName ? (
                        <Link
                          href={`/buildings/${request.buildingId}`}
                          className="inline-flex items-center gap-1 hover:text-primary"
                        >
                          {request.buildingName}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        "Not attached"
                      )
                    }
                  />
                  <InfoRow label="Room" value={request.roomNumber ?? "Not attached"} />
                  <InfoRow label="Created" value={formatDateTime(request.createdAt)} />
                  <InfoRow label="Last updated" value={formatDateTime(request.updatedAt)} />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-card to-secondary/[0.04]">
              <div className="p-5">
                <h2 className="text-sm font-semibold">Status timeline</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Timeline is derived from the current status and available timestamps because the backend API does not expose a full audit log.
                </p>
                <div className="mt-4">
                  <StatusTimeline
                    status={request.status}
                    createdAt={request.createdAt}
                    updatedAt={request.updatedAt}
                  />
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <div className="p-5">
              <h2 className="text-sm font-semibold">Assignment</h2>
              <div className="mt-1">
                <InfoRow label="Reporter" value={request.reporterFullName} />
                <InfoRow
                  label="Assigned staff"
                  value={request.assignedStaffFullName ?? "Not assigned"}
                />
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
