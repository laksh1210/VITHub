"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { staggerContainer, slideUp } from "@/lib/motion";
import { Map, Bot, Building2, Library, Bus, Wrench, Calendar, Bell } from "lucide-react";

const features = [
  {
    title: "Campus Navigation",
    description: "Interactive 3D maps to find any room or building effortlessly.",
    icon: Map,
  },
  {
    title: "AI Assistant",
    description: "Ask anything about the campus and get instant intelligent answers.",
    icon: Bot,
  },
  {
    title: "Classroom Occupancy",
    description: "Real-time updates on which rooms are currently empty or in use.",
    icon: Building2,
  },
  {
    title: "Library Availability",
    description: "Check study space availability and search for books instantly.",
    icon: Library,
  },
  {
    title: "Shuttle Tracking",
    description: "Live GPS tracking of campus shuttles with accurate ETAs.",
    icon: Bus,
  },
  {
    title: "Maintenance Portal",
    description: "Report issues and track maintenance requests in real-time.",
    icon: Wrench,
  },
  {
    title: "Events",
    description: "Stay updated on campus events, clubs, and academic schedules.",
    icon: Calendar,
  },
  {
    title: "Notifications",
    description: "Smart alerts for classes, events, and important campus updates.",
    icon: Bell,
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-24 px-4 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={slideUp} className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Everything you need in one place
          </motion.h2>
          <motion.p variants={slideUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Say goodbye to juggling multiple apps. VITHub brings the entire campus ecosystem into a single, cohesive experience.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={slideUp}>
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm transition-colors hover:border-primary/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
