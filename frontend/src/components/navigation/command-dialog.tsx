"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function CommandDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-lg sm:max-w-[500px]">
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input 
            className="flex h-12 w-full rounded-md border-0 bg-transparent py-3 text-sm outline-none focus-visible:ring-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Type a command or search..."
            autoFocus
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 text-center text-sm">
          <div className="py-14 text-center text-sm text-muted-foreground">
            No results found. (Placeholder)
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
