"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, MapPin, TimerReset, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { QueueStatusBadge } from "./queue-status-badge";
import { formatDateTime } from "@/lib/formatters";
import type { CanteenQueueResponse } from "@/lib/types/canteen-queue";

export function QueueCard({ queue }: { queue: CanteenQueueResponse }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Link href={`/queues/${queue.id}`} className="group block">
        <Card className="h-full overflow-hidden bg-gradient-to-br from-card via-card to-secondary/[0.05] transition-all hover:border-primary/40 hover:shadow-[0_18px_60px_-32px_rgba(167,139,250,0.6)]">
          <div className="flex items-start justify-between p-5 pb-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <TimerReset className="h-[18px] w-[18px]" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
          </div>

          <div className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold leading-tight">{queue.canteenName}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {queue.buildingName} · <span className="font-mono">{queue.buildingCode}</span>
                </p>
              </div>
              <QueueStatusBadge status={queue.status} />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border/80 bg-background/50 p-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Queue size
                </p>
                <p className="mt-1 inline-flex items-center gap-2 text-xl font-semibold">
                  <Users className="h-4 w-4 text-primary" />
                  {queue.queueCount}
                </p>
              </div>
              <div className="rounded-xl border border-border/80 bg-background/50 p-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Estimated wait
                </p>
                <p className="mt-1 inline-flex items-center gap-2 text-xl font-semibold">
                  <Clock3 className="h-4 w-4 text-primary" />
                  {queue.estimatedWaitMinutes !== null ? `${queue.estimatedWaitMinutes} min` : "NA"}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {queue.buildingName}
              </span>
              <span className="inline-flex items-center gap-2">
                <TimerReset className="h-3.5 w-3.5 text-primary" />
                Recorded {formatDateTime(queue.recordedAt)}
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
