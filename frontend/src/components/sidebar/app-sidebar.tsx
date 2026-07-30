"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/sidebar-context";
import { SIDEBAR_NAV } from "@/constants/navigation";
import { SidebarItem } from "./sidebar-item";
import { Brand } from "@/components/layout/brand";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { UserMenuPlaceholder } from "@/components/shared/user-menu-placeholder";
import { motion } from "framer-motion";

export function AppSidebar() {
  const { isCollapsed, toggleCollapse, isMobile } = useSidebar();

  if (isMobile) return null; 

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 64 : 256 }}
      className="hidden md:flex flex-col border-r bg-card/50 backdrop-blur-xl h-screen sticky top-0 z-40 transition-all duration-300 ease-in-out"
    >
      <div className={cn("flex h-16 shrink-0 items-center border-b px-4 transition-all duration-300", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && <Brand />}
        {isCollapsed && <Brand className="[&>span]:hidden" />}
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {SIDEBAR_NAV.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </nav>
      </ScrollArea>

      <div className={cn("mt-auto flex flex-col border-t p-4 transition-all duration-300", isCollapsed ? "items-center" : "items-start gap-4")}>
        <div className="flex w-full items-center justify-between">
          <UserMenuPlaceholder />
          {!isCollapsed && (
            <Button variant="ghost" size="icon" onClick={toggleCollapse} className="text-muted-foreground hover:text-foreground">
              <PanelLeftClose className="h-4 w-4" />
            </Button>
          )}
        </div>
        {isCollapsed && (
          <Button variant="ghost" size="icon" onClick={toggleCollapse} className="mt-4 text-muted-foreground hover:text-foreground">
            <PanelLeftOpen className="h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.aside>
  );
}
