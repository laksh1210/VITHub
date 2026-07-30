"use client";

import { ArrowDownAZ, ArrowDownZA, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SelectOption, SortDirection } from "@/types/common";

export type SortOption = SelectOption;

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  direction: SortDirection;
  onDirectionToggle: () => void;
  options: SortOption[];
  className?: string;
}

export function SortSelect({ value, onChange, direction, onDirectionToggle, options, className }: SortSelectProps) {
  const DirectionIcon = direction === "asc" ? ArrowDownAZ : ArrowDownZA;

  return (
    <div className={className ?? "flex items-center gap-2"}>
      <Select value={value} onValueChange={(val) => onChange(val || "")}>
        <SelectTrigger className="w-36" aria-label="Sort by">
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="button" variant="outline" size="icon" aria-label={`Sort ${direction === "asc" ? "descending" : "ascending"}`} onClick={onDirectionToggle}>
        <DirectionIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
