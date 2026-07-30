"use client";

import * as React from "react";
import { useSidebar } from "@/contexts/sidebar-context";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SIDEBAR_NAV } from "@/constants/navigation";
import { SidebarItem } from "./sidebar-item";
import { Brand } from "@/components/layout/brand";
import { UserMenuPlaceholder } from "@/components/shared/user-menu-placeholder";

export function MobileNav() {
  const { isMobileOpen, closeMobile, isMobile } = useSidebar();

  if (!isMobile) return null;

  return (
    <Sheet open={isMobileOpen} onOpenChange={closeMobile}>
      <SheetContent side="left" className="w-72 flex flex-col p-0">
        <SheetHeader className="p-4 border-b text-left h-16 flex justify-center">
          <SheetTitle>
            <Brand />
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
          {SIDEBAR_NAV.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </div>
        <div className="border-t p-4">
          <UserMenuPlaceholder />
        </div>
      </SheetContent>
    </Sheet>
  );
}
