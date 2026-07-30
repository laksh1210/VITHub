"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowUpRight, Clock3, Store, TimerReset, Users } from "lucide-react";
import { useCanteenQueues } from "@/hooks/use-canteen-queues";
import { useCanteen } from "@/hooks/use-canteens";
import { BackLink } from "@/components/common/back-link";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { InfoRow } from "@/components/common/info-row";
import { SkeletonDetail } from "@/components/common/skeleton-grid";
import { StatusBadge } from "@/components/common/status-badge";
import { QueueStatusBadge } from "@/components/queues/queue-status-badge";
import { Card } from "@/components/ui/card";
import { formatDateTime, formatServiceWindow, formatShortDate } from "@/lib/formatters";

export default function CanteenDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: canteen, isLoading, isError, refetch } = useCanteen(id);
  const { data: queues, isLoading: queuesLoading, isError: queuesError } = useCanteenQueues();

  const queue = queues?.find((item) => item.canteenId === id);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <BackLink href="/canteens" label="Back to canteens" />

      {isLoading && <SkeletonDetail />}

      {isError && !isLoading && (
        <ErrorState
          description="This canteen couldn't be loaded. It may not exist, or the backend may be unreachable."
          onRetry={() => refetch()}
        />
      )}

      {canteen && !isLoading && !isError && (
        <>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Store className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">{canteen.name}</h1>
              <Link
                href={`/buildings/${canteen.buildingId}`}
                className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
              >
                {canteen.buildingName} ({canteen.buildingCode})
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <StatusBadge active={canteen.active} />
                {queue && <QueueStatusBadge status={queue.status} />}
              </div>
              {canteen.description && (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {canteen.description}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.95fr]">
            <Card className="bg-gradient-to-br from-card to-primary/[0.04]">
              <div className="p-5">
                <h2 className="text-sm font-semibold">Service window</h2>
                <div className="mt-4 rounded-xl border border-border/70 bg-background/40 p-4">
                  <p className="inline-flex items-center gap-2 text-lg font-semibold">
                    <Clock3 className="h-4 w-4 text-primary" />
                    {formatServiceWindow(canteen.openingTime, canteen.closingTime)}
                  </p>
                </div>
                <div className="mt-4">
                  <InfoRow
                    label="Opening time"
                    value={canteen.openingTime ? formatServiceWindow(canteen.openingTime, null) : "Not available"}
                  />
                  <InfoRow
                    label="Closing time"
                    value={canteen.closingTime ? formatServiceWindow(null, canteen.closingTime) : "Not available"}
                  />
                  <InfoRow label="Floor" value={canteen.floor ?? "-"} />
                  <InfoRow label="Seating capacity" value={canteen.seatingCapacity ?? "-"} />
                  <InfoRow label="Contact" value={canteen.contactNumber ?? "Not available"} />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-card to-secondary/[0.04]">
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold">Queue snapshot</h2>
                  {queue && (
                    <Link
                      href={`/queues/${queue.id}`}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Open queue
                    </Link>
                  )}
                </div>

                {queuesLoading && (
                  <div className="mt-4 rounded-xl border border-border/70 bg-background/40 p-4 text-sm text-muted-foreground">
                    Loading latest queue status...
                  </div>
                )}

                {!queuesLoading && queuesError && (
                  <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-muted-foreground">
                    Queue data couldn't be loaded right now.
                  </div>
                )}

                {!queuesLoading && !queuesError && !queue && (
                  <EmptyState
                    icon={TimerReset}
                    title="No queue snapshot yet"
                    description="Once the backend records a queue entry for this canteen, it will appear here."
                  />
                )}

                {!queuesLoading && queue && (
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-border/70 bg-background/40 p-4">
                        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                          Queue size
                        </p>
                        <p className="mt-2 inline-flex items-center gap-2 text-2xl font-semibold">
                          <Users className="h-4 w-4 text-primary" />
                          {queue.queueCount}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/70 bg-background/40 p-4">
                        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                          Wait time
                        </p>
                        <p className="mt-2 inline-flex items-center gap-2 text-2xl font-semibold">
                          <TimerReset className="h-4 w-4 text-primary" />
                          {queue.estimatedWaitMinutes !== null ? `${queue.estimatedWaitMinutes} min` : "NA"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <InfoRow label="Queue status" value={<QueueStatusBadge status={queue.status} />} />
                      <InfoRow label="Recorded at" value={formatDateTime(queue.recordedAt)} />
                      <InfoRow label="Updated at" value={formatDateTime(queue.updatedAt)} />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <Card>
            <div className="p-5">
              <h2 className="text-sm font-semibold">Record details</h2>
              <div className="mt-1">
                <InfoRow label="Building" value={`${canteen.buildingName} (${canteen.buildingCode})`} />
                <InfoRow label="Created" value={formatShortDate(canteen.createdAt)} />
                <InfoRow label="Last updated" value={formatShortDate(canteen.updatedAt)} />
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
