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
import { MaintenanceStatusBadge } from "./maintenance-status-badge";
import { PriorityBadge } from "./priority-badge";
import type { MaintenanceRequestResponse } from "@/lib/types/maintenance";
import { formatDateTime } from "@/lib/formatters";

export function MaintenanceTable({
  requests,
}: {
  requests: MaintenanceRequestResponse[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Complaint</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Reporter</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id} className="group">
              <TableCell>
                <Link
                  href={`/maintenance/${request.id}`}
                  className="font-medium hover:text-primary"
                >
                  {request.title}
                </Link>
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                  {request.category}
                </p>
              </TableCell>
              <TableCell>
                <MaintenanceStatusBadge status={request.status} />
              </TableCell>
              <TableCell>
                <PriorityBadge priority={request.priority} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {request.buildingName ?? "No building"}
                <p className="mt-1 text-xs">
                  {request.roomNumber ? `Room ${request.roomNumber}` : "No room"}
                </p>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {request.reporterFullName}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDateTime(request.updatedAt)}
              </TableCell>
              <TableCell>
                <Link
                  href={`/maintenance/${request.id}`}
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
