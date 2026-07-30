"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { useSidebar } from "@/contexts/sidebar-context";
import { Button } from "@/components/ui/button";
import { CommandPalettePlaceholder } from "@/components/shared/command-palette-placeholder";
import { NotificationPanel } from "./notification-panel";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenuPlaceholder } from "@/components/shared/user-menu-placeholder";
import { CommandDialog } from "@/components/navigation/command-dialog";
import { Brand } from "@/components/layout/brand";

export function AppHeader() {
  const { toggleMobileOpen, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-xl">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleMobileOpen} className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        )}
        
        {isMobile && <Brand className="md:hidden" />}

        <div className="flex w-full items-center justify-end gap-2 md:justify-between">
          <div className="hidden md:flex flex-1" onClick={() => setCommandOpen(true)}>
            <CommandPalettePlaceholder />
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NotificationPanel />
            {!isMobile && <UserMenuPlaceholder />}
          </div>
        </div>
      </header>
      
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
