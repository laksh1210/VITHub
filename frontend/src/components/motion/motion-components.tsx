"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { slideUp, cardHover, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const MotionContainer = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof motion.div>>(({ className, children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={cn("w-full h-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
});
MotionContainer.displayName = "MotionContainer";

export const MotionCard = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof motion.div>>(({ className, children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={slideUp}
      whileHover={cardHover.whileHover}
      whileTap={cardHover.whileTap}
      initial="initial"
      animate="animate"
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
});
MotionCard.displayName = "MotionCard";

export const MotionButton = forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof motion.button>>(({ className, children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
});
MotionButton.displayName = "MotionButton";
