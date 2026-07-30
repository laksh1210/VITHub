"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { slideUp, staggerContainer } from "@/lib/motion";

export function LandingHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
      {/* Abstract Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-3/4 w-[600px] h-[300px] bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.div variants={slideUp} className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Introducing VITHub 2.0
        </motion.div>
        
        <motion.h1 variants={slideUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          The AI-Powered <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Campus Digital Twin
          </span>
        </motion.h1>
        
        <motion.p variants={slideUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
          Navigate the campus, find empty classrooms, track shuttles, and get instant answers with our intelligent AI assistant. One unified platform for everything.
        </motion.p>
        
        <motion.div variants={slideUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button render={<Link href="/register" />} size="lg" className="w-full sm:w-auto rounded-full px-8 text-base h-12">
            Get Started
          </Button>
          <Button render={<Link href="#features" />} variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 text-base h-12 border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted">
            Learn More
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
