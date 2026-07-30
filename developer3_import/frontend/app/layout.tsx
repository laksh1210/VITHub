import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AppShell } from "@/components/common/app-shell";

export const metadata: Metadata = {
  title: "VITHub - Campus Digital Twin",
  description:
    "Real-time visibility into buildings, rooms, library seats, canteens, shuttles, maintenance and events across VIT Bhopal.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <div className="vh-ambient-glow" aria-hidden="true" />
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
