"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { slideUp, staggerContainer } from "@/lib/motion";

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-32 pb-20">
      {/* Abstract Background Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[150px] rounded-[100%] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-3/4 w-[800px] h-[400px] bg-secondary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center"
      >
        <motion.div variants={slideUp} className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold tracking-wide backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Welcome to VITHub 2.0
        </motion.div>
        
        <motion.h1 variants={slideUp} className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
          The AI-Powered <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto]">
            Campus Digital Twin
          </span>
        </motion.h1>
        
        <motion.p variants={slideUp} className="w-full text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl leading-relaxed tracking-tight">
          Navigate the campus, find empty classrooms, track shuttles, and get instant answers with our intelligent AI assistant. One unified platform for everything.
        </motion.p>
        
        <motion.div variants={slideUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-20 p-2 rounded-3xl bg-white/5 dark:bg-black/20 border border-white/10 backdrop-blur-xl shadow-2xl">
          <Button render={<Link href="/register" />} size="lg" className="w-full sm:w-auto rounded-2xl px-10 text-lg h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_40px_-10px_var(--primary)] transition-all">
            Get Started
          </Button>
          <Button render={<Link href="#features" />} variant="ghost" size="lg" className="w-full sm:w-auto rounded-2xl px-10 text-lg h-14 hover:bg-white/10 font-medium">
            Explore Features
          </Button>
        </motion.div>

        <motion.div
          variants={slideUp}
          className="relative w-full max-w-5xl aspect-video rounded-3xl border border-border/50 overflow-hidden shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10 backdrop-blur-3xl group"
          style={{ perspective: "1000px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10 pointer-events-none" />
          <motion.div
            initial={{ rotateX: 20, y: 50, scale: 0.95 }}
            animate={{ rotateX: 0, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", bounce: 0.4 }}
            className="w-full h-full relative"
          >
            <Image
              src="/dashboard-mockup.png"
              alt="VITHub Dashboard Interface"
              fill
              className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-700"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
