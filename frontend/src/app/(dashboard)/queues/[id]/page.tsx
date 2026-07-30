"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowUpRight, Clock3, Store, TimerReset, Users } from "lucide-react";
import { useCanteenQueue } from "@/hooks/api/use-canteen-queues";
import { useCanteen } from "@/hooks/api/use-canteens";
import { BackLink } from "@/components/shared/back-link";
import { ErrorState } from "@/components/feedback/error-state";
import { InfoRow } from "@/components/shared/info-row";
import { SkeletonDetail } from "@/components/shared/skeleton-grid";
import { QueueStatusBadge } from "@/components/queues/queue-status-badge";
import { Card } from "@/components/ui/card";
import { formatDateTime, formatServiceWindow, formatShortDate } from "@/lib/formatters";

export default function QueueDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: queue, isLoading, isError } = useCanteenQueue(id);
  const { data: canteen } = useCanteen(queue?.canteenId ?? "");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <BackLink href="/queues" label="Back to queue monitor" />

      {isLoading && <SkeletonDetail />}

      {isError && !isLoading && (
        <ErrorState
          description="This queue snapshot couldn't be loaded. It may not exist, or the backend may be unreachable."
          
        />
      )}

      {queue && !isLoading && !isError && (
        <>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <TimerReset className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
                {queue.canteenName} Queue
              </h1>
              <Link
                href={`/canteens/${queue.canteenId}`}
                className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
              >
                Open canteen details
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <QueueStatusBadge status={queue.status} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.9fr]">
            <Card className="bg-gradient-to-br from-card to-secondary/[0.05]">
              <div className="p-5">
                <h2 className="text-sm font-semibold">Live queue snapshot</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
                      Estimated wait
                    </p>
                    <p className="mt-2 inline-flex items-center gap-2 text-2xl font-semibold">
                      <Clock3 className="h-4 w-4 text-primary" />
                      {queue.estimatedWaitMinutes !== null ? `${queue.estimatedWaitMinutes} min` : "NA"}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <InfoRow label="Queue status" value={<QueueStatusBadge status={queue.status} />} />
                  <InfoRow label="Recorded at" value={formatDateTime(queue.recordedAt)} />
                  <InfoRow label="Created" value={formatDateTime(queue.createdAt)} />
                  <InfoRow label="Last updated" value={formatDateTime(queue.updatedAt)} />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-card to-primary/[0.04]">
              <div className="p-5">
                <h2 className="text-sm font-semibold">Canteen context</h2>
                <div className="mt-4 rounded-xl border border-border/70 bg-background/40 p-4">
                  <p className="inline-flex items-center gap-2 text-lg font-semibold">
                    <Store className="h-4 w-4 text-primary" />
                    {queue.canteenName}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {queue.buildingName} ({queue.buildingCode})
                  </p>
                </div>

                <div className="mt-4">
                  <InfoRow label="Building" value={`${queue.buildingName} (${queue.buildingCode})`} />
                  <InfoRow
                    label="Service window"
                    value={
                      canteen
                        ? formatServiceWindow(canteen.openingTime, canteen.closingTime)
                        : "Loading canteen hours..."
                    }
                  />
                  <InfoRow
                    label="Seating capacity"
                    value={canteen?.seatingCapacity ?? "Not available"}
                  />
                  <InfoRow label="Queue date" value={formatShortDate(queue.recordedAt)} />
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
