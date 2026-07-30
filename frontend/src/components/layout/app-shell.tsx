"use client";

import * as React from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppHeader } from "@/components/header/app-header";
import { MobileNav } from "@/components/sidebar/mobile-nav";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SidebarProvider } from "@/contexts/sidebar-context";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <MobileNav />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AppHeader />
          <PageWrapper className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </PageWrapper>
        </div>
      </div>
    </SidebarProvider>
  );
}
