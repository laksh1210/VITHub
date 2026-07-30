import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShuttleStatusBadge } from "./shuttle-status-badge";
import { formatDateTime, formatRelativeMinutes } from "@/lib/formatters";
import type { ShuttleLocationResponse } from "@/lib/types/shuttle-location";
import type { ShuttleResponse } from "@/lib/types/shuttle";

export function ShuttleTable({
  rows,
}: {
  rows: Array<{
    shuttle: ShuttleResponse;
    location?: ShuttleLocationResponse;
    etaMinutes: number | null;
  }>;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Shuttle</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>ETA</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Last signal</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ shuttle, location, etaMinutes }) => (
            <TableRow key={shuttle.id} className="group">
              <TableCell>
                <Link href={`/shuttles/${shuttle.id}`} className="font-medium hover:text-primary">
                  {shuttle.shuttleName}
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">
                  {shuttle.shuttleNumber} · {shuttle.capacity} seats
                </p>
              </TableCell>
              <TableCell>
                <ShuttleStatusBadge status={shuttle.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatRelativeMinutes(etaMinutes)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {location?.currentStopName ?? "Unavailable"}
                <p className="mt-1 text-xs">{location?.direction || "No live route info"}</p>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {shuttle.driverName}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {location ? formatDateTime(location.lastUpdatedAt) : "No live signal"}
              </TableCell>
              <TableCell>
                <Link
                  href={`/shuttles/${shuttle.id}`}
                  className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
