"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "@/lib/motion";

export function PageWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
