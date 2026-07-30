import * as React from "react";
import { AppShell } from "./app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
