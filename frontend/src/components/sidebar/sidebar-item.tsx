"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavItem } from "@/constants/navigation";
import { useSidebar } from "@/contexts/sidebar-context";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function SidebarItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const { isCollapsed, closeMobile, isMobile } = useSidebar();
  
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  
  const content = (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
        item.disabled && "pointer-events-none opacity-50",
        isCollapsed ? "justify-center px-2" : "justify-start"
      )}
    >
      {item.icon && <item.icon className="h-5 w-5 shrink-0" />}
      {!isCollapsed && (
        <span className="flex-1 truncate">{item.label}</span>
      )}
      {!isCollapsed && item.badge && (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
          {item.badge}
        </span>
      )}
    </div>
  );

  const wrapper = (
    <Link 
      href={item.disabled ? "#" : item.href} 
      onClick={() => {
        if (isMobile) closeMobile();
      }}
      className={cn("block", item.disabled && "cursor-not-allowed")}
    >
      {content}
    </Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger render={wrapper} />
        <TooltipContent side="right" className="flex items-center gap-4">
          {item.label}
          {item.badge && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {item.badge}
            </span>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return wrapper;
}
