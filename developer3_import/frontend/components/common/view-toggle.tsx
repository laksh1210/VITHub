"use client";

import { Grid2X2, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ViewMode } from "@/lib/types/common";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ value, onChange, className }: ViewToggleProps) {
  return (
    <div className={cn("flex items-center rounded-md border border-input p-1", className)} aria-label="View mode">
      <Button type="button" variant={value === "card" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" aria-label="Card view" aria-pressed={value === "card"} onClick={() => onChange("card")}>
        <Grid2X2 className="h-4 w-4" />
      </Button>
      <Button type="button" variant={value === "table" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" aria-label="Table view" aria-pressed={value === "table"} onClick={() => onChange("table")}>
        <Table2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
