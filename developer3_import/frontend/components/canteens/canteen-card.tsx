"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, Layers, Phone, UtensilsCrossed, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import { formatServiceWindow } from "@/lib/formatters";
import type { CanteenResponse } from "@/lib/types/canteen";

export function CanteenCard({ canteen }: { canteen: CanteenResponse }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Link href={`/canteens/${canteen.id}`} className="group block">
        <Card className="h-full overflow-hidden bg-gradient-to-br from-card via-card to-primary/[0.04] transition-all hover:border-primary/40 hover:shadow-[0_18px_60px_-32px_rgba(108,99,255,0.7)]">
          <div className="flex items-start justify-between p-5 pb-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <UtensilsCrossed className="h-[18px] w-[18px]" />
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
          </div>

          <div className="p-5">
            <h3 className="text-base font-semibold leading-tight">{canteen.name}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {canteen.buildingName} · <span className="font-mono">{canteen.buildingCode}</span>
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <StatusBadge active={canteen.active} />
            </div>

            <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {canteen.description?.trim() || "Fast access to daily meals, snacks, and campus breaks."}
            </p>

            <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-3.5 w-3.5 text-primary" />
                {formatServiceWindow(canteen.openingTime, canteen.closingTime)}
              </span>

              <div className="flex flex-wrap items-center gap-4">
                {canteen.floor !== null && (
                  <span className="inline-flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5" />
                    Floor {canteen.floor}
                  </span>
                )}
                {canteen.seatingCapacity !== null && (
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {canteen.seatingCapacity} seats
                  </span>
                )}
              </div>

              {canteen.contactNumber && (
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  {canteen.contactNumber}
                </span>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
