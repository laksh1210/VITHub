"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fade } from "@/lib/motion";

export function LandingNavbar() {
  return (
    <motion.header
      variants={fade}
      initial="initial"
      animate="animate"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">V</span>
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">VITHub</span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
        <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
        <Link href="#why-vithub" className="hover:text-foreground transition-colors">Why VITHub</Link>
        <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
          Sign In
        </Link>
        <Button render={<Link href="/register" />} size="sm" className="rounded-full px-6">
          Get Started
        </Button>
      </div>
    </motion.header>
  );
}
