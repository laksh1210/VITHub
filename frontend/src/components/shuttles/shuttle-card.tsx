"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, MapPinned, Route, UserRound, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ShuttleStatusBadge } from "./shuttle-status-badge";
import { formatDateTime, formatRelativeMinutes } from "@/lib/formatters";
import type { ShuttleLocationResponse } from "@/types/shuttle-location";
import type { ShuttleResponse } from "@/types/shuttle";

export function ShuttleCard({
  shuttle,
  location,
  etaMinutes,
}: {
  shuttle: ShuttleResponse;
  location?: ShuttleLocationResponse;
  etaMinutes: number | null;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Link href={`/shuttles/${shuttle.id}`} className="group block">
        <Card className="h-full overflow-hidden bg-gradient-to-br from-card via-card to-primary/[0.04] transition-all hover:border-primary/40 hover:shadow-[0_18px_60px_-32px_rgba(108,99,255,0.7)]">
          <div className="flex items-start justify-between p-5 pb-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Route className="h-[18px] w-[18px]" />
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold leading-tight">
                  {shuttle.shuttleName}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Shuttle <span className="font-mono">{shuttle.shuttleNumber}</span>
                </p>
              </div>
              <ShuttleStatusBadge status={shuttle.status} />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border/80 bg-background/50 p-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  ETA
                </p>
                <p className="mt-1 inline-flex items-center gap-2 text-xl font-semibold">
                  <Clock3 className="h-4 w-4 text-primary" />
                  {formatRelativeMinutes(etaMinutes)}
                </p>
              </div>
              <div className="rounded-xl border border-border/80 bg-background/50 p-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Capacity
                </p>
                <p className="mt-1 inline-flex items-center gap-2 text-xl font-semibold">
                  <Users className="h-4 w-4 text-primary" />
                  {shuttle.capacity}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPinned className="h-3.5 w-3.5 text-primary" />
                {location?.currentStopName ?? "Current stop unavailable"}
              </span>
              <span className="inline-flex items-center gap-2">
                <Route className="h-3.5 w-3.5 text-primary" />
                {location?.direction || "Direction unavailable"}
              </span>
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-3.5 w-3.5 text-primary" />
                {shuttle.driverName}
              </span>
            </div>

            {location && (
              <p className="mt-4 text-xs text-muted-foreground">
                Last signal {formatDateTime(location.lastUpdatedAt)}
              </p>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
