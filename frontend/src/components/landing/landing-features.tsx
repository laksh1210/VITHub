"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { staggerContainer, slideUp } from "@/lib/motion";
import { Map, Bot, Building2, Library, Bus, Wrench, Calendar, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Campus Navigation",
    description: "Interactive 3D maps to find any room or building effortlessly.",
    icon: Map,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Events",
    description: "Stay updated on campus events, clubs, and academic schedules.",
    icon: Calendar,
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "AI Assistant",
    description: "Ask anything about the campus and get instant intelligent answers.",
    icon: Bot,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Classroom Occupancy",
    description: "Real-time updates on which rooms are currently empty or in use.",
    icon: Building2,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Library Availability",
    description: "Check study space availability and search for books instantly.",
    icon: Library,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Shuttle Tracking",
    description: "Live GPS tracking of campus shuttles with accurate ETAs.",
    icon: Bus,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Maintenance Portal",
    description: "Report issues and track maintenance requests in real-time.",
    icon: Wrench,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Notifications",
    description: "Smart alerts for classes, events, and important campus updates.",
    icon: Bell,
    className: "md:col-span-1 md:row-span-1",
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-32 px-4 relative">
      <div className="absolute inset-0 bg-zinc-50/50 dark:bg-zinc-950/50 -skew-y-2 origin-top-left z-0 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="w-full text-center mb-20 flex flex-col items-center"
        >
          <motion.h2 variants={slideUp} className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
            Everything you need <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              in one place
            </span>
          </motion.h2>
          <motion.p variants={slideUp} className="text-xl text-muted-foreground w-full max-w-2xl mx-auto leading-relaxed">
            Say goodbye to juggling multiple apps. VITHub brings the entire campus ecosystem into a single, cohesive experience.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={slideUp} className={cn("h-full w-full", feature.className)}>
              <Card className="h-full w-full border-white/10 bg-white/5 dark:bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-white/10 dark:hover:bg-white/5 group flex flex-col justify-between overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold tracking-tight">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base text-muted-foreground/80 leading-relaxed group-hover:text-muted-foreground transition-colors">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
