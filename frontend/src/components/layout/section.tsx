"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { slideUp } from "@/lib/motion";

export const Section = React.forwardRef<HTMLElement, HTMLMotionProps<"section">>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        variants={slideUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className={cn("py-lg md:py-xl", className)}
        {...props}
      >
        {children}
      </motion.section>
    );
  }
);
Section.displayName = "Section";
