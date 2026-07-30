"use client";

import { motion } from "framer-motion";
import { staggerContainer, slideUp } from "@/lib/motion";
import { Search, Bot, MapPin, Flag } from "lucide-react";

const steps = [
  {
    title: "Search Campus",
    description: "Look up a building, classroom, or event.",
    icon: Search,
  },
  {
    title: "AI Assistance",
    description: "Get real-time insights or directions instantly.",
    icon: Bot,
  },
  {
    title: "Navigate",
    description: "Follow the 3D map or optimal routing.",
    icon: MapPin,
  },
  {
    title: "Reach Destination",
    description: "Arrive on time, without the hassle.",
    icon: Flag,
  },
];

export function LandingWorkflow() {
  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={slideUp} className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            A seamless workflow
          </motion.h2>
          <motion.p variants={slideUp} className="text-lg text-muted-foreground">
            From discovering a location to reaching it, VITHub makes every step effortless.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4"
        >
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          <div className="md:hidden absolute left-[31px] top-0 bottom-0 w-0.5 bg-border z-0" />

          {steps.map((step, idx) => (
            <motion.div key={idx} variants={slideUp} className="relative z-10 flex flex-row md:flex-col items-center gap-6 md:gap-4 w-full md:w-[200px]">
              <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center shadow-lg shrink-0">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-left md:text-center">
                <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
