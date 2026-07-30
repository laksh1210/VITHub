import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { RootProvider } from "@/providers";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VITHub",
  description: "AI-Powered Campus Digital Twin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col selection:bg-primary/30 selection:text-primary-foreground">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
