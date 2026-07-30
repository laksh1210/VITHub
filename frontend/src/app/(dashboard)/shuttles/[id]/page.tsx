"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowUpRight,
  BusFront,
  Clock3,
  MapPinned,
  Navigation,
  Phone,
  Route,
  Waves,
} from "lucide-react";
import { useLatestShuttleLocation, useShuttleLocationHistory } from "@/hooks/api/use-shuttle-locations";
import { useShuttle } from "@/hooks/api/use-shuttles";
import { BackLink } from "@/components/shared/back-link";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { InfoRow } from "@/components/shared/info-row";
import { MetricCard } from "@/components/shared/metric-card";
import { SkeletonCardGrid, SkeletonDetail } from "@/components/shared/skeleton-grid";
import { ShuttleStatusBadge } from "@/components/shuttles/shuttle-status-badge";
import { Card } from "@/components/ui/card";
import {
  formatDateTime,
  formatRelativeMinutes,
  inferShuttleEtaMinutes,
} from "@/lib/formatters";

export default function ShuttleDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: shuttle, isLoading, isError } = useShuttle(id);
  const { data: latestLocation, isLoading: latestLoading } = useLatestShuttleLocation(id);
  const { data: history, isLoading: historyLoading } = useShuttleLocationHistory(id);

  const etaMinutes = inferShuttleEtaMinutes({
    status: shuttle?.status ?? "INACTIVE",
    speed: latestLocation?.speed ?? null,
    hasLiveStop: Boolean(latestLocation?.currentStopName),
  });

  const routePoints = (history ?? []).reduce<string[]>((acc, entry) => {
    const point =
      entry.currentStopName?.trim() ||
      `${entry.latitude.toFixed(4)}, ${entry.longitude.toFixed(4)}`;

    if (!acc.includes(point)) {
      acc.push(point);
    }

    return acc;
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <BackLink href="/shuttles" label="Back to shuttles" />

      {isLoading && <SkeletonDetail />}

      {isError && !isLoading && (
        <ErrorState
          description="This shuttle couldn't be loaded. It may not exist, or the backend may be unreachable."
          
        />
      )}

      {shuttle && !isLoading && !isError && (
        <>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <BusFront className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
                {shuttle.shuttleName}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Shuttle <span className="font-mono">{shuttle.shuttleNumber}</span>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <ShuttleStatusBadge status={shuttle.status} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={Clock3}
              label="ETA"
              value={formatRelativeMinutes(etaMinutes)}
              description="Client-side estimate derived from the live speed feed."
            />
            <MetricCard
              icon={Waves}
              label="Live speed"
              value={latestLocation ? `${Math.round(latestLocation.speed)} km/h` : "NA"}
              description="Current backend-reported speed from the latest location signal."
              accent="secondary"
            />
            <MetricCard
              icon={Navigation}
              label="Current stop"
              value={latestLocation?.currentStopName ?? "Unavailable"}
              description="Most recent stop name available from the live route feed."
              accent="accent"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <Card className="bg-gradient-to-br from-card to-primary/[0.04]">
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold">Route information</h2>
                  {latestLocation && (
                    <p className="text-xs text-muted-foreground">
                      Last updated {formatDateTime(latestLocation.lastUpdatedAt)}
                    </p>
                  )}
                </div>

                {latestLoading && (
                  <div className="mt-4 rounded-xl border border-border/70 bg-background/40 p-4 text-sm text-muted-foreground">
                    Loading live route signal...
                  </div>
                )}

                {!latestLoading && !latestLocation && (
                  <EmptyState
                    icon={<MapPinned className="h-10 w-10 text-muted-foreground" />}
                    title="No live route signal yet"
                    description="Once the backend records a shuttle location, route and ETA details will appear here."
                  />
                )}

                {latestLocation && (
                  <div className="mt-4">
                    <InfoRow label="Current stop" value={latestLocation.currentStopName ?? "Unavailable"} />
                    <InfoRow label="Direction" value={latestLocation.direction || "Unavailable"} />
                    <InfoRow
                      label="Coordinates"
                      value={`${latestLocation.latitude.toFixed(4)}, ${latestLocation.longitude.toFixed(4)}`}
                    />
                    <InfoRow
                      label="Estimated arrival"
                      value={formatRelativeMinutes(etaMinutes)}
                    />
                    <InfoRow
                      label="Signal time"
                      value={formatDateTime(latestLocation.lastUpdatedAt)}
                    />
                  </div>
                )}
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-card to-secondary/[0.04]">
              <div className="p-5">
                <h2 className="text-sm font-semibold">Shuttle details</h2>
                <div className="mt-4">
                  <InfoRow label="Driver" value={shuttle.driverName} />
                  <InfoRow
                    label="Driver contact"
                    value={
                      <a
                        href={`tel:${shuttle.driverContact}`}
                        className="inline-flex items-center gap-1 hover:text-primary"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {shuttle.driverContact}
                      </a>
                    }
                  />
                  <InfoRow label="Capacity" value={shuttle.capacity} />
                  <InfoRow label="Created" value={formatDateTime(shuttle.createdAt)} />
                  <InfoRow label="Last updated" value={formatDateTime(shuttle.updatedAt)} />
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold">Recent route trail</h2>
                <Link href="/shuttles" className="text-xs font-medium text-primary hover:underline">
                  Back to list
                  <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
                </Link>
              </div>

              {historyLoading && <div className="mt-4"><SkeletonCardGrid count={3} /></div>}

              {!historyLoading && routePoints.length === 0 && (
                <div className="mt-4">
                  <EmptyState
                    icon={<Route className="h-10 w-10 text-muted-foreground" />}
                    title="No route trail recorded yet"
                    description="Once the backend captures historical location points, the recent route trail will appear here."
                  />
                </div>
              )}

              {!historyLoading && routePoints.length > 0 && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {routePoints.slice(0, 6).map((point, index) => (
                    <div
                      key={`${point}-${index}`}
                      className="rounded-xl border border-border/70 bg-background/40 p-4"
                    >
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        Route point {index + 1}
                      </p>
                      <p className="mt-2 text-sm font-medium">{point}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Card>
            <div className="p-5">
              <h2 className="text-sm font-semibold">ETA note</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                ETA is inferred client-side from the latest speed and stop signal because the
                current backend API exposes route telemetry but no dedicated ETA field.
              </p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
