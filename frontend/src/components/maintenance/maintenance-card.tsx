"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, Building2, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MaintenanceStatusBadge } from "./maintenance-status-badge";
import { PriorityBadge } from "./priority-badge";
import type { MaintenanceRequestResponse } from "@/types/maintenance";
import { formatDateTime } from "@/lib/formatters";

export function MaintenanceCard({
  request,
}: {
  request: MaintenanceRequestResponse;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Link href={`/maintenance/${request.id}`} className="group block">
        <Card className="h-full overflow-hidden bg-gradient-to-br from-card via-card to-primary/[0.04] transition-all hover:border-primary/40 hover:shadow-[0_18px_60px_-32px_rgba(108,99,255,0.7)]">
          <div className="flex items-start justify-between p-5 pb-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Wrench className="h-[18px] w-[18px]" />
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
          </div>

          <div className="p-5">
            <h3 className="text-base font-semibold leading-tight">{request.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {request.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <MaintenanceStatusBadge status={request.status} />
              <PriorityBadge priority={request.priority} />
            </div>

            <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <AlertCircle className="h-3.5 w-3.5 text-primary" />
                {request.category}
              </span>
              <span className="inline-flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                {request.buildingName ?? "No building attached"}
                {request.roomNumber ? ` · Room ${request.roomNumber}` : ""}
              </span>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Updated {formatDateTime(request.updatedAt)}
            </p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
