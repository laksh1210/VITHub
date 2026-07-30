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
import { StatusBadge } from "@/components/common/status-badge";
import { formatServiceWindow } from "@/lib/formatters";
import type { CanteenResponse } from "@/lib/types/canteen";

export function CanteenTable({ canteens }: { canteens: CanteenResponse[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Canteen</TableHead>
            <TableHead>Building</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {canteens.map((canteen) => (
            <TableRow key={canteen.id} className="group">
              <TableCell>
                <Link href={`/canteens/${canteen.id}`} className="font-medium hover:text-primary">
                  {canteen.name}
                </Link>
                {canteen.description && (
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                    {canteen.description}
                  </p>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {canteen.buildingName}{" "}
                <span className="font-mono text-xs">({canteen.buildingCode})</span>
              </TableCell>
              <TableCell className="text-muted-foreground">{canteen.floor ?? "-"}</TableCell>
              <TableCell className="text-muted-foreground">
                {canteen.seatingCapacity ?? "-"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatServiceWindow(canteen.openingTime, canteen.closingTime)}
              </TableCell>
              <TableCell>
                <StatusBadge active={canteen.active} />
              </TableCell>
              <TableCell>
                <Link
                  href={`/canteens/${canteen.id}`}
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
