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
import { QueueStatusBadge } from "./queue-status-badge";
import { formatDateTime } from "@/lib/formatters";
import type { CanteenQueueResponse } from "@/types/canteen-queue";

export function QueueTable({ queues }: { queues: CanteenQueueResponse[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Canteen</TableHead>
            <TableHead>Building</TableHead>
            <TableHead>Queue size</TableHead>
            <TableHead>Wait</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Recorded</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {queues.map((queue) => (
            <TableRow key={queue.id} className="group">
              <TableCell>
                <Link href={`/queues/${queue.id}`} className="font-medium hover:text-primary">
                  {queue.canteenName}
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {queue.buildingName}{" "}
                <span className="font-mono text-xs">({queue.buildingCode})</span>
              </TableCell>
              <TableCell className="text-muted-foreground">{queue.queueCount}</TableCell>
              <TableCell className="text-muted-foreground">
                {queue.estimatedWaitMinutes !== null ? `${queue.estimatedWaitMinutes} min` : "-"}
              </TableCell>
              <TableCell>
                <QueueStatusBadge status={queue.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDateTime(queue.recordedAt)}
              </TableCell>
              <TableCell>
                <Link
                  href={`/queues/${queue.id}`}
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
