import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export function TableContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-md border bg-card", className)}>
      {children}
    </div>
  );
}

export function TableToolbar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between p-4 border-b", className)}>
      {children}
    </div>
  );
}

export function PaginationWrapper({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-between px-4 py-3 border-t bg-muted/20", className)}>
      <div className="flex-1 text-sm text-muted-foreground">
        Showing 1 to 10 of 97 results
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="h-8 w-8" disabled>
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" disabled>
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <span className="sr-only">Go to last page</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
