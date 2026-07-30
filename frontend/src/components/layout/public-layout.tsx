import * as React from "react";
import { Brand } from "./brand";
import { PageWrapper } from "./page-wrapper";
import { ThemeToggle } from "./theme-toggle";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-xl">
        <Brand />
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>
      <PageWrapper className="flex-1 flex flex-col">
        {children}
      </PageWrapper>
    </div>
  );
}
