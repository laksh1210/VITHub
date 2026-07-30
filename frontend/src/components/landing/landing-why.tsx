"use client";

import { motion } from "framer-motion";
import { staggerContainer, slideUp } from "@/lib/motion";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "One unified campus platform for all your needs",
  "Real-time information updated instantly",
  "AI-powered assistance for fast answers",
  "Better student experience and productivity",
  "Modern digital campus architecture",
];

export function LandingWhy() {
  return (
    <section id="why-vithub" className="py-24 px-4 overflow-hidden relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex-1 space-y-6"
        >
          <motion.h2 variants={slideUp} className="text-3xl md:text-5xl font-bold tracking-tight">
            Why VITHub?
          </motion.h2>
          <motion.p variants={slideUp} className="text-lg text-muted-foreground leading-relaxed">
            We built VITHub because the modern student shouldn&apos;t have to rely on scattered emails, static PDFs, and word-of-mouth. It is a premium, real-time ecosystem designed specifically to elevate your daily campus life.
          </motion.p>

          <motion.ul variants={staggerContainer} className="space-y-4 pt-4">
            {benefits.map((benefit, idx) => (
              <motion.li key={idx} variants={slideUp} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <span className="text-lg font-medium">{benefit}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[500px]"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/10 to-transparent rounded-3xl border border-border/50 backdrop-blur-3xl" />
          <div className="absolute inset-4 bg-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden flex items-center justify-center">
            {/* Placeholder for an abstract illustration or dashboard preview */}
            <div className="text-muted-foreground font-medium text-lg">Interactive Experience Preview</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
