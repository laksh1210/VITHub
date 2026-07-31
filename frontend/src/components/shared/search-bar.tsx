"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const SearchBar = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, placeholder = "Search...", ...props }, ref) => {
    return (
      <div className={cn("relative w-full max-w-[384px]", className)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={ref}
          placeholder={placeholder}
          className="pl-9 bg-card"
          {...props}
        />
      </div>
    );
  }
);
SearchBar.displayName = "SearchBar";
