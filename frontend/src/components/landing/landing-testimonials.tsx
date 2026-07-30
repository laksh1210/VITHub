"use client";

import { motion } from "framer-motion";
import { staggerContainer, slideUp } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "VITHub completely changed how I navigate the campus. Finding empty classrooms for study sessions is now effortless.",
    author: "Alex Johnson",
    role: "Computer Science, Year 3",
    initials: "AJ"
  },
  {
    quote: "The AI assistant is incredibly helpful. I just ask 'Where is the next AI club meeting?' and it gives me exact directions.",
    author: "Samantha Lee",
    role: "Data Science, Year 2",
    initials: "SL"
  },
  {
    quote: "No more waiting blindly for the shuttle. The real-time tracking saves me at least 20 minutes every day.",
    author: "Rahul Patel",
    role: "Mechanical Engineering, Year 4",
    initials: "RP"
  },
];

export function LandingTestimonials() {
  return (
    <section className="py-24 px-4 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={slideUp} className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Loved by students
          </motion.h2>
          <motion.p variants={slideUp} className="text-lg text-muted-foreground">
            See how VITHub is improving the daily campus experience.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div key={idx} variants={slideUp}>
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm">
                <CardContent className="pt-6 flex flex-col justify-between h-full">
                  <blockquote className="text-lg mb-6">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
