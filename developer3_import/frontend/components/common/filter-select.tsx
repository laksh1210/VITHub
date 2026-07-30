"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SelectOption } from "@/lib/types/common";
import { cn } from "@/lib/utils";

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  allLabel: string;
  disabled?: boolean;
  className?: string;
}

export function FilterSelect({ value, onChange, options, placeholder, allLabel, disabled, className }: FilterSelectProps) {
  const allValue = allLabel.trim().toLowerCase().startsWith("no ") ? "NONE" : "ALL";
  const safeOptions = options.filter((option) => option.value.trim().length > 0);

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={cn("w-full sm:w-44", className)} aria-label={placeholder}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={allValue}>{allLabel}</SelectItem>
        {safeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
