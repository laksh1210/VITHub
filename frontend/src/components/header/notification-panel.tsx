"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export function NotificationPanel() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        <span className="sr-only">View notifications</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <DropdownMenuLabel className="font-normal flex items-center justify-between">
          <span className="font-semibold">Notifications</span>
          <Button variant="ghost" size="sm" className="h-auto text-xs text-muted-foreground px-2 py-1">
            Mark all as read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          <div className="flex flex-col p-2 space-y-1">
            {/* Placeholders */}
            {[1, 2, 3].map((i) => (
              <Button key={i} variant="ghost" className="h-auto flex flex-col items-start justify-start p-3 whitespace-normal text-left">
                <span className="text-sm font-medium">New Feature Available</span>
                <span className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  Check out the new dark mode setting in your profile preferences.
                </span>
                <span className="text-[10px] text-muted-foreground mt-2">2 hours ago</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
