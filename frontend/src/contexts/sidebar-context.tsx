"use client";

import * as React from "react";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface SidebarContextType {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleCollapse: () => void;
  toggleMobileOpen: () => void;
  closeMobile: () => void;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const toggleMobileOpen = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isMobile) {
      timeout = setTimeout(() => setIsMobileOpen(false), 0);
    }
    return () => clearTimeout(timeout);
  }, [isMobile]);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed: isCollapsed && !isMobile,
        isMobileOpen,
        toggleCollapse,
        toggleMobileOpen,
        closeMobile,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
